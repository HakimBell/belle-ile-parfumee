package com.belleileperfumee.belle_ile_parfumee.dto.order;

import lombok.Data;
import java.time.LocalDate;

@Data
public class OrderResponseDTO {
    private String commandNumber;
    private String email;
    private LocalDate orderDate;
    private String status;
    private String clientFirstName;
    private String clientLastName;
    private String clientPhoneNumber;
}