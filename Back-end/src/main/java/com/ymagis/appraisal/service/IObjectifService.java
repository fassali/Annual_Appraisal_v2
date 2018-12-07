package com.ymagis.appraisal.service;

import com.ymagis.appraisal.entities.AnnualSession;
import com.ymagis.appraisal.entities.ApObjEmp;
import com.ymagis.appraisal.entities.Rating;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IObjectifService {

    Page<ApObjEmp> getPageObjectifs(String year, Long idEmp, int page, int size);

    boolean updateObjEmp(List<ApObjEmp> listObj, Long idapEmp);

    AnnualSession saveAnnualSession();

    List<Rating> getAllRatings();

}
