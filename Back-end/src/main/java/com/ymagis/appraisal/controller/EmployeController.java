package com.ymagis.appraisal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import com.ymagis.appraisal.entities.Employe;
import com.ymagis.appraisal.repository.EmployeRepository;

@RestController
@CrossOrigin
public class EmployeController {
	@Autowired
	private EmployeRepository employeRepository;
	
	// ajouter un nouvel employé
	@RequestMapping(method = RequestMethod.POST, value = "/employers/add")
	public Employe saveEmployeur(@RequestBody Employe employeur) {
		if (employeur.getLastName() == null || employeur.getFirstName() == null || employeur.getDateEntry() == null
				|| employeur.getTeam() == null || employeur.getPosition() == null || employeur.getEmail() == null
				|| employeur.getUsername() == null) {
			throw new RuntimeException(
					"Vous devez saisir tous les éléments d'un nouvel employé avant l'enregistrement, Veuillez réessayer");
		}
		employeRepository.save(employeur);
		return employeur;
	}
	// chercher un employé par "username"
	@RequestMapping(method = RequestMethod.GET, value = "/employerLogin/{username}")
	public Employe getEmployer(@PathVariable String username) {
		Employe employer = employeRepository.findByUsername(username);
		return employer;
	}
	
	// recuperer les employeurs d'un manager dans les pages
	@RequestMapping(value = "/employers", method = RequestMethod.GET)
	public Page<Employe> findEmployer(@RequestParam(name = "idManager", defaultValue = "")  Integer idManager,
			@RequestParam(name = "page", defaultValue = "0") int page,
			@RequestParam(name = "size", defaultValue = "6") int size) {
		System.out.println(idManager);
		return employeRepository.getEmployer(idManager,new PageRequest(page, size));
	}
	
	// chercher un employeur par "first name"
	@RequestMapping(value = "/findEmployers", method = RequestMethod.GET)
	public Page<Employe> findEmployers(@RequestParam(name = "idManager", defaultValue = "") Integer idManager,
			@RequestParam(name = "firstName", defaultValue = "") String firstName,
			@RequestParam(name = "page", defaultValue = "0") int page,
			@RequestParam(name = "size", defaultValue = "6") int size) {
		
		return employeRepository.findEmployer(idManager,firstName,new PageRequest(page, size));
	}
	
	// mise à jour des informations d'un employeurs
	@RequestMapping(value = "/employer/{idEmp}", method = RequestMethod.PUT)
	public Employe update(@RequestBody Employe employeur, @PathVariable("idEmp") Long idEmp) {
		employeur.setIdEmp(idEmp);
		employeRepository.save(employeur);
		return employeur;
	}
	
	// recuperer un employeur par son id
	@RequestMapping(method = RequestMethod.GET, value = "/employer/{idEmp}")
	public Employe getEmployeur(@PathVariable Long idEmp) {
		Employe employeur = employeRepository.findById(idEmp).get();
		return employeur;
	}
	
	
	
	
	
	
	
}
