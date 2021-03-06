package com.ymagis.appraisal.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ymagis.appraisal.utils.Constantes;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Rating implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = Constantes.ID_RATING)
    private Long idRating;

    @Column(name = Constantes.CODE)
    private String code;

    @Column(name = Constantes.LABEL)
    private String label;

    @JsonIgnore
    @OneToMany(mappedBy = Constantes.RATING, fetch=FetchType.LAZY)
    private Set<ApHardSkill> apHardSkills = new HashSet<>(0);

    @JsonIgnore
    @OneToMany(mappedBy = Constantes.RATING, fetch=FetchType.EAGER)
    private Set<ApObjEmp> apObjEmps = new HashSet<>(0);

    public Rating() {
    }

    public Rating(String code, String label, Set<ApHardSkill> apHardSkills, Set<ApObjEmp> apObjEmps) {
        this.code = code;
        this.label = label;
        this.apHardSkills = apHardSkills;
        this.apObjEmps = apObjEmps;
    }

    public Long getIdRating() {
        return idRating;
    }

    public void setIdRating(Long idRating) {
        this.idRating = idRating;
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

    public Set<ApHardSkill> getApHardSkills() {
        return apHardSkills;
    }

    public void setApHardSkills(Set<ApHardSkill> apHardSkills) {
        this.apHardSkills = apHardSkills;
    }

    public Set<ApObjEmp> getApObjEmps() {
        return apObjEmps;
    }

    public void setApObjEmps(Set<ApObjEmp> apObjEmps) {
        this.apObjEmps = apObjEmps;
    }
}
