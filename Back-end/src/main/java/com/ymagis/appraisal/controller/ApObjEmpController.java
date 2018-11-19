package com.ymagis.appraisal.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import com.ymagis.appraisal.entities.AnnualSession;
import com.ymagis.appraisal.entities.ApEmploye;
import com.ymagis.appraisal.entities.ApObjEmp;
import com.ymagis.appraisal.entities.Employe;
import com.ymagis.appraisal.repository.ApEmployeRepository;
import com.ymagis.appraisal.repository.ApObjEmpRepository;
import com.ymagis.appraisal.repository.EmployeRepository;

@RestController
@CrossOrigin
public class ApObjEmpController {
	@Autowired
	private ApObjEmpRepository apObjEmpRepository;
	@Autowired
	private EmployeRepository employeRepository;
	@Autowired
	private ApEmployeRepository apEmployeRepository;

	// ajouter un nv obj

	@RequestMapping(method = RequestMethod.POST, value = "/objectives/{idEmp}/{idApEmp}")
	public Employe saveEmployeur(@PathVariable Long idEmp, @PathVariable Long idApEmp, @RequestBody ApObjEmp obj) {
		Employe employeur = employeRepository.findById(idEmp).get();
		List<ApEmploye> appEmpList = new ArrayList<ApEmploye>(employeur.getApEmployes());
		for (int j = 0; j < appEmpList.size(); j++) {
			if (appEmpList.get(j).getIdApEmp() == idApEmp) {
				Set<ApObjEmp> objs = appEmpList.get(j).getApObjEmps();
				List<ApObjEmp> objsList = new ArrayList<ApObjEmp>(objs);
				objsList.add(obj);
				Set<ApObjEmp> objectives = objsList.stream().collect(Collectors.toSet());
				appEmpList.get(j).setApObjEmps(objectives);
				for (int i = 0; i < objsList.size(); i++) {
					objsList.get(i).setApEmploye(appEmpList.get(j));
				}

			}
		}
		Set<ApEmploye> apps = appEmpList.stream().collect(Collectors.toSet());
		employeur.setApEmployes(apps);
		employeRepository.save(employeur);
		return employeur;
	}

	// get la liste des objectives
	@RequestMapping(method = RequestMethod.GET, value = "/apObjs/{idApEmp}")
	public Page<ApObjEmp> getApObjs(@PathVariable Long idApEmp,
			@RequestParam(name = "page", defaultValue = "0") int page,
			@RequestParam(name = "size", defaultValue = "4") int size) {
		return apObjEmpRepository.getEmployerObjs(idApEmp, new PageRequest(page, size));
	}

	// delete an obj
	@RequestMapping(value = "/obj/{idApObjEmp}", method = RequestMethod.DELETE)
	public void supprimer(@PathVariable("idApObjEmp") Long idApObjEmp) {
		Optional<ApObjEmp> obj = apObjEmpRepository.findById(idApObjEmp);
		apObjEmpRepository.delete(obj.get());

	}

	// find obj by id
	@RequestMapping(method = RequestMethod.GET, value = "/obj/{idApEmp}")
	public Optional<ApObjEmp> getObj(@PathVariable Long idApEmp) {
		return apObjEmpRepository.findById(idApEmp);
	}
     //modifier un obj
	@RequestMapping(value = "/objective/{idEmp}/{idApEmp}/{idApObjEmp}", method = RequestMethod.PUT)
	public Employe updateObj(@RequestBody ApObjEmp obj, @PathVariable("idEmp") Long idEmp,
			@PathVariable("idApEmp") Long idApEmp, @PathVariable("idApObjEmp") Long idApObjEmp) {
		// find an emp
		Employe employeur = employeRepository.findById(idEmp).get();
		List<ApEmploye> appEmpList = new ArrayList<ApEmploye>(employeur.getApEmployes());
		for (int j = 0; j < appEmpList.size(); j++) {
			if (appEmpList.get(j).getIdApEmp() == idApEmp) {
				List<ApObjEmp> objsList = new ArrayList<ApObjEmp>(appEmpList.get(j).getApObjEmps());
				for (int i = 0; i < objsList.size(); i++) {
					if (objsList.get(i).getIdApObjEmp() == idApObjEmp) {
						objsList.get(i).setIndicator(obj.getIndicator());
						objsList.get(i).setDeadLine(obj.getDeadLine());
						objsList.get(i).setLabelObj(obj.getLabelObj());
						objsList.get(i).setMean(obj.getMean());
					}
				}
				Set<ApObjEmp> objectives = objsList.stream().collect(Collectors.toSet());
				appEmpList.get(j).setApObjEmps(objectives);
				appEmpList.get(j).setApObjEmps(objectives);
				for (int k = 0; k < objsList.size(); k++) {
					objsList.get(k).setApEmploye(appEmpList.get(j));
				}
			}
		}
		Set<ApEmploye> apps = appEmpList.stream().collect(Collectors.toSet());
		employeur.setApEmployes(apps);
		employeRepository.save(employeur);
		return employeur;
	}

}
