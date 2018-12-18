package com.ymagis.appraisal.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.jboss.logging.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import com.ymagis.appraisal.entities.AnnualSession;
import com.ymagis.appraisal.entities.ApEmploye;
import com.ymagis.appraisal.entities.ApObjEmp;
import com.ymagis.appraisal.entities.DivTeams;
import com.ymagis.appraisal.entities.Employe;
import com.ymagis.appraisal.repository.AnnualSessionRepository;
import com.ymagis.appraisal.repository.ApEmployeRepository;
import com.ymagis.appraisal.repository.DivTeamsRepository;
import com.ymagis.appraisal.repository.EmployeRepository;
import com.ymagis.appraisal.utils.Constantes;

@RestController
@CrossOrigin
public class EmployeController {
	@Autowired
	private EmployeRepository employeRepository;
	@Autowired
	private AnnualSessionRepository annualSessionRepository;
	@Autowired
	private ApEmployeRepository apEmployer;
	@Autowired
	private DivTeamsRepository divTeamsRepository;

	// ajouter un nouvel employé
	@RequestMapping(method = RequestMethod.POST, value = "/employers/add/{idManager}")
	public Employe saveEmployeur( @PathVariable("idManager") Long idManager,@RequestBody Employe employeur) {
		if (employeur.getLastName() == null || employeur.getFirstName() == null || employeur.getTeam() == null
				|| employeur.getPosition() == null || employeur.getEmail() == null || employeur.getUsername() == null) {
			throw new RuntimeException(
					"Vous devez saisir tous les éléments d'un nouvel employé avant l'enregistrement, Veuillez réessayer");
		}
		Employe manager=employeRepository.findEmployeByIdEmp(idManager);
		employeur.setManager(manager);
		employeRepository.save(employeur);

		return employeur;
	}

	// chercher un employé par "username"
	@RequestMapping(method = RequestMethod.GET, value = "/employerLogin/{username}")
	public Employe getEmployer(@PathVariable String username) {
		Employe employer = employeRepository.findByUsername(username);
		return employer;
	}

	// get all employers without manager
	@RequestMapping(value = "/employersWM", method = RequestMethod.GET)
	public List<Employe> findEmployerWM() {
		return employeRepository.findEmployers_WM();
	}

	// mise à jour des informations d'un employeurs
	@RequestMapping(value = "/employer/{idEmp}", method = RequestMethod.PUT)
	public Employe updateEmployer(@RequestBody Employe employeur, @PathVariable("idEmp") Long idEmp) {
		Employe employe = employeRepository.findById(idEmp).get();
		employeur.setManager(employe.getManager());
		employeur.setApEmployes(employe.getApEmployes());
		employeRepository.save(employeur);
		
		return employeur;
	}

	// recuperer un employeur par son id
	@RequestMapping(method = RequestMethod.GET, value = "/employer/{idEmp}")
	public Employe getEmployeur(@PathVariable Long idEmp) {
		Employe employeur = employeRepository.findById(idEmp).get();
		return employeur;
	}

	// get sessions
	@RequestMapping(value = "/sessions/{idEmp}", method = RequestMethod.GET)
	public List<AnnualSession> getSession(@PathVariable Long idEmp) {
		Boolean exist = false;
		List<AnnualSession> sessions = new ArrayList<AnnualSession>();
		// get employer by id
		Employe employeur = employeRepository.findById(idEmp).get();
		// get list of apEmp
		List<ApEmploye> listAppEmp = new ArrayList<ApEmploye>(employeur.getApEmployes());
		// get session en cour
		AnnualSession sessionEnCour = annualSessionRepository.findAnnualSession();
		// list of all sessions for this employer
		for (int i = 0; i < listAppEmp.size(); i++) {
			sessions.add(listAppEmp.get(i).getAnnualSession());
		}
		// test if the sessions en cour existe in the list
		for (int j = 0; j < sessions.size(); j++) {
			if (sessions.get(j).getIdAnn() == sessionEnCour.getIdAnn()) {
				exist = true;
			}
		}
		if (exist == true) {
			return sessions;
		} else {
			sessions.add(sessionEnCour);
			return sessions;
		}

	}

	// get apEmp for la session "en ours"
	@RequestMapping(value = "/sessionEnCour/{idEmp}", method = RequestMethod.GET)
	public Boolean findApEmp(@PathVariable Long idEmp) {
		Boolean exist = false;
		Employe employeur = employeRepository.findById(idEmp).get();
		List<ApEmploye> listAppEmp = new ArrayList<ApEmploye>(employeur.getApEmployes());
		AnnualSession sessionEnCour = annualSessionRepository.findAnnualSession();
		for (int i = 0; i < listAppEmp.size(); i++) {
			if (listAppEmp.get(i).getAnnualSession().getIdAnn() == sessionEnCour.getIdAnn()) {
				exist = true;

			}
		}
		return exist;
	}

