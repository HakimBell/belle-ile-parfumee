package com.belleileperfumee.belle_ile_parfumee.mapper;

import com.belleileperfumee.belle_ile_parfumee.dto.product.ProductRequestDTO;
import com.belleileperfumee.belle_ile_parfumee.dto.product.ProductResponseDTO;
import com.belleileperfumee.belle_ile_parfumee.entity.Product;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class ProductMapperTest {

    @Test
    @DisplayName("toEntity - Doit convertir un DTO en entité")
    void toEntity_ShouldConvertDtoToEntity() {
        // Given
        ProductRequestDTO dto = new ProductRequestDTO();
        dto.setProductCode("TEST-001");
        dto.setName("Parfum Test");
        dto.setBrand("Marque Test");
        dto.setPrice(new BigDecimal("99.99"));
        dto.setStock(10);
        dto.setDescription("Description test");
        dto.setImageUrl("http://example.com/image.jpg");
        dto.setConcentrationType("Eau de Parfum");
        dto.setGender("Mixte");
        dto.setSize(100);

        // When
        Product result = ProductMapper.toEntity(dto);

        // Then
        assertNotNull(result);
        assertEquals("TEST-001", result.getProductCode());
        assertEquals("Parfum Test", result.getName());
        assertEquals("Marque Test", result.getBrand());
        assertEquals(new BigDecimal("99.99"), result.getPrice());
        assertEquals(10, result.getStock());
        assertEquals("Description test", result.getDescription());
        assertEquals("http://example.com/image.jpg", result.getImageUrl());
        assertEquals("Eau de Parfum", result.getConcentrationType());
        assertEquals("Mixte", result.getGender());
        assertEquals(100, result.getSize());
    }

    @Test
    @DisplayName("toEntity - Doit retourner null si DTO est null")
    void toEntity_ShouldReturnNull_WhenDtoIsNull() {
        // When
        Product result = ProductMapper.toEntity(null);

        // Then
        assertNull(result);
    }

    @Test
    @DisplayName("toResponseDTO - Doit convertir une entité en DTO")
    void toResponseDTO_ShouldConvertEntityToDto() {
        // Given
        Product product = new Product();
        product.setProductCode("TEST-001");
        product.setName("Parfum Test");
        product.setBrand("Marque Test");
        product.setPrice(new BigDecimal("99.99"));
        product.setStock(10);
        product.setDescription("Description test");
        product.setImageUrl("http://example.com/image.jpg");
        product.setCreatedAt(LocalDate.of(2024, 1, 15));
        product.setConcentrationType("Eau de Parfum");
        product.setGender("Mixte");
        product.setSize(100);

        // When
        ProductResponseDTO result = ProductMapper.toResponseDTO(product);

        // Then
        assertNotNull(result);
        assertEquals("TEST-001", result.getProductCode());
        assertEquals("Parfum Test", result.getName());
        assertEquals("Marque Test", result.getBrand());
        assertEquals(new BigDecimal("99.99"), result.getPrice());
        assertEquals(10, result.getStock());
        assertEquals("Description test", result.getDescription());
        assertEquals("http://example.com/image.jpg", result.getImageUrl());
        assertEquals(LocalDate.of(2024, 1, 15), result.getCreatedAt());
        assertEquals("Eau de Parfum", result.getConcentrationType());
        assertEquals("Mixte", result.getGender());
        assertEquals(100, result.getSize());
    }

    @Test
    @DisplayName("toResponseDTO - Doit retourner null si entité est null")
    void toResponseDTO_ShouldReturnNull_WhenEntityIsNull() {
        // When
        ProductResponseDTO result = ProductMapper.toResponseDTO(null);

        // Then
        assertNull(result);
    }
}
