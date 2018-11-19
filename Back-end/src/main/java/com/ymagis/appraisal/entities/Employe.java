package com.ymagis.appraisal.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Employe implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idEmp;
    private String firstName;
    private String lastName;
    private String position;
    private String team;
    private Date dateEntry;
    private String username;
    private String email;
    private String  manager;
    private String admin;
    private Integer remove;
    private Integer idManager;
    
    
    
    public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getManager() {
		return manager;
	}

	public void setManager(String manager) {
		this.manager = manager;
	}

	public String getAdmin() {
		return admin;
	}

	public void setAdmin(String admin) {
		this.admin = admin;
	}

	public Integer getRemove() {
		return remove;
	}

	public void setRemove(Integer remove) {
		this.remove = remove;
	}

	

//    @JsonIgnore
    @OneToMany(mappedBy = "employe", cascade = { CascadeType.MERGE, CascadeType.PERSIST }, fetch=FetchType.LAZY)
    private Set<ApEmploye> apEmployes;

    public Employe() {
    }



    public Employe(String firstName, String lastName, String position, String team, Date dateEntry, String username,
			String email, String manager, String admin, Integer remove, Integer idManager, Set<ApEmploye> apEmployes) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.position = position;
		this.team = team;
		this.dateEntry = dateEntry;
		this.username = username;
		this.email = email;
		this.manager = manager;
		this.admin = admin;
		this.remove = remove;
		this.idManager = idManager;
		this.apEmployes = apEmployes;
	}

	public Long getIdEmp() {
        return idEmp;
    }

    public void setIdEmp(Long idEmp) {
        this.idEmp = idEmp;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public Date getDateEntry() {
        return dateEntry;
    }

    public void setDateEntry(Date dateEntry) {
        this.dateEntry = dateEntry;
    }

    public Set<ApEmploye> getApEmployes() {
        return apEmployes;
    }

    public void setApEmployes(Set<ApEmploye> apEmployes) {
        this.apEmployes = apEmployes;
    }

    public Integer getIdManager() {
        return idManager;
    }

    public void setIdManager(Integer idManager) {
        this.idManager = idManager;
    }
}
