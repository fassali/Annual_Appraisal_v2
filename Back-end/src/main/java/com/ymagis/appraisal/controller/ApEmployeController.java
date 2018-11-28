package com.ymagis.appraisal.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ymagis.appraisal.entities.AnnualSession;
import com.ymagis.appraisal.entities.ApEmploye;
import com.ymagis.appraisal.entities.ApObjEmp;
import com.ymagis.appraisal.repository.AnnualSessionRepository;
import com.ymagis.appraisal.repository.ApEmployeRepository;

@RestController
@CrossOrigin
public class ApEmployeController {
	@Autowired
	private ApEmployeRepository apEmployeRepository;
	@Autowired
	private AnnualSessionRepository annualSessionRepository ;
	//get session en cour
		@RequestMapping(method = RequestMethod.GET, value = "/session")
		public AnnualSession getSession() {
			AnnualSession session=apEmployeRepository.findAnnualSession();
			return session;
		}
	// creation ApEmplye
	@RequestMapping(method = RequestMethod.POST, value = "/apEmploye/add")
	public ApEmploye addApEmplye(@RequestBody ApEmploye apEmp) {
     
//	    	apEmployeRepository.save(apEmp);
			return apEmp;

	}
	@RequestMapping(method = RequestMethod.POST, value = "/session/add")
	public AnnualSession session(@RequestBody AnnualSession session) {
          annualSessionRepository.save(session);
//	    	apEmployeRepository.save(apEmp);
			return session;

	}
	//update an ApEmployer
	@RequestMapping(value = "/apEmployer/{idApEmp}", method = RequestMethod.PUT)
	public ApEmploye updateAppEmp(@RequestBody ApEmploye appEmp, @PathVariable("idApEmp") Long idApEmp) {
		appEmp.setIdApEmp(idApEmp);
		apEmployeRepository.save(appEmp);
		return appEmp;
	}
	//get all  ApEmployer
	@RequestMapping(method = RequestMethod.GET, value = "/apEmployer")
	public ApEmploye getApEmployer(@RequestBody ApEmploye apEmp) {
		ApEmploye app=apEmployeRepository.findApEmploye(apEmp.getEmploye().getIdEmp(),apEmp.getAnnualSession().getIdAnn());
		return app;
	}
	//get all apEmployers
	@RequestMapping(method = RequestMethod.GET, value = "/apEmployers")
	public List<ApEmploye> getApEmployers() {
		apEmployeRepository.findAll();
		System.out.println(apEmployeRepository.findAll());
		return apEmployeRepository.findAll();
	}
		
	// find obj by id
		@RequestMapping(method = RequestMethod.GET, value = "/apEmp/{idApEmp}")
		public Optional<ApEmploye> getObj(@PathVariable Long idApEmp) {
			return apEmployeRepository.findById(idApEmp);
		}

	//update an ApEmployer
	@RequestMapping(value = "/apEmpl/{idApEmp}", method = RequestMethod.PUT)
	public ApEmploye updateApEmp(@RequestBody ApEmploye appEmp, @PathVariable("idApEmp") Long idApEmp) {
		ApEmploye apEmploye = apEmployeRepository.findById(idApEmp).get();
		apEmploye.setStrength(appEmp.getStrength());
		apEmploye.setTbImproved(appEmp.getTbImproved());
		apEmploye.setWish(appEmp.getWish());
		apEmploye.setOpinion(appEmp.getOpinion());
		apEmployeRepository.save(apEmploye);
		return apEmploye;
	}
}

