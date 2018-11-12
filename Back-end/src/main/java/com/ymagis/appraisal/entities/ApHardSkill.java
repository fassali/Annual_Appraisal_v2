package com.ymagis.appraisal.entities;

import javax.persistence.*;
import java.io.Serializable;
@Entity
@NamedQuery(name = "ApHardSkill.namedFindAllApHardSkillsByApEmploye", query = "select a from ApHardSkill a where a.apEmploye.idApEmp = :idApEmp")
public class ApHardSkill implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idApHdSkill;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    //@JsonIgnore
    @JoinColumn(name = "id_ap_emp")
    private ApEmploye apEmploye;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_rating")
    private Rating rating;

    private String skill;

    private String mean;

    private String comment;

    public ApHardSkill() {
    }

    public ApHardSkill(Long idApHdSkill, ApEmploye apEmploye, Rating rating, String skill, String mean, String comment) {
        this.idApHdSkill = idApHdSkill;
        this.apEmploye = apEmploye;
        this.rating = rating;
        this.skill = skill;
        this.mean = mean;
        this.comment = comment;
    }

    public Long getIdApHdSkill() {
        return idApHdSkill;
    }

    public void setIdApHdSkill(Long idApHdSkill) {
        this.idApHdSkill = idApHdSkill;
    }

    public ApEmploye getApEmploye() {
        return apEmploye;
    }

    public void setApEmploye(ApEmploye apEmploye) {
        this.apEmploye = apEmploye;
    }

    public Rating getRating() {
        return rating;
    }

    public void setRating(Rating rating) {
        this.rating = rating;
    }

    public String getSkill() {
        return skill;
    }

    public void setSkill(String skill) {
        this.skill = skill;
    }

    public String getMean() {
        return mean;
    }

    public void setMean(String mean) {
        this.mean = mean;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
