package com.furniture.controller;

import com.furniture.model.User;
import com.furniture.repository.UserRepository;
import com.furniture.security.JwtUtil;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // ── Login ──────────────────────────────────────────────────────────────
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        var user = userRepository.findByEmail(req.getEmail()).orElse(null);
        if (user == null || !passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Invalid credentials"));
        }

        if (req.getRole() != null && !req.getRole().isBlank()
                && !user.getRole().name().equalsIgnoreCase(req.getRole())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Invalid credentials for this role"));
        }

        return ResponseEntity.ok(authResponse(user));
    }

    // ── Register ───────────────────────────────────────────────────────────
    @PostMapping("/register")
    @Transactional
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already registered"));
        }

        User user = User.builder()
            .email(req.getEmail().trim())
            .name(req.getName().trim())
            .password(passwordEncoder.encode(req.getPassword()))
            .role(User.Role.USER)
            .build();

        user = userRepository.saveAndFlush(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(authResponse(user));
    }

    private Map<String, String> authResponse(User user) {
        var ud = org.springframework.security.core.userdetails.User
            .withUsername(user.getEmail())
            .password(user.getPassword())
            .roles(user.getRole().name())
            .build();
        String token = jwtUtil.generateToken(ud, user.getRole().name());
        return Map.of(
            "token", token,
            "role",  user.getRole().name(),
            "name",  user.getName()
        );
    }

    // ── DTOs ───────────────────────────────────────────────────────────────
    @Data
    static class LoginRequest {
        @Email @NotBlank private String email;
        @NotBlank private String password;
        private String role;
    }

    @Data
    static class RegisterRequest {
        @NotBlank private String name;
        @Email @NotBlank private String email;
        @NotBlank @Size(min = 6, message = "Password must be at least 6 characters")
        private String password;
    }
}
