package com.ymagis.appraisal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ymagis.appraisal.entities.DivTeams;

@Repository
public interface DivTeamsRepository extends JpaRepository<DivTeams,Long> {
}
