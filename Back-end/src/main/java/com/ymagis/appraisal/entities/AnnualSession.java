package com.ymagis.appraisal.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ymagis.appraisal.utils.Constantes;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "annual_session", uniqueConstraints={@UniqueConstraint(columnNames = "label")})
public class AnnualSession implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAnn;

    @Column(name = Constantes.LABEL, nullable = false)
    private String label;

    @Column(name = Constantes.STATUS, nullable = false)
    private String status;

    @JsonIgnore
    @OneToMany(mappedBy = "annualSession", fetch=FetchType.LAZY)
    private Set<ApEmploye> apEmployes;

    public AnnualSession(String label, String status, Set<ApEmploye> apEmployes) {
        this.label = label;
        this.status = status;
        this.apEmployes = apEmployes;
    }

    public AnnualSession() {
    }

    public Long getIdAnn() {
        return idAnn;
    }

    public void setIdAnn(Long idAnn) {
        this.idAnn = idAnn;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Set<ApEmploye> getApEmployes() {
        return apEmployes;
    }

    public void setApEmployes(Set<ApEmploye> apEmployes) {
        this.apEmployes = apEmployes;
    }
}
