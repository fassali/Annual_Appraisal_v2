package com.ymagis.appraisal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ymagis.appraisal.entities.BusinessUnit;
import com.ymagis.appraisal.entities.DivTeams;

@Repository
public interface BusinessUnitRepository extends JpaRepository<BusinessUnit, Long> {

}
