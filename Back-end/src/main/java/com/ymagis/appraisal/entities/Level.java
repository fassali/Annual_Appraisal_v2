package com.ymagis.appraisal.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ymagis.appraisal.utils.Constantes;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "level")

public class Level implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = Constantes.ID_LEVEL)
	private Long idLevel;

	@Column(name = Constantes.DEGREE)
	private int degree;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = Constantes.ID_SOFT_SKILL)
    private SoftSkill softSkill;

	@Column(name = Constantes.MEAN)
	private String mean;

	@Column(name = Constantes.IS_REMOVED)
	private boolean isRemoved;

    @JsonIgnore
    @OneToMany(mappedBy = Constantes.LEVEL, fetch=FetchType.LAZY)
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
