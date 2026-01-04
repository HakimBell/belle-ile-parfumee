-- ============================================
-- Belle Île Parfumée - Data Manipulation Language (DML)
-- Données de démonstration
-- ============================================

-- ============================================
-- Comptes utilisateurs
-- Mot de passe: "password123" hashé avec BCrypt
-- ============================================
INSERT INTO account (email, password, role) VALUES
('admin@belleileperfumee.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.QGv3hnAGXP1b5EQrKO', 'ADMIN'),
('marie.dupont@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.QGv3hnAGXP1b5EQrKO', 'CLIENT'),
('jean.martin@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.QGv3hnAGXP1b5EQrKO', 'CLIENT'),
('sophie.bernard@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.QGv3hnAGXP1b5EQrKO', 'CLIENT'),
('pierre.durand@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.QGv3hnAGXP1b5EQrKO', 'CLIENT');

-- ============================================
-- Clients
-- ============================================
INSERT INTO clients (email, last_name, first_name, phone_number, email_1) VALUES
('marie.dupont@email.com', 'Dupont', 'Marie', '0612345678', 'marie.dupont@email.com'),
('jean.martin@email.com', 'Martin', 'Jean', '0623456789', 'jean.martin@email.com'),
('sophie.bernard@email.com', 'Bernard', 'Sophie', '0634567890', 'sophie.bernard@email.com'),
('pierre.durand@email.com', 'Durand', 'Pierre', NULL, 'pierre.durand@email.com');

