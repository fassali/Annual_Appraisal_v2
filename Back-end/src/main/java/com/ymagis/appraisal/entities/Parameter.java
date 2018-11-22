package com.ymagis.appraisal.entities;

import com.ymagis.appraisal.utils.Constantes;

import javax.persistence.*;
import java.io.Serializable;
@Entity
public class Parameter implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = Constantes.ID_PARAM)
    private Long idParam;

    @Column(name = Constantes.CODE)
    private String code;

    @Column(name = Constantes.LABEL)
    private String label;

    public Parameter() {
    }

    public Parameter(String code, String label) {
        this.code = code;
        this.label = label;
    }

    public Long getIdParam() {
        return idParam;
    }

    public void setIdParam(Long idParam) {
        this.idParam = idParam;
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
}
