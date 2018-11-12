package com.ymagis.appraisal.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ymagis.appraisal.entities.Level;
import com.ymagis.appraisal.entities.SoftSkill;



@Repository
public interface LevelRepository extends JpaRepository<Level, Long>{

	@Query("select c from Level c where c.degree = :deg")
	public Level getlevel(@Param("deg")int degree);
}
