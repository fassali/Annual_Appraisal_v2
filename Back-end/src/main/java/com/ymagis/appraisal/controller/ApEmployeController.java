package com.ymagis.appraisal.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ymagis.appraisal.entities.AnnualSession;
import com.ymagis.appraisal.entities.ApEmploye;
import com.ymagis.appraisal.repository.ApEmployeRepository;

@RestController
public class ApEmployeController {
	@Autowired
	private ApEmployeRepository apEmployeRepository;
	//get session en cour
		@RequestMapping(method = RequestMethod.GET, value = "/session")
		public AnnualSession getSession() {
			AnnualSession session=apEmployeRepository.findAnnualSession();
			return session;
		}
	// creation ApEmplye
	@RequestMapping(method = RequestMethod.POST, value = "/apEmploye/add")
	public ApEmploye addApEmplye(@RequestBody ApEmploye apEmp) {
		apEmployeRepository.save(apEmp);
		return apEmp;
	}
	//update an ApEmployer
	@RequestMapping(value = "/apEmployer/{idApEmp}", method = RequestMethod.PUT)
	public ApEmploye updateAppEmp(@RequestBody ApEmploye appEmp, @PathVariable("idApEmp") Long idApEmp) {
		appEmp.setIdApEmp(idApEmp);
		apEmployeRepository.save(appEmp);
		return appEmp;
	}
	
	
	
		
		

}
