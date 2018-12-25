package com.ymagis.appraisal.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.ymagis.appraisal.entities.AnnualSession;
import com.ymagis.appraisal.entities.Employe;
import com.ymagis.appraisal.repository.AnnualSessionRepository;

@RestController
@CrossOrigin
public class AnnualSessionController {
	@Autowired
	private AnnualSessionRepository annualSessionRepository;
	
	//get list of all session in database
	@RequestMapping(method = RequestMethod.GET, value = "/sessions")
	public List<AnnualSession> sessions () {
		List<AnnualSession> sessions=annualSessionRepository.findAll();
				return sessions;
		
	}
	//update annual session status
	@RequestMapping(value = "/session/{idSession}", method = RequestMethod.PUT)
	public AnnualSession updateSession(@RequestBody AnnualSession session, @PathVariable("idSession") Long idSession) {
		Optional<AnnualSession> updateSession=annualSessionRepository.findById(idSession);
		updateSession.get().setStatus(session.getStatus());
		annualSessionRepository.save(updateSession.get());
		return updateSession.get();
	}
	//find session by id
	@RequestMapping(method = RequestMethod.GET, value = "/getSession/{idSession}")
	public AnnualSession getSession (@PathVariable Long idSession) {
		Optional<AnnualSession> session=annualSessionRepository.findById(idSession);
		return session.get();
	}
	//start new session
	@RequestMapping(method = RequestMethod.POST, value = "/newSession")
	public AnnualSession newSession(@RequestBody AnnualSession annualSession) {
		annualSessionRepository.save(annualSession);
		return annualSession;
	}
	
	
}
