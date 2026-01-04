package com.belleileperfumee.belle_ile_parfumee.repository;

import com.belleileperfumee.belle_ile_parfumee.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

    // Trouver les codes produits commençant par un préfixe (pour génération auto)
    @Query("SELECT p.productCode FROM Product p WHERE p.productCode LIKE :prefix% ORDER BY p.productCode DESC")
    List<String> findProductCodesByPrefix(@Param("prefix") String prefix);

    Optional<Product> findByProductCode(String productCode);

    List<Product> findByBrand(String brand);

    List<Product> findByGender(String gender);

    List<Product> findByConcentrationType(String concentrationType);

    List<Product> findByStockGreaterThan(Integer stock);

    List<Product> findByCreatedAtAfterOrderByCreatedAtDesc(LocalDate date);
}
