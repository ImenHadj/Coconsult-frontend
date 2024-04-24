package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Recrutement;
import com.bezkoder.springjwt.models.StatutRecrut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecrutementRepo  extends JpaRepository<Recrutement, Long> {


    public List<Recrutement> findByPoste(String poste);

    @Query("SELECT r FROM Recrutement r WHERE r.statutRecrut = :statut")
    List<Recrutement> findAllByStatutRecrutement(@Param("statut") StatutRecrut statut);



}
