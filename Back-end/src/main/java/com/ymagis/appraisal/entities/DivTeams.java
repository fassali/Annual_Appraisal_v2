package com.ymagis.appraisal.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import com.ymagis.appraisal.utils.Constantes;

@Entity
public class DivTeams {
	@Id
	@Column(name = Constantes.ID_DIVTEAM)
	private Long idTeam;
	@Column(name = Constantes.DIVTEAM_LABEL)
	private String label;
	public DivTeams(String label) {
		super();
		this.label = label;
	}
	public DivTeams() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Long getIdTeam() {
		return idTeam;
	}
	public void setIdTeam(Long idTeam) {
		this.idTeam = idTeam;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	
	
}
