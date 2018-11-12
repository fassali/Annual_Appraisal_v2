package com.ymagis.appraisal.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ymagis.appraisal.entities.FeedBack;

@Repository
public interface FeedbackRepository extends JpaRepository<FeedBack, Long> {


}
