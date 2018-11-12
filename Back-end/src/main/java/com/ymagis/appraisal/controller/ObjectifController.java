package com.ymagis.appraisal.controller;

import com.ymagis.appraisal.entities.*;
import com.ymagis.appraisal.repository.*;
import com.ymagis.appraisal.utils.Constantes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.DateFormatter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Year;
import java.util.*;

@RestController
public class ObjectifController {

    @Autowired
    private ApEmployeRepository apEmployeRepository;

    @Autowired
    private AnnualSessionRepository annualSessionRepository;

    @Autowired
    private EmployeRepository employeRepository;

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private ObjectifRepository objectifRepository;


    //Recuperer les objectifs de l'année passé pour un employé
    @GetMapping(value = "/Objectifs")
    public Page<ApObjEmp> listObjectifs(@RequestParam("year") String year, @RequestParam("idEmp") Long idEmp,
                                       @RequestParam(name = "page", defaultValue = "0") int page,
                                       @RequestParam(name = "size", defaultValue = "10") int size) throws ParseException {
        Integer lastYear = Integer.parseInt(year) - 1;
        AnnualSession annualSession = annualSessionRepository.findAnnualSessionByLabel(lastYear.toString());
        Employe employe = employeRepository.findEmployeByIdEmp(idEmp);
        ApEmploye apEmploye = apEmployeRepository.findApEmployeByAnnualSessionAndEmploye(annualSession, employe);
        if(null != apEmploye){
            Set<ApObjEmp> apObjEmps = apEmploye.getApObjEmps();
            if(null != apObjEmps && !apObjEmps.isEmpty()){

                List<ApObjEmp> listObj = new ArrayList<>(apObjEmps);
                //Recuperer la liste des pages des objectifs definient l'année dernière
                Page<ApObjEmp> objectivePage = new PageImpl<ApObjEmp>(listObj, PageRequest.of(page, size), apObjEmps.size());
                return objectivePage;
            } else{
                throw new RuntimeException("list of objectives is empty");
            }
        }
        return null;
    }

    //Liste des ratings
    @GetMapping(value = "/Ratings")
    public List<Rating> getAllRatings() {
        List<Rating> ratings = this.ratingRepository.findAll();
        return ratings;
    }

    //Mettre à jour la mention rating et commenatire pour les objectifs de l'année dernière
    @RequestMapping(value = "/Objectives", method = RequestMethod.PUT)
    public boolean updateObjEmp(@RequestBody List<ApObjEmp> listObj) {
        if(null == listObj || listObj.isEmpty()){
            throw new RuntimeException("list of objectives is empty");
        }else{
            objectifRepository.saveAll(listObj);
            return true;
        }
    }

    @PostMapping(value = "/StartNewSess")
    public AnnualSession StartNewSess() {
        Year currentYear = Year.now();
        AnnualSession annualSessionExist = annualSessionRepository.findAnnualSessionByLabel(currentYear.toString());
        if(null != annualSessionExist){
            throw new RuntimeException("the new session has already started");
        }else{
            AnnualSession annualSession = new AnnualSession();
            annualSession.setLabel(currentYear.toString());
            annualSession.setStatus(Constantes.CURRENT_YEAR);
            annualSessionRepository.save(annualSession);
            return annualSession;
        }
    }



}
