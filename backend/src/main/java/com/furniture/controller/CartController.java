package com.furniture.controller;

import com.furniture.model.CartItem;
import com.furniture.model.Product;
import com.furniture.model.User;
import com.furniture.repository.CartRepository;
import com.furniture.repository.ProductRepository;
import com.furniture.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    private User resolveUser(UserDetails ud) {
        return userRepository.findByEmail(ud.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping
    public List<CartItem> getCart(@AuthenticationPrincipal UserDetails ud) {
        return cartRepository.findByUser(resolveUser(ud));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@AuthenticationPrincipal UserDetails ud,
                                        @RequestBody CartRequest req) {
        User user = resolveUser(ud);
        Product product = productRepository.findById(req.getProductId())
            .orElseThrow(() -> new RuntimeException("Product not found"));

        var existing = cartRepository.findByUserAndProductId(user, req.getProductId());
        if (existing.isPresent()) {
            CartItem item = existing.get();
            item.setQuantity(item.getQuantity() + req.getQuantity());
            cartRepository.save(item);
        } else {
            cartRepository.save(CartItem.builder()
                .user(user).product(product).quantity(req.getQuantity()).build());
        }
        return ResponseEntity.ok(Map.of("message", "Added to cart"));
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> removeItem(@PathVariable Long itemId,
                                           @AuthenticationPrincipal UserDetails ud) {
        cartRepository.deleteById(itemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(@AuthenticationPrincipal UserDetails ud) {
        cartRepository.deleteAllByUser(resolveUser(ud));
        return ResponseEntity.noContent().build();
    }

    @Data
    static class CartRequest {
        private Long productId;
        private Integer quantity = 1;
    }
}
