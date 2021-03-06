package com.ymagis.appraisal.controller;

import java.util.*;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.ymagis.appraisal.repository.ApEmployeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ymagis.appraisal.repository.ApSoftSkillRepository;
import com.ymagis.appraisal.repository.LevelRepository;
import com.ymagis.appraisal.repository.SoftSkilsRepository;
import com.ymagis.appraisal.entities.ApEmploye;
import com.ymagis.appraisal.entities.ApSoftSkill;
import com.ymagis.appraisal.entities.Level;
import com.ymagis.appraisal.entities.SoftSkill;

@RestController
@CrossOrigin
public class SoftSkilsController {

	@Autowired
	private SoftSkilsRepository skilsRepository;

	@Autowired
	private LevelRepository LevelRepository;
	@Autowired
	private ApSoftSkillRepository apSoftSkillRepository;
	@Autowired
private ApEmployeRepository apEmployeRepository;
	// ajouter skils
	@RequestMapping(method = RequestMethod.POST, value = "/skils/save")
	public SoftSkill saveSkils(@RequestBody SoftSkill skils) {
		SoftSkill softSkill = skilsRepository.getsoftSkill(skils.getLabel());
		if (softSkill != null)
			throw new RuntimeException("labell " + softSkill.getLabel() + " existe deja");
		else if (skils.getCode() == null)
			throw new RuntimeException("vous devez mentionner type ");
		else {
			skilsRepository.save(skils);

			return skils;
		}
	}

	// ajouter skil et level
	@RequestMapping(method = RequestMethod.POST, value = "/skilsLevel/save")
	public SoftSkill saveSkilslevel(@RequestBody SoftSkill skils) {
		Optional<SoftSkill> skill = skilsRepository.findById(skils.getIdSoftSkill());
		for (Level nvlevel : skils.getLevels())
			if (skill.get().getLevels().size() != 0) {
				for (Level level : skill.get().getLevels())
					if ((nvlevel.getDegree() == level.getDegree()) && (!level.isRemoved())
							&& (level.getIdLevel() != null))
						throw new RuntimeException("level  " + nvlevel.getDegree() + " existe deja ");
					else
						nvlevel.setSoftSkill(skils);
			} else
				nvlevel.setSoftSkill(skils);

		skilsRepository.save(skils);

		return skils;
	}

	// recuperer skils by id
	@RequestMapping(method = RequestMethod.GET, value = "/skils/{id}")
	public SoftSkill getSkils(@PathVariable Long id) {
		Optional<SoftSkill> skils = skilsRepository.findById(id);
		Set<Level> levels = new HashSet();
		for (Level level : skils.get().getLevels())
			if (!level.isRemoved())
				levels.add(level);
		skils.get().setLevels(levels);
		return skils.get();
	}

	// recuperer skils
	@RequestMapping(value = "/skils", method = RequestMethod.GET)
	public List<SoftSkill> getSkils() {

		return skilsRepository.findAll();
	}
	@RequestMapping(value = "/allSkill", method = RequestMethod.GET)
	public Page<SoftSkill> getAllSoftSkill(@RequestParam(name = "page", defaultValue = "0") int page,
										@RequestParam(name = "size", defaultValue = "2") int size) {
		Page<SoftSkill> softSkills = skilsRepository.getoftSkill(PageRequest.of(page, size));
		for(SoftSkill softSkill: softSkills.getContent())
		{
			Set<Level> levels = new HashSet<>();
			for (Level level : softSkill.getLevels())
				if(!level.isRemoved())
					levels.add(level);

			softSkill.setLevels(levels);
		}


		return softSkills;
	}
	@RequestMapping(value = "/skill", method = RequestMethod.GET)
	public Map<String , Page<SoftSkill>> getSoftSkill(@RequestParam(name = "page", defaultValue = "1") int page,
			@RequestParam(name = "size", defaultValue = "3") int size) {
		Map<String , Page<SoftSkill>> mapSoft = new HashMap<>();
		Page<SoftSkill> softSkills = skilsRepository.getSoftSkill(PageRequest.of(page, size));
		Page<SoftSkill> managSkills = skilsRepository.getManageSkill(PageRequest.of(page, size));

		for(SoftSkill softSkill: softSkills.getContent())
		{
			Set<Level> levels = new HashSet<>();
			for (Level level : softSkill.getLevels())
				if(!level.isRemoved())
					levels.add(level);

		  softSkill.setLevels(levels);
		}

		for(SoftSkill managSkill: managSkills.getContent())
		{
			Set<Level> managlevels = new HashSet<>();
			for (Level levelM : managSkill.getLevels())
				if(!levelM.isRemoved())
					managlevels.add(levelM);

			managSkill.setLevels(managlevels);
		}

		mapSoft.put("soft",softSkills);
		mapSoft.put("manag",managSkills);
		return mapSoft;
				//softSkills;
	}

	// update skils
	@RequestMapping(value = "/skils/{id}", method = RequestMethod.PUT)
	public SoftSkill updateSkils(@PathVariable Long id, @RequestBody SoftSkill skils) {
		Optional<SoftSkill> softSkill = skilsRepository.findById(skils.getIdSoftSkill());
		for (Level level : skils.getLevels())
			for (Level level2 : softSkill.get().getLevels())
				if ((level.getDegree() == level2.getDegree()) && ((level.getIdLevel() != level2.getIdLevel())))
					throw new RuntimeException("level  " + level.getDegree() + " existe deja");
				else {

					level.setSoftSkill(skils);

				}
		skilsRepository.save(skils);
		return skils;
	}

