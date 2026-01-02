package com.belleileperfumee.belle_ile_parfumee.service;

import com.belleileperfumee.belle_ile_parfumee.entity.Account;
import com.belleileperfumee.belle_ile_parfumee.entity.Client;
import com.belleileperfumee.belle_ile_parfumee.entity.Order;
import com.belleileperfumee.belle_ile_parfumee.repository.AccountRepository;
import com.belleileperfumee.belle_ile_parfumee.repository.ClientRepository;
import com.belleileperfumee.belle_ile_parfumee.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private OrderRepository orderRepository;

    // Créer un nouveau client
    public Client createClient(Client client) {
        // Vérifier si l'email existe déjà
        if (clientRepository.existsById(client.getEmail())) {
            return null; // Email déjà utilisé
        }

        // ✅ RÉCUPÉRER L'ACCOUNT DEPUIS LA BASE DE DONNÉES
        Optional<Account> accountOpt = accountRepository.findById(client.getEmail());
        if (accountOpt.isEmpty()) {
            return null; // Account n'existe pas
        }

        // ✅ ASSOCIER L'ACCOUNT AU CLIENT
        client.setAccount(accountOpt.get());

        return clientRepository.save(client);
    }

    // Récupérer tous les clients
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    // Récupérer un client par email
    public Optional<Client> getClientByEmail(String email) {
        return clientRepository.findByEmail(email);
    }

    // Récupérer un client par numéro de téléphone
    public Optional<Client> getClientByPhoneNumber(String phoneNumber) {
        return clientRepository.findByPhoneNumber(phoneNumber);
    }

    // Modifier un client
    public Client updateClient(Client updatedClient) {
        if (clientRepository.existsById(updatedClient.getEmail())) {

            // ✅ RÉCUPÉRER L'ACCOUNT DEPUIS LA BASE DE DONNÉES
            Optional<Account> accountOpt = accountRepository.findById(updatedClient.getEmail());
            if (accountOpt.isEmpty()) {
                return null; // Account n'existe pas
            }

            // ✅ ASSOCIER L'ACCOUNT AU CLIENT
            updatedClient.setAccount(accountOpt.get());

            return clientRepository.save(updatedClient);
        }
        return null; // Client non trouvé
    }

    // Supprimer un client
    public void deleteClient(String email) {
        if (!clientRepository.existsById(email)) {
            throw new RuntimeException("Client non trouvé");
        }

        // Vérifier si le client a des commandes
        List<Order> orders = orderRepository.findByClient_Email(email);
        if (!orders.isEmpty()) {
            throw new RuntimeException("Impossible de supprimer ce client car il a " + orders.size() + " commande(s) associée(s)");
        }

        clientRepository.deleteById(email);
    }
}