package com.ymagis.appraisal.controller;

import java.util.List;
import java.util.Optional;

import com.ymagis.appraisal.entities.ApEmploye;
import com.ymagis.appraisal.repository.ApEmployeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ymagis.appraisal.entities.ApHardSkill;
import com.ymagis.appraisal.repository.HardSkillRepository;

@RestController
@CrossOrigin
public class HardSkillController {

	@Autowired
	private HardSkillRepository repository;
	@Autowired
	private ApEmployeRepository appRepository;
	@RequestMapping(value = "/competencies/appraisal/{id}", method = RequestMethod.GET)
	List<ApHardSkill> getByAppraisal(@PathVariable("id") Long id) {
		return repository.namedFindAllApHardSkillsByApEmploye(id);
	}

	@RequestMapping(value = "/competencies", method = RequestMethod.GET)
	List<ApHardSkill> getAll() {
		return repository.findAll();
	}


	@RequestMapping(value = "/competencies//save/{app_id}", method = RequestMethod.POST)
	public ApHardSkill save(@PathVariable(value = "app_id") Long appId, @RequestBody ApHardSkill model) {
		Optional<ApEmploye> appraisal = appRepository.findById(appId);
		if(appraisal.isPresent()) {
			model.setApEmploye(appraisal.get());
			repository.save(model);
			return model;
		}
		return null;
	}
	@RequestMapping(value = "/competencies/{id}", method = RequestMethod.GET)
	ApHardSkill get(@PathVariable(value = "id") Long id) throws Exception {
		Optional<ApHardSkill> item = repository.findById(id);
		if (item.isPresent()) {
			return item.get();
		}
		return null;
	}

	@RequestMapping(value = "/appraisal/{idapp}/competencies/{id}", method = RequestMethod.PUT)
	public ApHardSkill update(@RequestBody ApHardSkill model, @PathVariable("id") Long id,@PathVariable("idapp") Long idapp) {
		ApEmploye apEmploye = appRepository.findById(idapp).get();
		model.setApEmploye(apEmploye);
		model.setIdApHdSkill(id);
		repository.save(model);
		return model;
	}

	@RequestMapping(value = "/competencies/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable(value = "id") Long id) throws Exception {
		repository.deleteById(id);
	}

}