-- ============================================
-- Produits - Parfums Femmes
-- ============================================
INSERT INTO products (product_code, name, brand, price, stock, description, image_url, created_at, concentration_type, gender, size) VALUES
('CHA-EDP-100-0001', 'N°5', 'Chanel', 152.00, 25, 'Le parfum iconique de Chanel, un bouquet floral aldéhydé intemporel. Notes de tête: aldéhydes, néroli, ylang-ylang. Notes de coeur: rose, jasmin, muguet. Notes de fond: santal, vétiver, vanille.', 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400', '2024-01-15', 'Eau de Parfum', 'Femme', 100),
('CHA-EDP-050-0002', 'N°5', 'Chanel', 102.00, 30, 'Le parfum iconique de Chanel en format 50ml.', 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400', '2024-01-15', 'Eau de Parfum', 'Femme', 50),
('DIO-EDP-100-0001', 'J''adore', 'Dior', 148.00, 20, 'Un bouquet floral moderne et glamour. Notes de tête: poire, melon, magnolia. Notes de coeur: rose, jasmin, muguet. Notes de fond: mûre, bois de santal, muscs.', 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400', '2024-01-20', 'Eau de Parfum', 'Femme', 100),
('DIO-EDT-050-0002', 'Miss Dior', 'Dior', 89.00, 35, 'Une fragrance fraîche et florale pour les femmes modernes. Notes de rose, pivoine et musc.', 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400', '2024-02-01', 'Eau de Toilette', 'Femme', 50),
('YSL-EDP-090-0001', 'Libre', 'Yves Saint Laurent', 135.00, 18, 'Un parfum floral lavande addictif. Notes de lavande, fleur d''oranger et vanille de Madagascar.', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400', '2024-02-10', 'Eau de Parfum', 'Femme', 90),
('LAN-EDP-075-0001', 'La Vie Est Belle', 'Lancôme', 119.00, 40, 'Un iris gourmand, signature olfactive du bonheur. Notes d''iris, patchouli et praline.', 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400', '2024-02-15', 'Eau de Parfum', 'Femme', 75),
('GUE-EDP-100-0001', 'Shalimar', 'Guerlain', 142.00, 15, 'L''oriental légendaire de Guerlain. Notes de bergamote, iris, vanille et opoponax.', 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400', '2024-03-01', 'Eau de Parfum', 'Femme', 100);

-- ============================================
-- Produits - Parfums Hommes
-- ============================================
INSERT INTO products (product_code, name, brand, price, stock, description, image_url, created_at, concentration_type, gender, size) VALUES
('DIO-EDT-100-0003', 'Sauvage', 'Dior', 125.00, 45, 'Un parfum frais et sauvage, radieux et noble. Notes de bergamote de Calabre, poivre de Sichuan et ambroxan.', 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400', '2024-01-10', 'Eau de Toilette', 'Homme', 100),
('DIO-EDP-060-0004', 'Sauvage', 'Dior', 105.00, 50, 'Version Eau de Parfum de Sauvage, plus intense et profonde.', 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400', '2024-01-10', 'Eau de Parfum', 'Homme', 60),
('CHA-EDT-100-0003', 'Bleu de Chanel', 'Chanel', 138.00, 30, 'Un parfum boisé aromatique, libre et déterminé. Notes de citron, menthe, bois de cèdre et santal.', 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400', '2024-01-25', 'Eau de Toilette', 'Homme', 100),
('CHA-EDP-100-0004', 'Bleu de Chanel', 'Chanel', 158.00, 22, 'Version Eau de Parfum, plus intense avec des notes de bois de santal.', 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400', '2024-01-25', 'Eau de Parfum', 'Homme', 100),
('JPG-EDT-125-0001', 'Le Male', 'Jean Paul Gaultier', 98.00, 55, 'Un oriental frais iconique. Notes de lavande, menthe, vanille et bois de santal.', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400', '2024-02-05', 'Eau de Toilette', 'Homme', 125),
('ARM-EDT-100-0001', 'Acqua di Gio', 'Giorgio Armani', 112.00, 38, 'Un parfum aquatique frais et masculin. Notes de citron, bergamote, jasmin et bois de cèdre.', 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400', '2024-02-20', 'Eau de Toilette', 'Homme', 100),
('VER-EDT-100-0001', 'Eros', 'Versace', 95.00, 42, 'Un parfum oriental frais et puissant. Notes de menthe, pomme verte, vanille et bois de cèdre.', 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400', '2024-03-05', 'Eau de Toilette', 'Homme', 100);

-- ============================================
-- Produits - Parfums Mixtes
-- ============================================
INSERT INTO products (product_code, name, brand, price, stock, description, image_url, created_at, concentration_type, gender, size) VALUES
('TFO-EDP-050-0001', 'Oud Wood', 'Tom Ford', 285.00, 12, 'Un oud rare et exotique. Notes de bois de oud, palissandre, cardamome et poivre de Sichuan.', 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400', '2024-01-05', 'Eau de Parfum', 'Mixte', 50),
('TFO-EDP-100-0002', 'Black Orchid', 'Tom Ford', 195.00, 16, 'Un parfum luxueux et sensuel. Notes d''orchidée noire, truffe, ylang-ylang et patchouli.', 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400', '2024-01-08', 'Eau de Parfum', 'Mixte', 100),
('MAI-EDP-070-0001', 'Replica Jazz Club', 'Maison Margiela', 125.00, 20, 'L''ambiance d''un club de jazz à Brooklyn. Notes de rhum, tabac, vétiver et fève tonka.', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400', '2024-02-12', 'Eau de Parfum', 'Mixte', 70),
('BYR-EDP-100-0001', 'Gypsy Water', 'Byredo', 198.00, 10, 'Un parfum bohème et libre. Notes de bergamote, citron, pin, encens et vanille.', 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400', '2024-02-28', 'Eau de Parfum', 'Mixte', 100),
('LLP-EXT-100-0001', 'Santal 33', 'Le Labo', 310.00, 8, 'Un santal culte et addictif. Notes de cuir, santal, cèdre de Virginie et papyrus.', 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400', '2024-03-10', 'Extrait', 'Mixte', 100);

-- ============================================
-- Commandes de démonstration
-- ============================================
INSERT INTO orders (command_number, email, order_date, status, email_1) VALUES
('CMD-2024-0001', 'marie.dupont@email.com', '2024-03-15', 'COMPLETED', 'marie.dupont@email.com'),
('CMD-2024-0002', 'jean.martin@email.com', '2024-03-18', 'COMPLETED', 'jean.martin@email.com'),
('CMD-2024-0003', 'sophie.bernard@email.com', '2024-03-20', 'PENDING', 'sophie.bernard@email.com'),
('CMD-2024-0004', 'marie.dupont@email.com', '2024-03-22', 'PENDING', 'marie.dupont@email.com');

-- ============================================
-- Lignes de commande
-- ============================================
-- Commande 1: Marie - Chanel N°5 + Dior J'adore
INSERT INTO order_lines (product_code, command_number, quantity, unit_price) VALUES
('CHA-EDP-100-0001', 'CMD-2024-0001', 1, 152.00),
('DIO-EDP-100-0001', 'CMD-2024-0001', 1, 148.00);

-- Commande 2: Jean - Sauvage + Bleu de Chanel
INSERT INTO order_lines (product_code, command_number, quantity, unit_price) VALUES
('DIO-EDT-100-0003', 'CMD-2024-0002', 2, 125.00),
('CHA-EDT-100-0003', 'CMD-2024-0002', 1, 138.00);

-- Commande 3: Sophie - Tom Ford Oud Wood
INSERT INTO order_lines (product_code, command_number, quantity, unit_price) VALUES
('TFO-EDP-050-0001', 'CMD-2024-0003', 1, 285.00);

-- Commande 4: Marie - Panier en cours
INSERT INTO order_lines (product_code, command_number, quantity, unit_price) VALUES
('YSL-EDP-090-0001', 'CMD-2024-0004', 1, 135.00),
('LAN-EDP-075-0001', 'CMD-2024-0004', 2, 119.00);