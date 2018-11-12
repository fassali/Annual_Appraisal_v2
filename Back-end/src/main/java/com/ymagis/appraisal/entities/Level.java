package com.ymagis.appraisal.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "level")

public class Level implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idLevel;


	private int degree;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "id_soft_skill")
    private SoftSkill softSkill;


	private String mean;
	private boolean isRemoved;
    @JsonIgnore
    @OneToMany(mappedBy = "level", cascade=CascadeType.ALL, fetch=FetchType.LAZY)
    private Set<ApSoftSkill> apSoftSkills = new HashSet<>(0);



	public Level() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Level(int degree, String mean) {
		super();
		this.degree = degree;
		this.mean = mean;
	}


	public Long getIdLevel() {
		return idLevel;
	}

	public void setIdLevel(Long idLevel) {
		this.idLevel = idLevel;
	}

	public SoftSkill getSoftSkill() {
		return softSkill;
	}

	public void setSoftSkill(SoftSkill softSkill) {
		this.softSkill = softSkill;
	}



	public int getDegree() {
		return degree;
	}


	public void setDegree(int degree) {
		this.degree = degree;
	}


	public String getMean() {
		return mean;
	}

	public void setMean(String mean) {
		this.mean = mean;
	}

	public Set<ApSoftSkill> getApSoftSkills() {
		return apSoftSkills;
	}

	public void setApSoftSkills(Set<ApSoftSkill> apSoftSkills) {
		this.apSoftSkills = apSoftSkills;
	}


	public boolean isRemoved() {
		return isRemoved;
	}


	public void setRemoved(boolean isRemoved) {
		this.isRemoved = isRemoved;
	}



	
}
