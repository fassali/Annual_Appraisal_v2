package com.ymagis.appraisal.repository;

import com.ymagis.appraisal.entities.ApObjEmp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ObjectifRepository extends JpaRepository<ApObjEmp, Long> {

}
