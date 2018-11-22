package com.ymagis.appraisal.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ymagis.appraisal.utils.Constantes;

import javax.persistence.*;
import java.io.Serializable;
@Entity
public class ApSoftSkill implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = Constantes.ID_APSFSKILL)
    private Long idApStSkill;

    @ManyToOne
    //@JsonIgnore
    @JoinColumn(name = Constantes.ID_LEVEL)
    private Level level;

    @ManyToOne
    //@JsonIgnore
    @JoinColumn(name = Constantes.ID_APEMP)
    private ApEmploye apEmploye;

    public ApSoftSkill() {
    }

    public Long getIdApStSkill() {
        return idApStSkill;
    }

    public void setIdApStSkill(Long idApStSkill) {
        this.idApStSkill = idApStSkill;
    }


    public Level getLevel() {
        return level;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public ApEmploye getApEmploye() {
        return apEmploye;
    }

    public void setApEmploye(ApEmploye apEmploye) {
        this.apEmploye = apEmploye;
    }
}
