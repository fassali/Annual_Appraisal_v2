package com.ymagis.appraisal.service;

import com.ymagis.appraisal.entities.ApEmploye;
import com.ymagis.appraisal.entities.ApFeedBack;
import com.ymagis.appraisal.entities.FeedBack;
import com.ymagis.appraisal.repository.FeedbackRepository;
import com.ymagis.appraisal.vo.FeedBackVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FeedBackService implements IFeedBackService{

    @Autowired
    private FeedbackRepository feedbackRepository;


    //Methode permet de remplir l'objet FeedBackVO depuis l'objet ApFeedBack
    public List<FeedBackVO> fillFeedBackVOFromApFds(List<ApFeedBack> apFeedBacks){
        List<FeedBackVO> listFeedBack = new ArrayList<>(0);
        for(ApFeedBack aFdb : apFeedBacks){
            FeedBackVO feedBackVO = new FeedBackVO();
            /*feedBackVO.setCode(aFdb.getFeedBack().getCode());*/
            //feedBackVO.setLabel(aFdb.getFeedBack().getLabel());
            feedBackVO.setIdFdb(aFdb.getFeedBack().getIdFdBack());
            feedBackVO.setFeedBack(aFdb.getFeedBack());
            feedBackVO.setComment(aFdb.getComment());
            listFeedBack.add(feedBackVO);
        }
        return listFeedBack;
    }

    //Methode permet de remplir l'objet FeedBackVO depuis l'objet FeedBack
    public List<FeedBackVO> fillFeedBackVOFromFds(List<FeedBack> feedBacks){
        List<FeedBackVO> listFeedBack = new ArrayList<>(0);
        for(FeedBack fdb : feedBacks){
            FeedBackVO feedBackVO = new FeedBackVO();
            /*feedBackVO.setCode(fdb.getCode());
            feedBackVO.setLabel(fdb.getLabel());*/
            feedBackVO.setIdFdb(fdb.getIdFdBack());
            feedBackVO.setFeedBack(fdb);
            listFeedBack.add(feedBackVO);
        }
        return listFeedBack;
    }

    //Recuperation de le liste des feedBacks de l'employe
    public Page<FeedBackVO> getFeedBacks(int page, int size){
        List<FeedBack> feedBackList = feedbackRepository.findAll();
        if(null != feedBackList && !feedBackList.isEmpty()) {
            List<FeedBackVO> feedBackVOList = new ArrayList<>(0);
            feedBackVOList = fillFeedBackVOFromFds(feedBackList);
            return new PageImpl<FeedBackVO>(feedBackVOList, PageRequest.of(page, size, Sort.by("idFdb").descending()), feedBackVOList.size());
        }
        return null;
    }

    //Methode permet de remplir l'objet ApFeedBack depuis l'objet FeedBackVO
    public Set<ApFeedBack> fillApFdbFromVO(Set<ApFeedBack> apFeedbacksEmp, List<FeedBackVO> listVO, ApEmploye apEmploye){
        List<ApFeedBack> apFeedBacks = new ArrayList<>();
        if(null != apFeedbacksEmp && !apFeedbacksEmp.isEmpty()){
            Map<Long, String> mapFdb = null != getMapFromList(listVO) ? getMapFromList(listVO) : new HashMap<>(0);
            for(ApFeedBack vo : apFeedbacksEmp){
                String comment = mapFdb.get(vo.getFeedBack().getIdFdBack());
                vo.setComment(comment);
            }
        }else{
            for(FeedBackVO vo : listVO){
                ApFeedBack apFeedBack = new ApFeedBack();
                apFeedBack.setApEmploye(apEmploye);
                apFeedBack.setComment(vo.getComment());
                apFeedBack.setFeedBack(vo.getFeedBack());
                apFeedBacks.add(apFeedBack);
            }
            Set<ApFeedBack> targetSet = new HashSet(apFeedBacks);
            return targetSet;
        }
        return apFeedbacksEmp;
    }

    //renvoyer une map contenent l'id feedBack comme clé et le commentaire comme valeur
    private Map<Long, String> getMapFromList(List<FeedBackVO> listVO){
        Map<Long, String> mapComByFeed = new HashMap<>();
        for(FeedBackVO vo : listVO){
            mapComByFeed.put(vo.getFeedBack().getIdFdBack(), vo.getComment());
        }
        return mapComByFeed;
    }
}
