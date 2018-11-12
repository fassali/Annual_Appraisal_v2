package com.ymagis.appraisal.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
public class FeedBack implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idFdBack;

    private String code;

    private String label;

    @JsonIgnore
    @OneToMany(mappedBy = "feedBack", cascade=CascadeType.ALL, fetch=FetchType.LAZY)
    private Set<ApFeedBack> apFeedBacks = new HashSet<>(0);


    public FeedBack() {
    }

    public FeedBack(String code, String label, Set<ApFeedBack> apFeedBacks) {
        this.code = code;
        this.label = label;
        this.apFeedBacks = apFeedBacks;
    }

    public Long getIdFdBack() {
        return idFdBack;
    }

    public void setIdFdBack(Long idFdBack) {
        this.idFdBack = idFdBack;
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

    public Set<ApFeedBack> getApFeedBacks() {
        return apFeedBacks;
    }

    public void setApFeedBacks(Set<ApFeedBack> apFeedBacks) {
        this.apFeedBacks = apFeedBacks;
    }
}
