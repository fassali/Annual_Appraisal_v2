package com.ymagis.appraisal.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.security.AllPermission;
import java.util.*;

@Entity
public class ApObjEmp implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idApObjEmp;

    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.PERSIST }, fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "id_ap_emp")
    private ApEmploye apEmploye;

    private String indicator;

    private String labelObj;

    private String mean;

    private Date deadLine;

    private String comment;

    @ManyToOne(cascade = CascadeType.ALL)
    //@JsonIgnore
    @JoinColumn(name = "id_rating")
    private Rating rating;

    /*@JsonIgnore
    @ManyToMany(mappedBy = "apObjEmps")
    private Set<ApEmploye> apEmployes;*/

    public ApObjEmp() {
    }

    public ApObjEmp(Long idApObjEmp, String indicator,
                    String labelObj, String mean, Date deadLine, String comment, Rating rating,
                    ApEmploye apEmploye) {
        this.idApObjEmp = idApObjEmp;
        this.apEmploye = apEmploye;
        this.indicator = indicator;
        this.labelObj = labelObj;
        this.mean = mean;
        this.deadLine = deadLine;
        this.comment = comment;
        this.rating = rating;
    }

    public Long getIdApObjEmp() {
        return idApObjEmp;
    }

    public void setIdApObjEmp(Long idApObjEmp) {
        this.idApObjEmp = idApObjEmp;
    }

    public String getIndicator() {
        return indicator;
    }

    public void setIndicator(String indicator) {
        this.indicator = indicator;
    }

    public String getLabelObj() {
        return labelObj;
    }

    public void setLabelObj(String labelObj) {
        this.labelObj = labelObj;
    }

    public String getMean() {
        return mean;
    }

    public void setMean(String mean) {
        this.mean = mean;
    }

    public Date getDeadLine() {
        return deadLine;
    }

    public void setDeadLine(Date deadLine) {
        this.deadLine = deadLine;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Rating getRating() {
        return rating;
    }

    public void setRating(Rating rating) {
        this.rating = rating;
    }

    public ApEmploye getApEmploye() {
        return apEmploye;
    }

    public void setApEmploye(ApEmploye apEmploye) {
        this.apEmploye = apEmploye;
    }
}
