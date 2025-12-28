package com.belleileperfumee.belle_ile_parfumee.dto.cart;

import lombok.Data;

@Data
public class CartItemRequestDTO {
    private String productCode;
    private Integer quantity;
}
