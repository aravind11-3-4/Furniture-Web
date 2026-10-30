package com.furniture.controller;

import com.furniture.model.*;
import com.furniture.repository.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@AuthenticationPrincipal UserDetails ud,
                                      @RequestBody CheckoutRequest req) {
        User user = userRepository.findByEmail(ud.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));

        // Build order
        Order order = Order.builder()
            .user(user)
            .totalAmount(req.getTotalAmount())
            .status(Order.OrderStatus.PAID)
            .build();

        List<OrderItem> orderItems = new ArrayList<>();
        for (CheckoutRequest.ItemDto dto : req.getItems()) {
            Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found: " + dto.getProductId()));
            orderItems.add(OrderItem.builder()
                .order(order)
                .product(product)
                .quantity(dto.getQuantity())
                .unitPrice(product.getPrice())
                .build());
        }
        order.setItems(orderItems);
        orderRepository.save(order);

        // Clear the user's server-side cart
        cartRepository.deleteAllByUser(user);

        return ResponseEntity.ok(Map.of(
            "message", "Payment successful",
            "orderId", order.getId(),
            "status",  order.getStatus()
        ));
    }

    @GetMapping("/orders")
    public List<Order> getMyOrders(@AuthenticationPrincipal UserDetails ud) {
        User user = userRepository.findByEmail(ud.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUserOrderByCreatedAtDesc(user);
    }

    @Data
    static class CheckoutRequest {
        private List<ItemDto> items;
        private Double totalAmount;

        @Data
        static class ItemDto {
            private Long productId;
            private Integer quantity;
        }
    }
}
