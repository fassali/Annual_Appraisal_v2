package com.ymagis.appraisal.repository;

import com.ymagis.appraisal.entities.Employe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface EmployeRepository extends JpaRepository<Employe, Long> {

    public Employe findEmployeByIdEmp(@Param("idEmp") Long idEmp);
    
    public Employe findByUsername (String username);
    @Query("select e from Employe e where e.idManager  = :i and  e.remove=1")
	public Page<Employe> getEmployer(@Param("i") Integer idManager, Pageable pageable);
    
    @Query("select e from Employe e where e.idManager  = :i  and e.firstName  = :f and  e.remove=1")
	public Page<Employe> findEmployer(@Param("i") Integer idManager,@Param("f") String first, Pageable pageable);
}
