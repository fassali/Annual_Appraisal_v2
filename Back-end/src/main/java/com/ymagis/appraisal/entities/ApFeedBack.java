package com.ymagis.appraisal.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ymagis.appraisal.utils.Constantes;

import javax.persistence.*;
import java.io.Serializable;
@Entity
@NamedQuery(name = "ApFeedBack.namedFindAllApFeedBacksByApEmploye", query = "select a from ApFeedBack a where a.apEmploye.idApEmp = :idApEmp")
public class ApFeedBack implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = Constantes.ID_APFDBACK)
    private Long idApFdBack;

    @ManyToOne(fetch = FetchType.LAZY,cascade=CascadeType.ALL)
    //@JsonIgnore
    @JoinColumn(name = Constantes.ID_FDBACK, nullable = false)
    private FeedBack feedBack;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = Constantes.ID_APEMP, nullable = false)
    private ApEmploye apEmploye;

    @Column(name = Constantes.COMMENT)
    private  String comment;

    public ApFeedBack() {
    }

    public ApFeedBack(FeedBack feedBack, ApEmploye apEmploye, String comment) {
        this.feedBack = feedBack;
        this.apEmploye = apEmploye;
        this.comment = comment;
    }

    public Long getIdApFdBach() {
        return idApFdBack;
    }

    public void setIdApFdBach(Long idApFdBach) {
        this.idApFdBack = idApFdBach;
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
