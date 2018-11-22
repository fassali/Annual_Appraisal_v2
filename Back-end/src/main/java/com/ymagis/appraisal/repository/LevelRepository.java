package com.ymagis.appraisal.repository;

import com.ymagis.appraisal.entities.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface LevelRepository extends JpaRepository<Level, Long>{

	@Query("select c from Level c where c.degree = :deg")
	public Level getlevel(@Param("deg") int degree);
}
