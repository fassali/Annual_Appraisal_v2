package com.ymagis.appraisal.service;

import com.ymagis.appraisal.entities.AnnualSession;
import com.ymagis.appraisal.entities.ApEmploye;
import com.ymagis.appraisal.entities.ApObjEmp;
import com.ymagis.appraisal.entities.Employe;
import com.ymagis.appraisal.repository.AnnualSessionRepository;
import com.ymagis.appraisal.repository.ApEmployeRepository;
import com.ymagis.appraisal.repository.EmployeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class ObjectifService implements IObjectifService{


    @Autowired
    private ApEmployeRepository apEmployeRepository;

    @Autowired
    private AnnualSessionRepository annualSessionRepository;

    @Autowired
    private EmployeRepository employeRepository;


    public Page<ApObjEmp> getPageObjectifs(String year, Long idEmp, int page, int size){
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
            }
        }
        return null;
    }
}
