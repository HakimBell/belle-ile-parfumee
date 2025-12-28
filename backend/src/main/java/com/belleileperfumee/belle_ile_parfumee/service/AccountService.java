package com.belleileperfumee.belle_ile_parfumee.service;

import com.belleileperfumee.belle_ile_parfumee.dto.account.RegisterRequestDTO;
import com.belleileperfumee.belle_ile_parfumee.entity.Account;
import com.belleileperfumee.belle_ile_parfumee.entity.Client;
import com.belleileperfumee.belle_ile_parfumee.repository.AccountRepository;
import com.belleileperfumee.belle_ile_parfumee.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Créer un nouveau compte (simple)
    public Account createAccount(Account account) {
        if (emailExists(account.getEmail())) {
            return null;
        }

        String hashedPassword = passwordEncoder.encode(account.getPassword());
        account.setPassword(hashedPassword);

        return accountRepository.save(account);
    }

    // Inscription complète : Account + Client
    @Transactional
    public Account register(RegisterRequestDTO request) {
        if (emailExists(request.getEmail())) {
            return null;
        }

        // Créer le compte
        Account account = new Account();
        account.setEmail(request.getEmail());
        account.setPassword(passwordEncoder.encode(request.getPassword()));
        account.setRole("CLIENT");

        Account savedAccount = accountRepository.save(account);

        // Créer le client associé
        Client client = new Client();
        client.setEmail(request.getEmail());
        client.setFirstName(request.getFirstName());
        client.setLastName(request.getLastName());
        client.setPhoneNumber(request.getPhoneNumber());
        client.setAccount(savedAccount);

        clientRepository.save(client);

        return savedAccount;
    }

    // Vérifier les identifiants lors du login
    public Account login(String email, String password) {
        Optional<Account> accountOpt = accountRepository.findByEmail(email);

        if (accountOpt.isPresent()) {
            Account account = accountOpt.get();

            // ✅ VÉRIFIER le mot de passe avec BCrypt
            if (passwordEncoder.matches(password, account.getPassword())) {
                return account; // Login réussi
            }
        }

        return null; // Email ou mot de passe incorrect
    }

    // Vérifier si un email existe
    public boolean emailExists(String email) {
        return accountRepository.existsByEmail(email);
    }

    // Récupérer un compte par email
    public Optional<Account> getAccountByEmail(String email) {
        return accountRepository.findByEmail(email);
    }
}