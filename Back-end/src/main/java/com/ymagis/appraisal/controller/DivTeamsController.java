package com.ymagis.appraisal.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.ymagis.appraisal.entities.DivTeams;
import com.ymagis.appraisal.repository.DivTeamsRepository;


@RestController
@CrossOrigin
public class DivTeamsController {
     @Autowired
     private DivTeamsRepository divTeamsRepository;
     
 	//get list of Teams/divisions
 	@RequestMapping(method = RequestMethod.GET, value = "/teamDivList")
 	public List<DivTeams> getTeamsList() {
 		return divTeamsRepository.findAll();
 	}
 	
}
