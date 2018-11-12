package com.ymagis.appraisal.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
@Entity
public class ApSoftSkill implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idApStSkill;


    @ManyToOne(cascade = CascadeType.ALL)
    //@JsonIgnore
    @JoinColumn(name = "id_level")

    private Level level;

    @ManyToOne(cascade = CascadeType.ALL)
    //@JsonIgnore
    @JoinColumn(name = "id_ap_emp")
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
