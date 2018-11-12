package com.ymagis.appraisal.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ymagis.appraisal.entities.ApSoftSkill;

@Repository
public interface ApSoftSkillRepository extends JpaRepository<ApSoftSkill, Long> {

}
