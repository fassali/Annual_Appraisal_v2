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

import com.ymagis.appraisal.entities.FeedBack;
import com.ymagis.appraisal.repository.FeedbackRepository;

@RestController
@RequestMapping(value = "/feedback", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class FeedbackController {

	@Autowired
	private FeedbackRepository repository;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	List<FeedBack> getAll() {
		return repository.findAll();
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public FeedBack save(@RequestBody FeedBack model) {
		repository.save(model);
		return model;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	FeedBack get(@PathVariable(value = "id") Long id) throws Exception {
		Optional<FeedBack> item = repository.findById(id);
		if (item.isPresent()) {
			return item.get();
		}
		return null;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public FeedBack update(@RequestBody FeedBack model, @PathVariable("id") Long id) {
		model.setIdFdBack(id);
		repository.save(model);
		return model;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable(value = "id") Long id) throws Exception {
		repository.deleteById(id);
	}

}
