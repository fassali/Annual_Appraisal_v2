package com.ymagis.appraisal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ymagis.appraisal.entities.ApHardSkill;

@Repository
public interface HardSkillRepository extends JpaRepository<ApHardSkill, Long> {

	List<ApHardSkill> namedFindAllApHardSkillsByApEmploye(@Param("idApEmp") Long idApEmp);

}
