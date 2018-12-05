package com.ymagis.appraisal.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ymagis.appraisal.utils.Constantes;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "soft_skill")
public class SoftSkill implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = Constantes.ID_SOFT_SKILL)
    private Long idSoftSkill;

    @Column(name = Constantes.CODE)
    private String code;

    @Column(name = Constantes.IS_REMOVED)
    private boolean isRemoved;

    @Column(name = Constantes.LABEL)
    private String label;


    //@JsonIgnore
    @OneToMany(mappedBy = Constantes.SOFTSKILL, cascade=CascadeType.ALL,  fetch=FetchType.LAZY)
    private Set<Level> levels;


    public SoftSkill() {
    }

    public SoftSkill(String code, String label, Set<Level> levels) {
        this.code = code;
        this.label = label;
        this.levels = levels;
    }

    public Long getIdSoftSkill() {
        return idSoftSkill;
    }

    public void setIdSoftSkill(Long idSoftSkill) {
        this.idSoftSkill = idSoftSkill;
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

    public Set<Level> getLevels() {
        return levels;
    }

    public void setLevels(Set<Level> levels) {
        this.levels = levels;
    }

	public boolean isRemoved() {
		return isRemoved;
	}

	public void setRemoved(boolean isRemoved) {
		this.isRemoved = isRemoved;
	}


    
}
