package com.belleileperfumee.belle_ile_parfumee.service;

import com.belleileperfumee.belle_ile_parfumee.dto.cart.CartItemDTO;
import com.belleileperfumee.belle_ile_parfumee.dto.cart.CartResponseDTO;
import com.belleileperfumee.belle_ile_parfumee.entity.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    private static final String SHOP_EMAIL = "belle.ile.parfumee@gmail.com";

    /**
     * Envoie un email de notification pour une nouvelle commande
     */
    @Async
    public void sendOrderNotification(CartResponseDTO order, Client client) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(SHOP_EMAIL);
            message.setTo(SHOP_EMAIL);
            message.setSubject("Nouvelle commande - " + order.getCommandNumber());
            message.setText(buildOrderEmailContent(order, client));

            mailSender.send(message);
        } catch (Exception e) {
            // Log l'erreur mais ne bloque pas la commande
            System.err.println("Erreur envoi email: " + e.getMessage());
        }
    }

    /**
     * Construit le contenu de l'email
     */
    private String buildOrderEmailContent(CartResponseDTO order, Client client) {
        StringBuilder sb = new StringBuilder();

        sb.append("=== NOUVELLE COMMANDE ===\n\n");

        sb.append("N° Commande: ").append(order.getCommandNumber()).append("\n");
        sb.append("Date: ").append(order.getOrderDate()).append("\n\n");

        sb.append("--- CLIENT ---\n");
        sb.append("Nom: ").append(client.getFirstName()).append(" ").append(client.getLastName()).append("\n");
        sb.append("Email: ").append(client.getEmail()).append("\n");
        sb.append("Téléphone: ").append(client.getPhoneNumber() != null ? client.getPhoneNumber() : "Non renseigné").append("\n\n");

        sb.append("--- PRODUITS ---\n");
        for (CartItemDTO item : order.getItems()) {
            sb.append("• ").append(item.getProductName())
                    .append(" (").append(item.getBrand()).append(")")
                    .append(" - ").append(item.getSize()).append("ml")
                    .append("\n  Quantité: ").append(item.getQuantity())
                    .append(" x ").append(item.getUnitPrice()).append("€")
                    .append(" = ").append(item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity()))).append("€")
                    .append("\n");
        }

        sb.append("\n--- TOTAL ---\n");
        sb.append("Articles: ").append(order.getTotalItems()).append("\n");
        sb.append("Montant: ").append(order.getTotalPrice()).append("€\n");

        sb.append("\n=========================\n");
        sb.append("Belle Île Parfumée");

        return sb.toString();
    }
}
