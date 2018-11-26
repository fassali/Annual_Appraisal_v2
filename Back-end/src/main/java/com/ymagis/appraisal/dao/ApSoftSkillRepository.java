package com.ymagis.appraisal.dao;

import com.ymagis.appraisal.entities.ApEmploye;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ymagis.appraisal.entities.ApSoftSkill;

import java.util.List;

@Repository
public interface ApSoftSkillRepository extends JpaRepository<ApSoftSkill, Long> {

   // @Query("select apEmp from ApEmploye apEmp where apEmp.idApEmp = :idApEmp")
    public List<ApSoftSkill> getApSoftSkillByApEmploye(ApEmploye apEmploye);
}
