package com.ymagis.appraisal.service;

import com.ymagis.appraisal.entities.ApObjEmp;
import org.springframework.data.domain.Page;

public interface IObjectifService {

    Page<ApObjEmp> getPageObjectifs(String year, Long idEmp, int page, int size);
}
