package com.belleileperfumee.belle_ile_parfumee.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "orders")
@Data
public class Order {

    @Id
    @Column(name = "command_number", length = 50)
    private String commandNumber;

    @Column(length = 255)
    private String email;

    @Column(name = "order_date", nullable = false)
    private LocalDate orderDate;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private OrderStatus status = OrderStatus.PENDING;

    @ManyToOne
    @JoinColumn(name = "email_1", nullable = false)
    private Client client;
}
