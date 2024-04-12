package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.ResourcesCategorie;
import com.bezkoder.springjwt.models.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockRepository extends JpaRepository<Stock,Long> {

    List<Stock> findAvailableStocksByCategorieStockAndResourceIsNull(ResourcesCategorie resourcesCategorie);
    List<Stock> findStockByQuantityLessThan(int i);
    @Query("SELECT s FROM Stock s WHERE s.replenishmentAlert = true")
    List<Stock> findStockByReplenishmentAlert();
}
