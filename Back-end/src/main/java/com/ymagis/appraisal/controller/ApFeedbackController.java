package com.ymagis.appraisal.controller;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.ymagis.appraisal.entities.*;
import com.ymagis.appraisal.repository.ApEmployeRepository;
import com.ymagis.appraisal.repository.FeedbackRepository;
import com.ymagis.appraisal.service.IFeedBackService;
import com.ymagis.appraisal.vo.FeedBackVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

import com.ymagis.appraisal.repository.ApFeedbackRepository;

@RestController
@CrossOrigin
public class ApFeedbackController {

	@Autowired
	private ApFeedbackRepository repository;

	@Autowired
	private ApEmployeRepository apEmployeRepository;

	@Autowired
	private FeedbackRepository feedbackRepository;

	@Autowired
	private IFeedBackService feedBackService;

	@GetMapping(value = "/apfeedbacks")
	public List<ApFeedBack> getApFeedBacks() {
		return repository.findAll();

	}

	@RequestMapping(method = RequestMethod.POST, value = "/apfeedbacks/save")
	public ApFeedBack save(@RequestBody ApFeedBack model) {
		repository.save(model);
		return model;
	}

	@RequestMapping(method = RequestMethod.PUT, value = "/apfeedbacks/update/{id}")
	public ApFeedBack update(@RequestBody ApFeedBack model, @PathVariable("id") Long id) {
		model.setIdApFdBach(id);
		repository.save(model);
		return model;
	}

	@GetMapping(value = "/feedBackEmp")
	public Page<FeedBackVO> listFeedBack(@RequestParam("idApEmp") Long idApEmp,
										@RequestParam(name = "page", defaultValue = "0") int page,
										@RequestParam(name = "size", defaultValue = "10") int size) throws ParseException {
		//IFeedBackService feedBackService = new FeedBackService();
		ApEmploye apEmploye = apEmployeRepository.findApEmployeByIdApEmp(idApEmp);
		if(null == apEmploye){
			throw new RuntimeException("erreur interne");
		}
			//List<FeedBack> listFeedBack = new ArrayList<>(0);
			List<FeedBackVO> listFeedBack = new ArrayList<>(0);
			Set<ApFeedBack> apFeedBacks = apEmploye.getApFeedBacks();
			if(null != apFeedBacks && !apFeedBacks.isEmpty()){
				List<ApFeedBack> listFdb = new ArrayList<>(apFeedBacks);
				listFeedBack = feedBackService.fillFeedBackVOFromApFds(listFdb);
				Page<FeedBackVO> feedbackPage = new PageImpl<FeedBackVO>(listFeedBack, PageRequest.of(page, size), listFeedBack.size());
				return feedbackPage;
			}else {
				Page<FeedBackVO> feedbackPage = feedBackService.getFeedBacks(page, size);
				if (null == feedbackPage) {
					throw new RuntimeException("list of feedback is empty");
				} else {
					return feedbackPage;
				}
			}
}

	//Mettre à jour la mention rating et commenatire pour les objectifs de l'année dernière
	@RequestMapping(value = "/Objectives", method = RequestMethod.PUT)
	public boolean saveApFeedb(@RequestBody List<FeedBackVO> listApFdb, @RequestBody ApEmploye apEmploye) {
		if(null == listApFdb || listApFdb.isEmpty()){
			throw new RuntimeException("list of feedbacks is empty");
		}else{
			Set<ApFeedBack> apFeedbacksEmp = apEmploye.getApFeedBacks();
			if(null != apFeedbacksEmp && !apFeedbacksEmp.isEmpty()){
				Set<ApFeedBack> apFeedBackEmp = feedBackService.fillApFdbFromVO(apFeedbacksEmp, listApFdb, apEmploye);
				repository.saveAll(apFeedBackEmp);
			}else{
				Set<ApFeedBack> apFeedBackEmp = feedBackService.fillApFdbFromVO(null, listApFdb, apEmploye);
				repository.saveAll(apFeedBackEmp);
			}

			return true;
		}
	}


}
