package com.ymagis.appraisal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ymagis.appraisal.entities.BusinessUnit;
import com.ymagis.appraisal.repository.BusinessUnitRepository;

@RestController
@CrossOrigin
public class BusinessUnitController {
	@Autowired
	private BusinessUnitRepository businessUnitRepository;

	//get list of Bu
	@RequestMapping(method = RequestMethod.GET, value = "/buList")
	public List<BusinessUnit> getBuList() {
		return businessUnitRepository.findAll();
	}
	
}