	// update Level et skils
	@RequestMapping(value = "/skils/level/{id}", method = RequestMethod.PUT)
	public SoftSkill updatelevel(@PathVariable Long id, @RequestBody SoftSkill skils) {
		Optional<SoftSkill> softSkill = skilsRepository.findById(skils.getIdSoftSkill());
		for (Level updlevel : skils.getLevels()) {
			for (Level level : softSkill.get().getLevels())
				if ((updlevel.getDegree() == level.getDegree()) && (!level.isRemoved())
						&& ((updlevel.getIdLevel() != level.getIdLevel())))
					throw new RuntimeException("level  " + updlevel.getDegree() + " existe deja");

			updlevel.setSoftSkill(skils);
		}
		skilsRepository.save(skils);
		return skils;
	}

	// update Skil
	@RequestMapping(method = RequestMethod.PUT, value = "/skils/{id}/update")
	public SoftSkill SkilsUpdate(@PathVariable Long id, @RequestBody SoftSkill skils) {
		SoftSkill softSkill = skilsRepository.getsoftSkill(skils.getLabel());
		if (softSkill != null) {
			if (skils.getIdSoftSkill() != softSkill.getIdSoftSkill()) {
				throw new RuntimeException("labell " + softSkill.getLabel() + " existe deja");
			} else {
				for (Level level : skils.getLevels())
					level.setSoftSkill(skils);
			}
		} else {
			for (Level level : skils.getLevels())
				level.setSoftSkill(skils);
		}

		skilsRepository.save(skils);
		return skils;
	}

	// suppression d'un level
	@RequestMapping(value = "/skils/{id}/remove", method = RequestMethod.PUT)
	public SoftSkill updateSkilsLevel(@PathVariable Long id, @RequestBody SoftSkill skils) {
		for (Level level : skils.getLevels())
			level.setSoftSkill(skils);
		skilsRepository.save(skils);
		return skils;
	}

	// ********************************************************************************//

	@RequestMapping(method = RequestMethod.GET, value = "/meaning/{id}")
	public Level getLevel(@PathVariable Long id) {

		Optional<Level> level = LevelRepository.findById(id);

		return level.get();
	}

	@RequestMapping(method = RequestMethod.GET, value = "/skils/{id}/meaning/{idM}")
	public SoftSkill getmeanig(@PathVariable Long id, @PathVariable Long idM) {
		Optional<SoftSkill> skils = skilsRepository.findById(id);
		skils.get().getLevels().clear();
		Optional<Level> level = LevelRepository.findById(idM);
		Set<Level> listlevel = new HashSet<>();
		listlevel.add(level.get());
		skils.get().setLevels(listlevel);
		return skils.get();
	}

	@RequestMapping(method = RequestMethod.POST, value = "/apskils/save")
	public ApSoftSkill saveAppsoft(@RequestBody ApSoftSkill apSoftSkill) {

		ApEmploye apEmploye = new ApEmploye();
		apSoftSkill.setApEmploye(apEmploye);
		apSoftSkillRepository.save(apSoftSkill);
		return apSoftSkill;
	}
	@RequestMapping(method = RequestMethod.POST, value = "/apEmpl/{idap}/soft")
	public ApEmploye Appsoftsave(@RequestBody Map<String,List<Level>> levels,@PathVariable Long idap) {
		Set<ApSoftSkill> apSoftSkills = new HashSet<>();
		Map<String,List<ApSoftSkill>> listAppsoft = new HashMap<>();
		List<ApSoftSkill> softlist = new ArrayList<>();
		List<ApSoftSkill> managlist = new ArrayList<>();
     ApEmploye apEmploye = apEmployeRepository.findById(idap).get();
List<ApSoftSkill> suppApSoftSkills = apSoftSkillRepository.getApSoftSkillByApEmploye(apEmploye);
for(ApSoftSkill apSoftSkill : suppApSoftSkills)
	if(apSoftSkill.getLevel().getSoftSkill().getCode().equals("soft"))
		softlist.add(apSoftSkill);

	else
		managlist.add(apSoftSkill);
		listAppsoft.put("managerial",managlist);
		listAppsoft.put("soft",softlist);

	if(levels.get("soft").size() != 0) {
		System.out.println("soft : " + listAppsoft.get("soft").size());
		apSoftSkillRepository.deleteAll(listAppsoft.get("soft"));
	}
	if(levels.get("manag").size() != 0)
	{
		System.out.println("managerial : "+listAppsoft.get("managerial").size());
		apSoftSkillRepository.deleteAll(listAppsoft.get("managerial"));
	}
	System.out.println(levels.keySet());
	for( String key : levels.keySet())
		for(Level level : levels.get(key))
		{
			System.out.println("level "+level.getIdLevel());
						ApSoftSkill apSoftSkill = new ApSoftSkill();
						SoftSkill softSkill = LevelRepository.findById(level.getIdLevel()).get().getSoftSkill();
			            level.setSoftSkill(softSkill);
			            apSoftSkill.setLevel(level);
			            apSoftSkill.setApEmploye(apEmploye);
		 	            apSoftSkills.add(apSoftSkill);

		        }
        apEmploye.setApSoftSkills(apSoftSkills);
		apEmployeRepository.save(apEmploye);
		return apEmploye;
	}
	// recuperer skils
	@RequestMapping(value = "/apskils", method = RequestMethod.GET)
	public List<ApSoftSkill> getapSkils() {
		return apSoftSkillRepository.findAll();
	}
}
