package com.ymagis.appraisal.repository;

import com.ymagis.appraisal.entities.Employe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@Repository
public interface EmployeRepository extends JpaRepository<Employe, Long> {
    public Employe findEmployeByIdEmp(@Param("idEmp") Long idEmp);
    public Employe findByUsername (String username);
    @Query("select e from Employe e where e.manager = 'E'")
   	public List<Employe> findEmployers_WM();   
    @Query("select e from Employe  e where e.team  = :team")
    public List<Employe>  findEmployeByTeam(@Param("team")String team);
    @Query("select e from Employe  e where e.profil  = 'M' or e.profil  = 'AM'")
    public List<Employe>  getManagerList();
}
