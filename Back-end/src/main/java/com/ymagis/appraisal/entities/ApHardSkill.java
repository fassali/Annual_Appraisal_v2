package com.ymagis.appraisal.entities;

import com.ymagis.appraisal.utils.Constantes;

import javax.persistence.*;
import java.io.Serializable;
@Entity
@NamedQuery(name = "ApHardSkill.namedFindAllApHardSkillsByApEmploye", query = "select a from ApHardSkill a where a.apEmploye.idApEmp = :idApEmp")
public class ApHardSkill implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = Constantes.ID_APHDSKILL)
    private Long idApHdSkill;

    @ManyToOne(fetch = FetchType.LAZY,cascade=CascadeType.ALL)
    //@JsonIgnore
    @JoinColumn(name = Constantes.ID_APEMP, nullable = false)
    private ApEmploye apEmploye;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = Constantes.ID_RATING)
    private Rating rating;

    @Column(name = Constantes.SKILL)
    private String skill;

    @Column(name = Constantes.MEAN)
    private String mean;

    @Column(name = Constantes.COMMENT)
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