	// get the session "cloturé"
	@RequestMapping(value = "/sessionCloture/{idEmp}/{idAnn}", method = RequestMethod.GET)
	public ApEmploye findSession_C(@PathVariable Long idEmp, @PathVariable Long idAnn) {
		ApEmploye apEmp = null;
		Employe employeur = employeRepository.findById(idEmp).get();
		List<ApEmploye> listAppEmp = new ArrayList<ApEmploye>(employeur.getApEmployes());
		for (int i = 0; i < listAppEmp.size(); i++) {
			if (listAppEmp.get(i).getAnnualSession().getIdAnn() == idAnn) {
				apEmp = listAppEmp.get(i);
			}
		}
		return apEmp;
	}

	// appEmp list
	@RequestMapping(method = RequestMethod.GET, value = "/appEmployer/{idEmp}")
	public ApEmploye getAppEmployer(@PathVariable Long idEmp) {
		// get employer by id
		Employe employeur = employeRepository.findById(idEmp).get();
		// get annual en cour
		AnnualSession session = annualSessionRepository.findAnnualSession();
		// get appEmp d'employeur
		Set<ApEmploye> appEmpList = employeur.getApEmployes();
		// initialiser un variable pour tester si l'appEmp d'employeur existe deja ou nn
		ApEmploye appSession = null;
		// transformer une Set à une liste
		List<ApEmploye> listAppEmp = new ArrayList<ApEmploye>(appEmpList);
		// tester si l'employeur a deja une AppEmp de la session en cour
		for (int i = 0; i < listAppEmp.size(); i++) {
			// s'il existe une appEmp on l'enregistrer dans la variable appSession
			if (listAppEmp.get(i).getAnnualSession().getLabel() == session.getLabel()) {
				appSession = listAppEmp.get(i);
			}
		}
		// tester la valeur de la variable "appSession"
		if (appSession != null) {
			return appSession;
		} else {
			ApEmploye appEmp = new ApEmploye();
			appEmp.setStatus(Constantes.STATUS_ENCOURS);
			appEmp.setAnnualSession(session);
			appEmp.setEmploye(employeur);
			apEmployer.save(appEmp);
			appSession = appEmp;
			return appSession;
		}

	}

	// affecte employers to a manager
	@RequestMapping(value = "/employersSelect/{idEmp}", method = RequestMethod.PUT)
	public Employe update(@PathVariable("idEmp") Long idEmp, @RequestBody List<Employe> employers) {
		Employe employeur = employeRepository.findEmployeByIdEmp(idEmp);
		// get manager list of employers
		List<Employe> listEmployers = new ArrayList<Employe>(employeur.getManagerTeam());
		// update employer
		for (int j = 0; j < employers.size(); j++) {
			employers.get(j).setManager(employeur);
			employers.get(j).setIdEmp(employers.get(j).getIdEmp());
			employeRepository.save(employers.get(j));
		}
		// add employers selected by manager
		for (int i = 0; i < employers.size(); i++) {
			listEmployers.add(employers.get(i));

		}
		// transform list to a set
		Set<Employe> employersSelected = listEmployers.stream().collect(Collectors.toSet());
		employeur.setIdEmp(idEmp);
		employeur.setManagerTeam(employersSelected);
		employeRepository.save(employeur);
		return employeur;
	}

	// get employer manager
	@RequestMapping(method = RequestMethod.GET, value = "/employerManager/{idEmp}")
	public Employe getEmployeurManager(@PathVariable Long idEmp) {
		Employe employeur = employeRepository.findById(idEmp).get();
		Employe manager = employeur.getManager();
		return manager;
	}

	// list of employers by teams
	@RequestMapping(method = RequestMethod.GET, value = "/employersList/{team}")
	public List<Employe> getEmployeurByTeam(@PathVariable String team) {
		return employeRepository.findEmployeByTeam(team);
	}

	// find team by id
	@RequestMapping(method = RequestMethod.GET, value = "/team/{idTeam}")
	public Optional<DivTeams> getTeam(@PathVariable Long idTeam) {
		Optional<DivTeams> team = divTeamsRepository.findById(idTeam);
		return team;
	}

	// get list of all employers
	@RequestMapping(method = RequestMethod.GET, value = "/allEmployers")
	public List<Employe> getAllEmployer() {
		return employeRepository.findAll();
	}

	// get list of manager
	@RequestMapping(method = RequestMethod.GET, value = "/managers")
	public List<Employe> getManagerList() {
		return employeRepository.getManagerList();
	}

}
