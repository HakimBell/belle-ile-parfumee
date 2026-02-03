package com.belleileperfumee.belle_ile_parfumee.controller;

import com.belleileperfumee.belle_ile_parfumee.dto.cart.CartItemRequestDTO;
import com.belleileperfumee.belle_ile_parfumee.dto.cart.CartResponseDTO;
import com.belleileperfumee.belle_ile_parfumee.service.CartService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders/cart")
public class CartController {

    private static final Logger logger = LoggerFactory.getLogger(CartController.class);

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    /**
     * GET /api/orders/cart?email= - Récupérer le panier
     */
    @GetMapping
    public ResponseEntity<CartResponseDTO> getCart(@RequestParam String email) {
        CartResponseDTO cart = cartService.getCart(email);
        return ResponseEntity.ok(cart);
    }

    /**
     * POST /api/orders/cart/items?email= - Ajouter un produit au panier
     */
    @PostMapping("/items")
    public ResponseEntity<?> addItem(
            @RequestParam String email,
            @RequestBody CartItemRequestDTO request) {
        try {
            CartResponseDTO cart = cartService.addItemToCart(
                    email, request.getProductCode(), request.getQuantity());
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            logger.error("Erreur addItem: {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * PUT /api/orders/cart/items/{productCode}?email= - Modifier la quantité
     */
    @PutMapping("/items/{productCode}")
    public ResponseEntity<CartResponseDTO> updateItem(
            @RequestParam String email,
            @PathVariable String productCode,
            @RequestBody CartItemRequestDTO request) {
        try {
            CartResponseDTO cart = cartService.updateItemQuantity(
                    email, productCode, request.getQuantity());
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * DELETE /api/orders/cart/items/{productCode}?email= - Supprimer un produit
     */
    @DeleteMapping("/items/{productCode}")
    public ResponseEntity<CartResponseDTO> removeItem(
            @RequestParam String email,
            @PathVariable String productCode) {
        try {
            CartResponseDTO cart = cartService.removeItemFromCart(email, productCode);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * DELETE /api/orders/cart?email= - Vider le panier
     */
    @DeleteMapping
    public ResponseEntity<Void> clearCart(@RequestParam String email) {
        cartService.clearCart(email);
        return ResponseEntity.noContent().build();
    }

    /**
     * POST /api/orders/cart/checkout?email= - Valider la commande
     */
    @PostMapping("/checkout")
    public ResponseEntity<CartResponseDTO> checkout(@RequestParam String email) {
        try {
            CartResponseDTO order = cartService.checkout(email);
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}