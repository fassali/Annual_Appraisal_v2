package com.ymagis.appraisal.repository;

import com.ymagis.appraisal.entities.AnnualSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AnnualSessionRepository extends JpaRepository<AnnualSession, Long> {

    public AnnualSession findAnnualSessionByLabel(@Param("year") String year);
}
