package com.ymagis.appraisal.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ymagis.appraisal.entities.AnnualSession;
import com.ymagis.appraisal.entities.ApEmploye;
import com.ymagis.appraisal.entities.ApObjEmp;
import com.ymagis.appraisal.entities.Employe;

@Repository
public interface ApObjEmpRepository extends JpaRepository<ApObjEmp, Long>{
	
	 @Query("select o from ApObjEmp o where o.apEmploye.idApEmp  = :i")
		public Page<ApObjEmp> getEmployerObjs(@Param("i") Long idApEmp,Pageable pageable);

	

}
