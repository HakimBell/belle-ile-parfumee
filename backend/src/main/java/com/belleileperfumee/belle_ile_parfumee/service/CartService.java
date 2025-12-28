package com.belleileperfumee.belle_ile_parfumee.service;

import com.belleileperfumee.belle_ile_parfumee.dto.cart.CartItemDTO;
import com.belleileperfumee.belle_ile_parfumee.dto.cart.CartResponseDTO;
import com.belleileperfumee.belle_ile_parfumee.entity.*;
import com.belleileperfumee.belle_ile_parfumee.repository.ClientRepository;
import com.belleileperfumee.belle_ile_parfumee.repository.OrderLineRepository;
import com.belleileperfumee.belle_ile_parfumee.repository.OrderRepository;
import com.belleileperfumee.belle_ile_parfumee.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class CartService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderLineRepository orderLineRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ClientRepository clientRepository;

    /**
     * Récupère ou crée un panier (commande PENDING) pour un utilisateur
     */
    public Order getOrCreateCart(String email) {
        Optional<Order> existingCart = orderRepository.findByClient_EmailAndStatus(email, OrderStatus.PENDING);

        if (existingCart.isPresent()) {
            return existingCart.get();
        }

        // Créer un nouveau panier
        Client client = clientRepository.findById(email)
                .orElseThrow(() -> new RuntimeException("Client non trouvé"));

        Order cart = new Order();
        cart.setCommandNumber("CART-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        cart.setEmail(email);
        cart.setOrderDate(LocalDate.now());
        cart.setStatus(OrderStatus.PENDING);
        cart.setClient(client);

        return orderRepository.save(cart);
    }

    /**
     * Récupère le panier d'un utilisateur
     */
    public CartResponseDTO getCart(String email) {
        Optional<Order> cart = orderRepository.findByClient_EmailAndStatus(email, OrderStatus.PENDING);

        if (cart.isEmpty()) {
            return new CartResponseDTO();
        }

        return buildCartResponse(cart.get());
    }

    /**
     * Ajoute un produit au panier
     */
    public CartResponseDTO addItemToCart(String email, String productCode, int quantity) {
        Order cart = getOrCreateCart(email);

        Product product = productRepository.findById(productCode)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé"));

        if (quantity > product.getStock()) {
            throw new RuntimeException("Stock insuffisant");
        }

        // Vérifier si le produit est déjà dans le panier
        OrderLine.OrderLineId lineId = new OrderLine.OrderLineId();
        lineId.setProductCode(productCode);
        lineId.setCommandNumber(cart.getCommandNumber());

        Optional<OrderLine> existingLine = orderLineRepository.findById(lineId);

        if (existingLine.isPresent()) {
            // Mettre à jour la quantité
            OrderLine line = existingLine.get();
            int newQuantity = line.getQuantity() + quantity;
            if (newQuantity > product.getStock()) {
                throw new RuntimeException("Stock insuffisant");
            }
            line.setQuantity(newQuantity);
            orderLineRepository.save(line);
        } else {
            // Créer une nouvelle ligne
            OrderLine line = new OrderLine();
            line.setId(lineId);
            line.setProduct(product);
            line.setOrder(cart);
            line.setQuantity(quantity);
            line.setUnitPrice(product.getPrice());
            orderLineRepository.save(line);
        }

        return getCart(email);
    }

    /**
     * Met à jour la quantité d'un produit dans le panier
     */
    public CartResponseDTO updateItemQuantity(String email, String productCode, int quantity) {
        Order cart = orderRepository.findByClient_EmailAndStatus(email, OrderStatus.PENDING)
                .orElseThrow(() -> new RuntimeException("Panier non trouvé"));

        OrderLine.OrderLineId lineId = new OrderLine.OrderLineId();
        lineId.setProductCode(productCode);
        lineId.setCommandNumber(cart.getCommandNumber());

        OrderLine line = orderLineRepository.findById(lineId)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé dans le panier"));

        if (quantity <= 0) {
            orderLineRepository.delete(line);
        } else {
            Product product = line.getProduct();
            if (quantity > product.getStock()) {
                throw new RuntimeException("Stock insuffisant");
            }
            line.setQuantity(quantity);
            orderLineRepository.save(line);
        }

        return getCart(email);
    }

    /**
     * Supprime un produit du panier
     */
    public CartResponseDTO removeItemFromCart(String email, String productCode) {
        return updateItemQuantity(email, productCode, 0);
    }

    /**
     * Vide le panier
     */
    public void clearCart(String email) {
        Optional<Order> cart = orderRepository.findByClient_EmailAndStatus(email, OrderStatus.PENDING);

        if (cart.isPresent()) {
            List<OrderLine> lines = orderLineRepository.findById_CommandNumber(cart.get().getCommandNumber());
            orderLineRepository.deleteAll(lines);
            orderRepository.delete(cart.get());
        }
    }

    /**
     * Valide la commande (checkout)
     */
    public CartResponseDTO checkout(String email) {
        Order cart = orderRepository.findByClient_EmailAndStatus(email, OrderStatus.PENDING)
                .orElseThrow(() -> new RuntimeException("Panier non trouvé"));

        List<OrderLine> lines = orderLineRepository.findById_CommandNumber(cart.getCommandNumber());

        if (lines.isEmpty()) {
            throw new RuntimeException("Le panier est vide");
        }

        // Valider le stock pour tous les produits
        for (OrderLine line : lines) {
            Product product = productRepository.findById(line.getProduct().getProductCode())
                    .orElseThrow(() -> new RuntimeException("Produit non trouvé"));
            if (line.getQuantity() > product.getStock()) {
                throw new RuntimeException("Stock insuffisant pour: " + product.getName());
            }
        }

        // Déduire le stock
        for (OrderLine line : lines) {
            Product product = line.getProduct();
            product.setStock(product.getStock() - line.getQuantity());
            productRepository.save(product);
        }

        // Marquer la commande comme complétée
        cart.setStatus(OrderStatus.COMPLETED);
        cart.setOrderDate(LocalDate.now());
        orderRepository.save(cart);

        return buildCartResponse(cart);
    }

    /**
     * Construit le DTO de réponse du panier
     */
    private CartResponseDTO buildCartResponse(Order cart) {
        List<OrderLine> orderLines = orderLineRepository.findById_CommandNumber(cart.getCommandNumber());

        CartResponseDTO response = new CartResponseDTO();
        response.setCommandNumber(cart.getCommandNumber());
        response.setEmail(cart.getEmail());
        response.setOrderDate(cart.getOrderDate());
        response.setStatus(cart.getStatus());

        List<CartItemDTO> items = orderLines.stream()
                .map(line -> {
                    CartItemDTO item = new CartItemDTO();
                    item.setProductCode(line.getProduct().getProductCode());
                    item.setProductName(line.getProduct().getName());
                    item.setBrand(line.getProduct().getBrand());
                    item.setUnitPrice(line.getUnitPrice());
                    item.setQuantity(line.getQuantity());
                    item.setStock(line.getProduct().getStock());
                    item.setImageUrl(line.getProduct().getImageUrl());
                    item.setConcentrationType(line.getProduct().getConcentrationType());
                    item.setSize(line.getProduct().getSize());
                    item.setGender(line.getProduct().getGender());
                    return item;
                })
                .toList();

        response.setItems(items);
        response.setTotalItems(items.stream().mapToInt(CartItemDTO::getQuantity).sum());
        response.setTotalPrice(orderLines.stream()
                .map(l -> l.getUnitPrice().multiply(BigDecimal.valueOf(l.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add));

        return response;
    }
}
