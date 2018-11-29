package com.ymagis.appraisal.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import com.ymagis.appraisal.entities.AnnualSession;
import com.ymagis.appraisal.entities.ApEmploye;
import com.ymagis.appraisal.entities.Employe;
import com.ymagis.appraisal.repository.AnnualSessionRepository;
import com.ymagis.appraisal.repository.ApEmployeRepository;
import com.ymagis.appraisal.repository.EmployeRepository;

@RestController
@CrossOrigin
public class EmployeController {
	@Autowired
	private EmployeRepository employeRepository;
	@Autowired
	private AnnualSessionRepository annualSessionRepository;
	@Autowired
	private ApEmployeRepository apEmployer;
	
	
	// ajouter un nouvel employé
	@RequestMapping(method = RequestMethod.POST, value = "/employers/add")
	public Employe saveEmployeur(@RequestBody Employe employeur) {
		if (employeur.getLastName() == null || employeur.getFirstName() == null 
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

	//get sessions
	@RequestMapping(value = "/sessions/{idEmp}",method = RequestMethod.GET)
	public List<AnnualSession> getSession(@PathVariable Long idEmp) {
		Boolean exist=false;
		List<AnnualSession> sessions=new ArrayList<AnnualSession>();
		//get employer by id
		Employe employeur = employeRepository.findById(idEmp).get();
		//get list of apEmp
		List<ApEmploye> listAppEmp = new ArrayList<ApEmploye>(employeur.getApEmployes());
		//get session en cour
		AnnualSession sessionEnCour = annualSessionRepository.findAnnualSession();
		//list of all sessions for this employer
		for(int i=0;i<listAppEmp.size();i++) {
			sessions.add(listAppEmp.get(i).getAnnualSession());
		}
		//test if the sessions en cour existe in the list 
		for(int j=0;j<sessions.size();j++) {
			if(sessions.get(j).getIdAnn()==sessionEnCour.getIdAnn()) {
				 exist=true;
			}
		}
		if(exist==true) {
			return sessions;
		}else {
			sessions.add(sessionEnCour);
			return sessions;
		}
		
	}
	//get apEmp for la session "en ours"
	@RequestMapping(value = "/sessionEnCour/{idEmp}",method = RequestMethod.GET)
	public Boolean findApEmp(@PathVariable Long idEmp) {
		Boolean exist=false;
		Employe employeur = employeRepository.findById(idEmp).get();
		List<ApEmploye> listAppEmp = new ArrayList<ApEmploye>(employeur.getApEmployes());
		AnnualSession sessionEnCour = annualSessionRepository.findAnnualSession();
		for(int i=0;i<listAppEmp.size();i++) {
			if(listAppEmp.get(i).getAnnualSession().getIdAnn()==sessionEnCour.getIdAnn()) {
				exist=true;
		
			}
		}
		return exist;
	}
	
	//get the session "cloruré"
	@RequestMapping(value = "/sessionCloture/{idEmp}/{idAnn}",method = RequestMethod.GET)
	public AnnualSession findSession_C(@PathVariable Long idEmp,@PathVariable Long idAnn) {
		AnnualSession session=null;
		Employe employeur = employeRepository.findById(idEmp).get();
		List<ApEmploye> listAppEmp = new ArrayList<ApEmploye>(employeur.getApEmployes());
		for(int i=0;i<listAppEmp.size();i++) {
			if(listAppEmp.get(i).getAnnualSession().getIdAnn()==idAnn) {
				session=listAppEmp.get(i).getAnnualSession();
			}
		}
		
		return session;
	}
	
	// appEmp list
	@RequestMapping(method = RequestMethod.GET, value = "/appEmployer/{idEmp}")
	public ApEmploye getAppEmployer(@PathVariable Long idEmp) {
		//get employer by id
		Employe employeur = employeRepository.findById(idEmp).get();
		//get annual en cour
		AnnualSession session = annualSessionRepository.findAnnualSession();
		//get appEmp d'employeur
		Set<ApEmploye> appEmpList = employeur.getApEmployes();
		//initialiser un variable pour tester si l'appEmp d'employeur existe deja ou nn
		ApEmploye appSession = null;
		//transformer une Set à une liste
		List<ApEmploye> listAppEmp = new ArrayList<ApEmploye>(appEmpList);
		//tester si l'employeur a deja une AppEmp de la session en cour
		for (int i = 0; i < listAppEmp.size(); i++) {
			//s'il existe une appEmp on l'enregistrer dans la variable appSession
			if (listAppEmp.get(i).getAnnualSession().getLabel() == session.getLabel()) {
				appSession = listAppEmp.get(i);
			}
		}
		//tester la valeur de la variable "appSession"
		if (appSession != null) {
			return appSession;
		} else {
			ApEmploye appEmp = new ApEmploye();
			appEmp.setStatus("en cour");
			appEmp.setAnnualSession(session);
			appEmp.setEmploye(employeur);
			apEmployer.save(appEmp);
			appSession = appEmp;
			return appSession;
		}

	}
	
	
	
}
