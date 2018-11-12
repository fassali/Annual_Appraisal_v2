package com.ymagis.appraisal.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
@Entity
@NamedQuery(name = "ApFeedBack.namedFindAllApFeedBacksByApEmploye", query = "select a from ApFeedBack a where a.apEmploye.idApEmp = :idApEmp")
public class ApFeedBack implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idApFdBach;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    //@JsonIgnore
    @JoinColumn(name = "id_fd_back")
    private FeedBack feedBack;

    @JsonIgnore
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "id_ap_emp")
    private ApEmploye apEmploye;

    private  String comment;

    public ApFeedBack() {
    }

    public ApFeedBack(FeedBack feedBack, ApEmploye apEmploye, String comment) {
        this.feedBack = feedBack;
        this.apEmploye = apEmploye;
        this.comment = comment;
    }

    public Long getIdApFdBach() {
        return idApFdBach;
    }

    public void setIdApFdBach(Long idApFdBach) {
        this.idApFdBach = idApFdBach;
    }

    public FeedBack getFeedBack() {
        return feedBack;
    }

    public void setFeedBack(FeedBack feedBack) {
        this.feedBack = feedBack;
    }

    public ApEmploye getApEmploye() {
        return apEmploye;
    }

    public void setApEmploye(ApEmploye apEmploye) {
        this.apEmploye = apEmploye;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
