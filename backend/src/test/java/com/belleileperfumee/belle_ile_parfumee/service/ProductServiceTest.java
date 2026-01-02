package com.belleileperfumee.belle_ile_parfumee.service;

import com.belleileperfumee.belle_ile_parfumee.entity.Product;
import com.belleileperfumee.belle_ile_parfumee.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    private Product testProduct;

    @BeforeEach
    void setUp() {
        testProduct = new Product();
        testProduct.setProductCode("PROD-TEST123");
        testProduct.setName("Parfum Test");
        testProduct.setBrand("Marque Test");
        testProduct.setPrice(new BigDecimal("99.99"));
        testProduct.setStock(10);
        testProduct.setDescription("Description test");
        testProduct.setConcentrationType("Eau de Parfum");
        testProduct.setGender("Mixte");
        testProduct.setSize(100);
        testProduct.setCreatedAt(LocalDate.now());
    }

    @Test
    @DisplayName("Doit retourner tous les produits")
    void getAllProducts_ShouldReturnAllProducts() {
        // Given
        Product product2 = new Product();
        product2.setProductCode("PROD-TEST456");
        product2.setName("Autre Parfum");

        when(productRepository.findAll()).thenReturn(Arrays.asList(testProduct, product2));

        // When
        List<Product> result = productService.getAllProducts();

        // Then
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(productRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("Doit retourner un produit par son code")
    void getProductByCode_ShouldReturnProduct_WhenExists() {
        // Given
        when(productRepository.findByProductCode("PROD-TEST123")).thenReturn(Optional.of(testProduct));

        // When
        Optional<Product> result = productService.getProductByCode("PROD-TEST123");

        // Then
        assertTrue(result.isPresent());
        assertEquals("Parfum Test", result.get().getName());
        assertEquals("Marque Test", result.get().getBrand());
        verify(productRepository, times(1)).findByProductCode("PROD-TEST123");
    }

    @Test
    @DisplayName("Doit retourner Optional vide si produit non trouvé")
    void getProductByCode_ShouldReturnEmpty_WhenNotExists() {
        // Given
        when(productRepository.findByProductCode("INEXISTANT")).thenReturn(Optional.empty());

        // When
        Optional<Product> result = productService.getProductByCode("INEXISTANT");

        // Then
        assertFalse(result.isPresent());
        verify(productRepository, times(1)).findByProductCode("INEXISTANT");
    }

    @Test
    @DisplayName("Doit créer un produit avec succès")
    void createProduct_ShouldSaveAndReturnProduct() {
        // Given
        when(productRepository.save(any(Product.class))).thenReturn(testProduct);

        // When
        Product result = productService.createProduct(testProduct);

        // Then
        assertNotNull(result);
        assertEquals("PROD-TEST123", result.getProductCode());
        assertEquals("Parfum Test", result.getName());
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    @DisplayName("Doit retourner les produits par genre")
    void getProductsByGender_ShouldReturnFilteredProducts() {
        // Given
        when(productRepository.findByGender("Mixte")).thenReturn(Arrays.asList(testProduct));

        // When
        List<Product> result = productService.getProductsByGender("Mixte");

        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Mixte", result.get(0).getGender());
        verify(productRepository, times(1)).findByGender("Mixte");
    }

    @Test
    @DisplayName("Doit retourner les nouveautés des 7 derniers jours")
    void getNewArrivals_ShouldReturnRecentProducts() {
        // Given
        LocalDate oneWeekAgo = LocalDate.now().minusDays(7);
        when(productRepository.findByCreatedAtAfterOrderByCreatedAtDesc(oneWeekAgo))
                .thenReturn(Arrays.asList(testProduct));

        // When
        List<Product> result = productService.getNewArrivals();

        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(productRepository, times(1)).findByCreatedAtAfterOrderByCreatedAtDesc(oneWeekAgo);
    }

    @Test
    @DisplayName("Doit supprimer un produit existant")
    void deleteProduct_ShouldReturnTrue_WhenProductExists() {
        // Given
        when(productRepository.existsById("PROD-TEST123")).thenReturn(true);
        doNothing().when(productRepository).deleteById("PROD-TEST123");

        // When
        boolean result = productService.deleteProduct("PROD-TEST123");

        // Then
        assertTrue(result);
        verify(productRepository, times(1)).existsById("PROD-TEST123");
        verify(productRepository, times(1)).deleteById("PROD-TEST123");
    }

    @Test
    @DisplayName("Doit retourner false si produit à supprimer n'existe pas")
    void deleteProduct_ShouldReturnFalse_WhenProductNotExists() {
        // Given
        when(productRepository.existsById("INEXISTANT")).thenReturn(false);

        // When
        boolean result = productService.deleteProduct("INEXISTANT");

        // Then
        assertFalse(result);
        verify(productRepository, times(1)).existsById("INEXISTANT");
        verify(productRepository, never()).deleteById(any());
    }
}