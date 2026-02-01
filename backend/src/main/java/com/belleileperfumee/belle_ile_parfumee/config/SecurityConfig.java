package com.belleileperfumee.belle_ile_parfumee.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    // Bean pour hasher les mots de passe
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Configuration CORS pour les cookies
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "https://belle-ile-front.onrender.com")); // URLs du frontend
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true); // Autoriser les cookies
        configuration.setExposedHeaders(List.of("Set-Cookie"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // Configuration de la sécurité
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // Endpoints publics - Authentification
                        .requestMatchers("/api/accounts/register", "/api/accounts/login", "/api/accounts/logout", "/api/accounts/me").permitAll()
                        .requestMatchers("/api/accounts/exists/**").permitAll()

                        // Endpoints publics - Produits (lecture seule)
                        .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()

                        // Endpoints publics - Panier (nécessite auth mais géré par le service)
                        .requestMatchers("/api/orders/cart/**").permitAll()

                        // Endpoints admin - Produits (création, modification, suppression)
                        .requestMatchers(HttpMethod.POST, "/api/products/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/products/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/products/**").hasRole("ADMIN")

                        // Endpoints admin - Clients
                        .requestMatchers("/api/clients/**").hasRole("ADMIN")

                        // Endpoints admin - Commandes (sauf panier)
                        .requestMatchers(HttpMethod.GET, "/api/orders/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/orders/**").hasRole("ADMIN")

                        // Endpoints admin - Lignes de commande
                        .requestMatchers("/api/orderlines/**").hasRole("ADMIN")

                        // Tout le reste nécessite une authentification
                        .anyRequest().authenticated()
                )
                .httpBasic(httpBasic -> httpBasic.disable())
                .formLogin(formLogin -> formLogin.disable())
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                // Ajouter le filtre JWT avant le filtre d'authentification par défaut
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}