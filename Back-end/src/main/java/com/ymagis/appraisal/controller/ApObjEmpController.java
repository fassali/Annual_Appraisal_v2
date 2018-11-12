package com.ymagis.appraisal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ymagis.appraisal.entities.ApObjEmp;
import com.ymagis.appraisal.repository.ApObjEmpRepository;

@RestController
@CrossOrigin
public class ApObjEmpController {
	@Autowired
	private ApObjEmpRepository  apObjEmpRepository;
	
	
	// ajouter un nv obj
	@RequestMapping(method = RequestMethod.POST, value = "/objectives/add")
	public List<ApObjEmp> saveEmployeur(@RequestBody List<ApObjEmp>  objs) {
		for (int i = 0; i < objs.size(); i++) {
			ApObjEmp obj=objs.get(i);
			apObjEmpRepository.save(obj);
		}
		return objs;
	}

}
