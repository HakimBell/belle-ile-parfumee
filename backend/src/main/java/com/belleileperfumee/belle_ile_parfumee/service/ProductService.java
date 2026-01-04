package com.belleileperfumee.belle_ile_parfumee.service;

import com.belleileperfumee.belle_ile_parfumee.entity.Product;
import com.belleileperfumee.belle_ile_parfumee.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // CREATE - Créer un nouveau produit avec génération automatique du code
    public Product createProduct(Product product) {
        // Générer un code produit automatique si non fourni
        if (product.getProductCode() == null || product.getProductCode().isEmpty()) {
            product.setProductCode(generateProductCode(product));
        }
        return productRepository.save(product);
    }

    /**
     * Génère un code produit au format: XXX-TTT-MMM-YYYY
     * XXX = Code marque (3 lettres)
     * TTT = Type concentration (EDP, EDT, EXT, EDC)
     * MMM = Taille en ml (050, 100, etc.)
     * YYYY = Numéro séquentiel (0001, 0002, etc.)
     */
    private String generateProductCode(Product product) {
        String brandCode = generateBrandCode(product.getBrand());
        String typeCode = generateTypeCode(product.getConcentrationType());
        String sizeCode = String.format("%03d", product.getSize());

        // Préfixe sans le numéro séquentiel
        String prefix = brandCode + "-" + typeCode + "-" + sizeCode + "-";

        // Trouver le prochain numéro disponible
        int nextNumber = getNextSequenceNumber(prefix);

        return prefix + String.format("%04d", nextNumber);
    }

    /**
     * Génère le code marque (3 premières lettres en majuscules)
     */
    private String generateBrandCode(String brand) {
        if (brand == null || brand.isEmpty()) {
            return "XXX";
        }
        // Supprimer les espaces et caractères spéciaux, garder les 3 premières lettres
        String cleaned = brand.replaceAll("[^a-zA-Z]", "").toUpperCase();
        if (cleaned.length() >= 3) {
            return cleaned.substring(0, 3);
        }
        // Compléter avec X si moins de 3 caractères
        return String.format("%-3s", cleaned).replace(' ', 'X');
    }

    /**
     * Génère le code type de concentration
     */
    private String generateTypeCode(String concentrationType) {
        if (concentrationType == null) {
            return "EDP";
        }
        return switch (concentrationType.toLowerCase()) {
            case "eau de parfum" -> "EDP";
            case "eau de toilette" -> "EDT";
            case "extrait" -> "EXT";
            case "eau de cologne" -> "EDC";
            default -> "EDP";
        };
    }

    /**
     * Trouve le prochain numéro séquentiel pour un préfixe donné
     */
    private int getNextSequenceNumber(String prefix) {
        List<String> existingCodes = productRepository.findProductCodesByPrefix(prefix);

        if (existingCodes.isEmpty()) {
            return 1;
        }

        // Récupérer le dernier code et extraire le numéro
        String lastCode = existingCodes.get(0);
        try {
            String numberPart = lastCode.substring(lastCode.lastIndexOf("-") + 1);
            return Integer.parseInt(numberPart) + 1;
        } catch (Exception e) {
            return 1;
        }
    }

    // READ - Récupérer tous les produits
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // READ - Récupérer un produit par son code
    public Optional<Product> getProductByCode(String productCode) {
        return productRepository.findByProductCode(productCode);
    }

    @Transactional
    public Product updateProduct(Product updatedProduct) {
        // Cherche le produit existant par son code
        return productRepository.findById(updatedProduct.getProductCode())
                .map(existingProduct -> {
                    // Mettre à jour tous les champs
                    existingProduct.setName(updatedProduct.getName());
                    existingProduct.setPrice(updatedProduct.getPrice());
                    existingProduct.setDescription(updatedProduct.getDescription());
                    existingProduct.setBrand(updatedProduct.getBrand());
                    existingProduct.setGender(updatedProduct.getGender());
                    existingProduct.setImageUrl(updatedProduct.getImageUrl());
                    existingProduct.setStock(updatedProduct.getStock());
                    existingProduct.setSize(updatedProduct.getSize());
                    existingProduct.setConcentrationType(updatedProduct.getConcentrationType());
                    return productRepository.save(existingProduct);
                })
                .orElse(null); // Si le produit n'existe pas, retourne null
    }

    // DELETE - Supprimer un produit
    public boolean deleteProduct(String productCode) {
        if (productRepository.existsById(productCode)) {
            productRepository.deleteById(productCode);
            return true;
        }
        return false; // Produit non trouvé
    }

    // BONUS - Rechercher par marque
    public List<Product> getProductsByBrand(String brand) {
        return productRepository.findByBrand(brand);
    }

    // BONUS - Rechercher par genre
    public List<Product> getProductsByGender(String gender) {
        return productRepository.findByGender(gender);
    }

    // Nouveautés - Produits ajoutés dans les 7 derniers jours
    public List<Product> getNewArrivals() {
        LocalDate oneWeekAgo = LocalDate.now().minusDays(7);
        return productRepository.findByCreatedAtAfterOrderByCreatedAtDesc(oneWeekAgo);
    }
}