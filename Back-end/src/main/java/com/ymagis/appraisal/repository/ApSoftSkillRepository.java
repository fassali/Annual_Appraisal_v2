package com.ymagis.appraisal.repository;

import com.ymagis.appraisal.entities.ApSoftSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApSoftSkillRepository extends JpaRepository<ApSoftSkill, Long> {

}
