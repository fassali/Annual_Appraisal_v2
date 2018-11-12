package com.ymagis.appraisal.service;

import com.ymagis.appraisal.entities.ApEmploye;
import com.ymagis.appraisal.entities.ApFeedBack;
import com.ymagis.appraisal.entities.FeedBack;
import com.ymagis.appraisal.vo.FeedBackVO;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Set;

public interface IFeedBackService {

    List<FeedBackVO> fillFeedBackVOFromApFds(List<ApFeedBack> apFeedBacks);

    List<FeedBackVO> fillFeedBackVOFromFds(List<FeedBack> feedBacks);

    Page<FeedBackVO> getFeedBacks(int page, int size);

    Set<ApFeedBack> fillApFdbFromVO(Set<ApFeedBack> apFeedbacksEmp, List<FeedBackVO> listVO, ApEmploye apEmploye);
}
