package com.belleileperfumee.belle_ile_parfumee.dto.cart;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class CartItemDTO {
    private String productCode;
    private String productName;
    private String brand;
    private BigDecimal unitPrice;
    private Integer quantity;
    private Integer stock;
    private String imageUrl;
    private String concentrationType;
    private Integer size;
    private String gender;
}
