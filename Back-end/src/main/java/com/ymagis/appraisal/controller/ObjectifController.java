package com.ymagis.appraisal.controller;

import com.ymagis.appraisal.entities.*;
import com.ymagis.appraisal.service.IObjectifService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@CrossOrigin
public class ObjectifController {

    @Autowired
    private IObjectifService objectifService;


    //Recuperer les objectifs de l'année passé pour un employé
    @GetMapping(value = "/Objectifs/{year}/empl/{idEmp}")
    public Page<ApObjEmp> listObjectifs(@PathVariable("year") String year, @PathVariable("idEmp") Long idEmp,
                                       @RequestParam(name = "page", defaultValue = "0") int page,
                                       @RequestParam(name = "size", defaultValue = "10") int size) throws Exception {
        Page<ApObjEmp> objectivePage = objectifService.getPageObjectifs(year, idEmp, page, size);
        if(null == objectivePage){
            throw new RuntimeException("list of objectives is empty");
        }
        return objectivePage;
    }

    //Liste des ratings
    @GetMapping(value = "/Ratings")
    public List<Rating> getAllRatings() {
        return objectifService.getAllRatings();
    }

    //Mettre à jour la mention rating et commenatire pour les objectifs de l'année dernière
    @RequestMapping(value = "/Objectives/{idappEmp}", method = RequestMethod.PUT)
    public boolean updateObjEmp(@RequestBody List<ApObjEmp> listObj,@PathVariable Long idappEmp) {
        return objectifService.updateObjEmp(listObj, idappEmp);
    }

    @PostMapping(value = "/StartNewSess")
    public AnnualSession StartNewSess() {
        return objectifService.saveAnnualSession();
    }



}
