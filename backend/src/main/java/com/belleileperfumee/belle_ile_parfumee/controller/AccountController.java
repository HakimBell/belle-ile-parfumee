package com.belleileperfumee.belle_ile_parfumee.controller;

import com.belleileperfumee.belle_ile_parfumee.config.JwtUtil;
import com.belleileperfumee.belle_ile_parfumee.dto.account.AccountRequestDTO;
import com.belleileperfumee.belle_ile_parfumee.dto.account.AccountResponseDTO;
import com.belleileperfumee.belle_ile_parfumee.dto.account.LoginResponseDTO;
import com.belleileperfumee.belle_ile_parfumee.dto.account.RegisterRequestDTO;
import com.belleileperfumee.belle_ile_parfumee.entity.Account;
import com.belleileperfumee.belle_ile_parfumee.mapper.AccountMapper;
import com.belleileperfumee.belle_ile_parfumee.service.AccountService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

import java.util.Optional;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private JwtUtil jwtUtil; // ✅ AJOUTER JwtUtil

    // Helper pour créer le cookie JWT
    private ResponseCookie createAuthCookie(String token) {
        return ResponseCookie.from("authToken", token)
                .httpOnly(true)
                .secure(false) // Mettre true en production (HTTPS)
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofHours(24))
                .build();
    }

    // Inscription complète (Account + Client)
    @PostMapping("/register")
    public ResponseEntity<LoginResponseDTO> register(@Valid @RequestBody RegisterRequestDTO requestDTO, HttpServletResponse response) {
        Account createdAccount = accountService.register(requestDTO);

        if (createdAccount == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        // Générer le token JWT
        String token = jwtUtil.generateToken(createdAccount.getEmail(), createdAccount.getRole());

        // Ajouter le cookie httpOnly
        response.addHeader(HttpHeaders.SET_COOKIE, createAuthCookie(token).toString());

        // Créer la réponse (sans le token dans le body)
        LoginResponseDTO responseDTO = new LoginResponseDTO();
        responseDTO.setEmail(createdAccount.getEmail());
        responseDTO.setRole(createdAccount.getRole());

        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    // Login - Token dans cookie httpOnly
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody AccountRequestDTO requestDTO, HttpServletResponse response) {
        Account account = accountService.login(requestDTO.getEmail(), requestDTO.getPassword());

        if (account == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // Générer le token JWT
        String token = jwtUtil.generateToken(account.getEmail(), account.getRole());

        // Ajouter le cookie httpOnly
        response.addHeader(HttpHeaders.SET_COOKIE, createAuthCookie(token).toString());

        // Créer la réponse (sans le token dans le body)
        LoginResponseDTO responseDTO = new LoginResponseDTO();
        responseDTO.setEmail(account.getEmail());
        responseDTO.setRole(account.getRole());

        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    // Logout - Supprimer le cookie
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("authToken", "")
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(0) // Expire immédiatement
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Endpoint pour vérifier l'authentification
    @GetMapping("/me")
    public ResponseEntity<LoginResponseDTO> getCurrentUser(jakarta.servlet.http.HttpServletRequest request) {
        String token = null;

        // Lire le token depuis le cookie
        if (request.getCookies() != null) {
            for (jakarta.servlet.http.Cookie cookie : request.getCookies()) {
                if ("authToken".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        if (token == null || !jwtUtil.validateToken(token, jwtUtil.extractEmail(token))) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String email = jwtUtil.extractEmail(token);
        Optional<Account> accountOpt = accountService.getAccountByEmail(email);

        if (accountOpt.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Account account = accountOpt.get();
        LoginResponseDTO responseDTO = new LoginResponseDTO();
        responseDTO.setEmail(account.getEmail());
        responseDTO.setRole(account.getRole());

        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    // Get Account by Email
    @GetMapping("/{email}")
    public ResponseEntity<AccountResponseDTO> getAccountByEmail(@PathVariable String email) {
        Optional<Account> account = accountService.getAccountByEmail(email);

        if (account.isPresent()) {
            AccountResponseDTO responseDTO = AccountMapper.toResponseDTO(account.get());
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Check if email exists
    @GetMapping("/exists/{email}")
    public ResponseEntity<Boolean> emailExists(@PathVariable String email) {
        return new ResponseEntity<>(accountService.emailExists(email), HttpStatus.OK);
    }
}