package com.ymagis.appraisal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ymagis.appraisal.entities.ApFeedBack;

@Repository
public interface ApFeedbackRepository extends JpaRepository<ApFeedBack, Long> {

	List<ApFeedBack> namedFindAllApFeedBacksByApEmploye(@Param("idApEmp") Long idApEmp);


}
