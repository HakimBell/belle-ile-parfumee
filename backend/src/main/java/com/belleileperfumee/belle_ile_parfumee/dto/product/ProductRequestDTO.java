package com.belleileperfumee.belle_ile_parfumee.dto.product;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductRequestDTO {

    private String productCode; // Généré automatiquement si non fourni

    @NotBlank(message = "Le nom du produit est requis")
    @Size(min = 2, max = 100, message = "Le nom doit contenir entre 2 et 100 caractères")
    private String name;

    @NotBlank(message = "La marque est requise")
    @Size(max = 50, message = "La marque ne peut pas dépasser 50 caractères")
    private String brand;

    @NotNull(message = "Le prix est requis")
    @DecimalMin(value = "0.01", message = "Le prix doit être supérieur à 0")
    private BigDecimal price;

    @NotNull(message = "Le stock est requis")
    @Min(value = 0, message = "Le stock ne peut pas être négatif")
    private Integer stock;

    private String description;

    private String imageUrl;

    @NotBlank(message = "Le type de concentration est requis")
    private String concentrationType;

    @NotBlank(message = "Le genre est requis")
    @Pattern(regexp = "^(Homme|Femme|Mixte)$", message = "Le genre doit être Homme, Femme ou Mixte")
    private String gender;

    @NotNull(message = "La taille est requise")
    @Min(value = 1, message = "La taille doit être supérieure à 0")
    private Integer size;
}