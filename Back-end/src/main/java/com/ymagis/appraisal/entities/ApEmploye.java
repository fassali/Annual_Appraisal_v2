package com.ymagis.appraisal.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class ApEmploye implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idApEmp;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    //@JsonIgnore
    @JoinColumn(name="id_ann")
    private AnnualSession annualSession;

    @ManyToOne(cascade = CascadeType.ALL)
    //@JsonIgnore
    @JoinColumn(name="id_emp")
    private Employe employe;

    private String addFBack;

    private String status;

    private String wish;

    private String opinion;

    private Date dateEntred;

    private String strength;

    private String tbImproved;

    //@JsonIgnore
    @OneToMany(mappedBy = "apEmploye", cascade=CascadeType.ALL, fetch=FetchType.LAZY)
    private Set<ApFeedBack> apFeedBacks = new HashSet<>(0);

    @JsonIgnore
    @OneToMany(mappedBy = "apEmploye", cascade=CascadeType.ALL, fetch=FetchType.LAZY)
    private Set<ApHardSkill> apHardSkills = new HashSet<>(0);

    //@JsonIgnore
    //@ManyToMany(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
    /*@JoinTable(name = "apEmploye_apObjEmp", joinColumns = @JoinColumn(name = "id_Ap_Emp", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "id_ap_obj_emp", referencedColumnName = "id"))*/
    //@JoinTable(name = "ap_employe_ap_objEmp", joinColumns = @JoinColumn(name = "id_ap_amp"), inverseJoinColumns = @JoinColumn(name = "id_ap_obj_emp"))
    //private Set<ApObjEmp> apObjEmps;


   // @JsonIgnore
    @OneToMany(mappedBy = "apEmploye", cascade=CascadeType.ALL, fetch=FetchType.EAGER)
    private Set<ApObjEmp> apObjEmps;


    @JsonIgnore
    @OneToMany(mappedBy = "apEmploye", cascade=CascadeType.ALL, fetch=FetchType.LAZY)
    private Set<ApSoftSkill> apSoftSkills = new HashSet<>(0);

    public ApEmploye() {
    }

    public ApEmploye(AnnualSession annualSession, Employe employe, String addFBack, String status, String wish,
                     String opinion, Date dateEntred, String strength, String tbImproved,
                     Set<ApFeedBack> apFeedBacks, Set<ApObjEmp> apObjEmps, Set<ApSoftSkill> apSoftSkills) {
        this.annualSession = annualSession;
        this.employe = employe;
        this.addFBack = addFBack;
        this.status = status;
        this.wish = wish;
        this.opinion = opinion;
        this.dateEntred = dateEntred;
        this.strength = strength;
        this.tbImproved = tbImproved;
        this.apFeedBacks = apFeedBacks;
        this.apObjEmps = apObjEmps;
        this.apSoftSkills = apSoftSkills;
    }

    public Long getIdApEmp() {
        return idApEmp;
    }

    public void setIdApEmp(Long idApEmp) {
        this.idApEmp = idApEmp;
    }

    public AnnualSession getAnnualSession() {
        return annualSession;
    }

    public void setAnnualSession(AnnualSession annualSession) {
        this.annualSession = annualSession;
    }

    public Employe getEmploye() {
        return employe;
    }

    public void setEmploye(Employe employe) {
        this.employe = employe;
    }

    public String getAddFBack() {
        return addFBack;
    }

    public void setAddFBack(String addFBack) {
        this.addFBack = addFBack;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getWish() {
        return wish;
    }

    public void setWish(String wish) {
        this.wish = wish;
    }

    public String getOpinion() {
        return opinion;
    }

    public void setOpinion(String opinion) {
        this.opinion = opinion;
    }

    public Date getDateEntred() {
        return dateEntred;
    }

    public void setDateEntred(Date dateEntred) {
        this.dateEntred = dateEntred;
    }

    public String getStrength() {
        return strength;
    }

    public void setStrength(String strength) {
        this.strength = strength;
    }

    public String getTbImproved() {
        return tbImproved;
    }

    public void setTbImproved(String tbImproved) {
        this.tbImproved = tbImproved;
    }

    public Set<ApFeedBack> getApFeedBacks() {
        return apFeedBacks;
    }

    public void setApFeedBacks(Set<ApFeedBack> apFeedBacks) {
        this.apFeedBacks = apFeedBacks;
    }

    public Set<ApHardSkill> getApHardSkills() {
        return apHardSkills;
    }

    public void setApHardSkills(Set<ApHardSkill> apHardSkills) {
        this.apHardSkills = apHardSkills;
    }

    public Set<ApObjEmp> getApObjEmps() {
        return apObjEmps;
    }

    public void setApObjEmps(Set<ApObjEmp> apObjEmps) {
        this.apObjEmps = apObjEmps;
    }

    public Set<ApSoftSkill> getApSoftSkills() {
        return apSoftSkills;
    }

    public void setApSoftSkills(Set<ApSoftSkill> apSoftSkills) {
        this.apSoftSkills = apSoftSkills;
    }

}
