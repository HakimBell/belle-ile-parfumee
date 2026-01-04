-- ============================================
-- Belle Île Parfumée - Data Definition Language (DDL)
-- Base de données PostgreSQL
-- ============================================

-- Suppression des tables existantes (ordre inverse des dépendances)
DROP TABLE IF EXISTS order_lines CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS account CASCADE;

-- ============================================
-- Table: account
-- Description: Comptes utilisateurs (authentification)
-- ============================================
CREATE TABLE account (
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

COMMENT ON TABLE account IS 'Comptes utilisateurs pour l''authentification';
COMMENT ON COLUMN account.email IS 'Email servant d''identifiant unique';
COMMENT ON COLUMN account.password IS 'Mot de passe hashé (BCrypt)';
COMMENT ON COLUMN account.role IS 'Rôle utilisateur (CLIENT ou ADMIN)';

-- ============================================
-- Table: clients
-- Description: Informations des clients
-- ============================================
CREATE TABLE clients (
    email VARCHAR(255) PRIMARY KEY,
    last_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20),
    email_1 VARCHAR(255) NOT NULL UNIQUE,

    CONSTRAINT fk_clients_account
        FOREIGN KEY (email_1) REFERENCES account(email)
        ON DELETE CASCADE
);

COMMENT ON TABLE clients IS 'Informations personnelles des clients';
COMMENT ON COLUMN clients.email IS 'Email du client (clé primaire)';
COMMENT ON COLUMN clients.last_name IS 'Nom de famille';
COMMENT ON COLUMN clients.first_name IS 'Prénom';
COMMENT ON COLUMN clients.phone_number IS 'Numéro de téléphone (optionnel)';
COMMENT ON COLUMN clients.email_1 IS 'Référence vers le compte utilisateur';

-- ============================================
-- Table: products
-- Description: Catalogue des parfums
-- ============================================
CREATE TABLE products (
    product_code VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INTEGER NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    created_at DATE NOT NULL,
    concentration_type VARCHAR(20) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    size INTEGER NOT NULL,

    CONSTRAINT chk_price_positive CHECK (price >= 0),
    CONSTRAINT chk_stock_positive CHECK (stock >= 0),
    CONSTRAINT chk_size_positive CHECK (size > 0),
    CONSTRAINT chk_gender CHECK (gender IN ('Homme', 'Femme', 'Mixte')),
    CONSTRAINT chk_concentration CHECK (concentration_type IN ('Eau de Parfum', 'Eau de Toilette', 'Extrait', 'Eau de Cologne'))
);

COMMENT ON TABLE products IS 'Catalogue des parfums disponibles';
COMMENT ON COLUMN products.product_code IS 'Code unique du produit';
COMMENT ON COLUMN products.name IS 'Nom du parfum';
COMMENT ON COLUMN products.brand IS 'Marque du parfum';
COMMENT ON COLUMN products.price IS 'Prix en euros';
COMMENT ON COLUMN products.stock IS 'Quantité en stock';
COMMENT ON COLUMN products.description IS 'Description du parfum';
COMMENT ON COLUMN products.image_url IS 'URL de l''image du produit';
COMMENT ON COLUMN products.created_at IS 'Date d''ajout au catalogue';
COMMENT ON COLUMN products.concentration_type IS 'Type de concentration (Eau de Parfum, Eau de Toilette, etc.)';
COMMENT ON COLUMN products.gender IS 'Genre cible (Homme, Femme, Mixte)';
COMMENT ON COLUMN products.size IS 'Contenance en millilitres';

-- ============================================
-- Table: orders
-- Description: Commandes des clients
-- ============================================
CREATE TABLE orders (
    command_number VARCHAR(50) PRIMARY KEY,
    email VARCHAR(255),
    order_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    email_1 VARCHAR(255) NOT NULL,

    CONSTRAINT fk_orders_client
        FOREIGN KEY (email_1) REFERENCES clients(email)
        ON DELETE RESTRICT,
    CONSTRAINT chk_status CHECK (status IN ('PENDING', 'COMPLETED', 'CANCELLED'))
);

COMMENT ON TABLE orders IS 'Commandes passées par les clients';
COMMENT ON COLUMN orders.command_number IS 'Numéro unique de commande';
COMMENT ON COLUMN orders.email IS 'Email associé à la commande';
COMMENT ON COLUMN orders.order_date IS 'Date de la commande';
COMMENT ON COLUMN orders.status IS 'Statut de la commande (PENDING, COMPLETED, CANCELLED)';
COMMENT ON COLUMN orders.email_1 IS 'Référence vers le client';

-- ============================================
-- Table: order_lines
-- Description: Lignes de commande (produits commandés)
-- ============================================
CREATE TABLE order_lines (
    product_code VARCHAR(50) NOT NULL,
    command_number VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (product_code, command_number),

    CONSTRAINT fk_orderlines_product
        FOREIGN KEY (product_code) REFERENCES products(product_code)
        ON DELETE RESTRICT,
    CONSTRAINT fk_orderlines_order
        FOREIGN KEY (command_number) REFERENCES orders(command_number)
        ON DELETE CASCADE,
    CONSTRAINT chk_quantity_positive CHECK (quantity > 0),
    CONSTRAINT chk_unitprice_positive CHECK (unit_price >= 0)
);

COMMENT ON TABLE order_lines IS 'Détail des produits dans chaque commande';
COMMENT ON COLUMN order_lines.product_code IS 'Référence vers le produit';
COMMENT ON COLUMN order_lines.command_number IS 'Référence vers la commande';
COMMENT ON COLUMN order_lines.quantity IS 'Quantité commandée';
COMMENT ON COLUMN order_lines.unit_price IS 'Prix unitaire au moment de la commande';

-- ============================================
-- Index pour optimisation des requêtes
-- ============================================
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_gender ON products(gender);
CREATE INDEX idx_products_created_at ON products(created_at DESC);
CREATE INDEX idx_orders_client ON orders(email_1);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_date ON orders(order_date DESC);