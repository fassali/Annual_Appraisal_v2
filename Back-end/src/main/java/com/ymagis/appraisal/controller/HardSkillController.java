package com.ymagis.appraisal.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ymagis.appraisal.entities.ApHardSkill;
import com.ymagis.appraisal.repository.HardSkillRepository;

@RestController
@RequestMapping(value = "/competencies", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class HardSkillController {

	@Autowired
	private HardSkillRepository repository;

	@RequestMapping(value = "/appraisal/{id}", method = RequestMethod.GET)
	List<ApHardSkill> getByAppraisal(@PathVariable("id") Long id) {
		return repository.namedFindAllApHardSkillsByApEmploye(id);
	}

	@RequestMapping(value = "/", method = RequestMethod.GET)
	List<ApHardSkill> getAll() {
		return repository.findAll();
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ApHardSkill save(@RequestBody ApHardSkill model) {
		repository.save(model);
		return model;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	ApHardSkill get(@PathVariable(value = "id") Long id) throws Exception {
		Optional<ApHardSkill> item = repository.findById(id);
		if (item.isPresent()) {
			return item.get();
		}
		return null;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ApHardSkill update(@RequestBody ApHardSkill model, @PathVariable("id") Long id) {
		model.setIdApHdSkill(id);
		repository.save(model);
		return model;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable(value = "id") Long id) throws Exception {
		repository.deleteById(id);
	}

}
