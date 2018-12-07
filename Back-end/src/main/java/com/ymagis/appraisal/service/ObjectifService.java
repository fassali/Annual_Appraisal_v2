package com.ymagis.appraisal.service;

import com.ymagis.appraisal.entities.*;
import com.ymagis.appraisal.repository.*;
import com.ymagis.appraisal.utils.Constantes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class ObjectifService implements IObjectifService {

    private static final Logger logger = Logger.getLogger(ObjectifService.class.getName());

    @Autowired
    private ApEmployeRepository apEmployeRepository;

    @Autowired
    private AnnualSessionRepository annualSessionRepository;

    @Autowired
    private EmployeRepository employeRepository;

    @Autowired
    private ObjectifRepository objectifRepository;

    @Autowired
    private RatingRepository ratingRepository;



    public Page<ApObjEmp> getPageObjectifs(String year, Long idEmp, int page, int size){
        try {
            Integer lastYear = Integer.parseInt(year) - 1;
            AnnualSession annualSession = annualSessionRepository.findAnnualSessionByLabel(lastYear.toString());
            Employe employe = employeRepository.findEmployeByIdEmp(idEmp);
            ApEmploye apEmploye = apEmployeRepository.findApEmployeByAnnualSessionAndEmploye(annualSession, employe);
            if(null != apEmploye){
                Set<ApObjEmp> apObjEmps = apEmploye.getApObjEmps();
                if(null != apObjEmps && !apObjEmps.isEmpty()){

                    List<ApObjEmp> listObj = new ArrayList<>(apObjEmps);
                    //Recuperer la liste des pages des objectifs definient l'année dernière
                    Page<ApObjEmp> objectivePage = new PageImpl<>(listObj, PageRequest.of(page, size), apObjEmps.size());
                    return objectivePage;
                }
            }
        }catch (Exception e){
            logger.log(Level.SEVERE, e.toString(), e );
        }
        return null;
    }

    public boolean updateObjEmp(List<ApObjEmp> listObj, Long idapEmp){
        try {
            ApEmploye apEmploye = apEmployeRepository.findById(idapEmp).get();
            Integer lastYear = Integer.parseInt(apEmploye.getAnnualSession().getLabel()) - 1;
            AnnualSession annualSession = annualSessionRepository.findAnnualSessionByLabel(lastYear.toString());
            Employe employe = apEmploye.getEmploye();
            ApEmploye apEmployeLast = apEmployeRepository.findApEmployeByAnnualSessionAndEmploye(annualSession, employe);
            if(null == listObj || listObj.isEmpty()){
                throw new RuntimeException("list of objectives is empty");
            }else{
                for(ApObjEmp apObjEmp:listObj)
                    apObjEmp.setApEmploye(apEmployeLast);

                objectifRepository.saveAll(listObj);
                return true;
            }
        }catch (Exception e){
            logger.log(Level.SEVERE, e.toString(), e );
        }
        return false;
    }

    public AnnualSession saveAnnualSession(){
        try{
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
        }catch (Exception e) {
            logger.log(Level.SEVERE, e.toString(), e);
        }
        return null;
    }

    public List<Rating> getAllRatings() {
        List<Rating> ratings = ratingRepository.findAll();
        return ratings;
    }
}
