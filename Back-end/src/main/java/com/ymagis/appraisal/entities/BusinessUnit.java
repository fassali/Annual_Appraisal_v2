package com.ymagis.appraisal.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.ymagis.appraisal.utils.Constantes;

@Entity
public class BusinessUnit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = Constantes.ID_BU)
	private Long idBu;
	@Column(name = Constantes.Bu_LABEL)
	private String label;
	public BusinessUnit(String label) {
		super();
		this.label = label;
	}
	public BusinessUnit() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Long getIdBu() {
		return idBu;
	}
	public void setIdBu(Long idBu) {
		this.idBu = idBu;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	
}
