package com.ymagis.appraisal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ymagis.appraisal.entities.ApObjEmp;

@Repository
public interface ApObjEmpRepository extends JpaRepository<ApObjEmp, Long>{
	
	

}
