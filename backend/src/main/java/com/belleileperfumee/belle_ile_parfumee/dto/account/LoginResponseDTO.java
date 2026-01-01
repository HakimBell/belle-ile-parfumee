package com.belleileperfumee.belle_ile_parfumee.dto.account;

import lombok.Data;

@Data
public class LoginResponseDTO {
    private String email;
    private String role;
    // Le token est maintenant dans un cookie httpOnly (pas dans la réponse JSON)
}