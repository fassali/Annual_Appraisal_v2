package com.ymagis.appraisal.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "soft_skill")
public class SoftSkill implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idSoftSkill;

    private String code;
    private boolean isRemoved;
    private String label;


    //@JsonIgnore
    @OneToMany(mappedBy = "softSkill", cascade=CascadeType.ALL, fetch=FetchType.LAZY)
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
