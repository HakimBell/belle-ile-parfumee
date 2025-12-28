package com.belleileperfumee.belle_ile_parfumee.repository;

import com.belleileperfumee.belle_ile_parfumee.entity.OrderLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderLineRepository extends JpaRepository<OrderLine, OrderLine.OrderLineId> {

    @Query("SELECT ol FROM OrderLine ol JOIN FETCH ol.product WHERE ol.id.commandNumber = :commandNumber")
    List<OrderLine> findById_CommandNumber(@Param("commandNumber") String commandNumber);

    List<OrderLine> findById_ProductCode(String productCode);
}
