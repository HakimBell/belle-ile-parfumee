package com.belleileperfumee.belle_ile_parfumee.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = null;
        String email = null;

        // 1. Essayer de récupérer le token depuis le cookie httpOnly
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("authToken".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        // 2. Fallback: vérifier le header Authorization (pour compatibilité)
        if (token == null) {
            String authHeader = request.getHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }
        }

        // 3. Extraire l'email du token
        if (token != null) {
            try {
                email = jwtUtil.extractEmail(token);
            } catch (Exception e) {
                // Token invalide, on continue sans authentification
            }
        }

        // 4. Si on a un email ET qu'aucune authentification n'est déjà en place
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // 5. Vérifier si le token est valide
            if (jwtUtil.validateToken(token, email)) {

                // 6. Créer l'authentification pour Spring Security
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(email, null, new ArrayList<>());

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // 7. Dire à Spring Security que l'utilisateur est authentifié
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // 8. Continuer la chaîne de filtres
        filterChain.doFilter(request, response);
    }
}