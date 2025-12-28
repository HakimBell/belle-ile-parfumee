package com.belleileperfumee.belle_ile_parfumee.dto.cart;

import com.belleileperfumee.belle_ile_parfumee.entity.OrderStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class CartResponseDTO {
    private String commandNumber;
    private String email;
    private LocalDate orderDate;
    private OrderStatus status;
    private List<CartItemDTO> items = new ArrayList<>();
    private BigDecimal totalPrice = BigDecimal.ZERO;
    private int totalItems = 0;
}
