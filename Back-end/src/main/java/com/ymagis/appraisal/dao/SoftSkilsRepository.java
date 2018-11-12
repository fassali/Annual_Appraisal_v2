package com.ymagis.appraisal.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ymagis.appraisal.entities.SoftSkill;

@Repository
public interface SoftSkilsRepository extends JpaRepository<SoftSkill, Long> {

	@Query("select c from SoftSkill c where c.isRemoved = false")
	public Page<SoftSkill> getoftSkill(Pageable pageable);
	
	@Query("select c from SoftSkill c where c.label = :lab and c.isRemoved = false")
	public SoftSkill getsoftSkill(@Param("lab")String label);
}
