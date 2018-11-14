package com.ymagis.appraisal.vo;

import com.ymagis.appraisal.entities.FeedBack;

import java.io.Serializable;

public class FeedBackVO implements Serializable {

    private String code;

    private Long idFdb;

    private String label;

    private String comment;

    private FeedBack feedBack;

    public Long getIdFdb() {
        return idFdb;
    }

    public void setIdFdb(Long idFdb) {
        this.idFdb = idFdb;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public FeedBack getFeedBack() {
        return feedBack;
    }

    public void setFeedBack(FeedBack feedBack) {
        this.feedBack = feedBack;
    }
}
