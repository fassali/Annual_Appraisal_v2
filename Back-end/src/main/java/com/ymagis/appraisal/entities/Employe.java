package com.ymagis.appraisal.entities;

import com.ymagis.appraisal.utils.Constantes;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Employe implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = Constantes.ID_EMP)
    private Long idEmp;

    @Column(name = Constantes.FIRST_NAME)
    private String firstName;

    @Column(name = Constantes.LAST_NAME)
    private String lastName;

    @Column(name = Constantes.POSITION)
    private String position;

    @Column(name = Constantes.TEAM)
    private String team;

    @Temporal(TemporalType.DATE)
    @Column(name = Constantes.DATE_ENTRY)
    private Date dateEntry;

    @Column(name = Constantes.USER_NAME)
    private String username;

    @Column(name = Constantes.EMAIL)
    private String email;

    @Column(name = Constantes.ADMIN)
    private String admin;

    @Column(name = Constantes.REMOVE)
    private Integer remove;

    @ManyToOne
    @JoinColumn(name = Constantes.MANAGER)
    private Employe manager;

    @OneToMany(mappedBy = Constantes.MANAGER)
    private Set<Employe> managerTeam = new HashSet<>();

    //    @JsonIgnore
    @OneToMany(mappedBy = Constantes.EMPLOYE, fetch=FetchType.LAZY)
    //,cascade = { CascadeType.MERGE, CascadeType.PERSIST }
    private Set<ApEmploye> apEmployes;

    public Employe() {
    }

    public Employe(String firstName, String lastName, String position, String team, Date dateEntry, String username,
                   String email, Employe manager, String admin, Integer remove, Integer idManager,
                   Set<ApEmploye> apEmployes, Set<Employe> managerTeam) {
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
        this.managerTeam = managerTeam;
        this.apEmployes = apEmployes;
    }

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

    /*public Integer getIdManager() {
        return idManager;
    }

    public void setIdManager(Integer idManager) {
        this.idManager = idManager;
    }*/

    public Employe getManager() {
        return manager;
    }

    public void setManager(Employe manager) {
        this.manager = manager;
    }

    public Set<Employe> getManagerTeam() {
        return managerTeam;
    }

    public void setManagerTeam(Set<Employe> managerTeam) {
        this.managerTeam = managerTeam;
    }
}
