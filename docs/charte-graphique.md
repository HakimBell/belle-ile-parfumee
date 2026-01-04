# Charte Graphique - Belle Île Parfumée

## 1. Identité visuelle

### Nom de la marque
**Belle Île Parfumée** - Une boutique en ligne de parfums de luxe inspirée par l'élégance française.

### Positionnement
- Luxe accessible
- Élégance minimaliste
- Expérience utilisateur premium

---

## 2. Palette de couleurs

### Couleurs principales

| Nom | Code HEX | Utilisation |
|-----|----------|-------------|
| Noir principal | `#0A0A0A` | Textes, boutons principaux |
| Blanc | `#FFFFFF` | Fond de page |
| Gris clair | `#F5F5F5` | Fonds secondaires |
| Gris moyen | `#6B6B6B` | Textes secondaires |
| Gris bordure | `#E0E0E0` | Bordures, séparateurs |
| Badge | `#1A1A1A` | Badges, accents |

### Couleurs sémantiques

| État | Code HEX | Utilisation |
|------|----------|-------------|
| Erreur | `#DC2626` | Messages d'erreur |
| Erreur fond | `#FEF2F2` | Fond des alertes erreur |
| Succès | `#16A34A` | Confirmations |
| En stock | `#16A34A` | Indicateur stock |
| Rupture | `#DC2626` | Indicateur rupture |

---

## 3. Typographie

### Police principale
**Inter** - Police sans-serif moderne et lisible

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Hiérarchie typographique

| Élément | Taille | Poids | Utilisation |
|---------|--------|-------|-------------|
| H1 | 32px | 700 (Bold) | Titres de page |
| H2 | 24px | 600 (Semi-bold) | Sous-titres |
| H3 | 18px | 600 | Titres de section |
| Body | 16px | 400 (Regular) | Texte courant |
| Small | 14px | 400 | Labels, légendes |
| Caption | 12px | 400 | Notes, erreurs |

### Interligne
`line-height: 1.6` pour une lecture confortable

---

## 4. Espacements

### Système de spacing (multiples de 4px)

| Nom | Valeur | Utilisation |
|-----|--------|-------------|
| xs | 4px | Micro-espacements |
| sm | 8px | Espaces internes |
| md | 16px | Marges standard |
| lg | 24px | Sections |
| xl | 32px | Grandes sections |
| 2xl | 48px | Header/Footer |

---

## 5. Composants UI

### Boutons

#### Bouton principal (Primary)
```css
background: #0A0A0A;
color: #FFFFFF;
padding: 12px 24px;
border-radius: 6px;
font-weight: 500;
```

#### Bouton secondaire (Outline)
```css
background: transparent;
border: 1px solid #0A0A0A;
color: #0A0A0A;
padding: 12px 24px;
border-radius: 6px;
```

### Champs de formulaire
```css
padding: 12px 16px;
border: 1px solid #E0E0E0;
border-radius: 6px;
font-size: 14px;
```

### Cartes produit
```css
background: #FFFFFF;
border: 1px solid #E0E0E0;
border-radius: 12px;
box-shadow: 0 2px 8px rgba(0,0,0,0.04);
```

---

## 6. Iconographie

### Style
- Icons ligne fine (stroke-width: 1.5-2px)
- Style minimaliste
- Couleur: adapté au contexte (#0A0A0A ou #6B6B6B)

### Icons utilisées
- 🔍 Recherche
- 🛒 Panier
- 👤 Compte utilisateur
- ♡ Favoris
- ✓ Validation
- ⚠ Alerte

---

## 7. Images

### Photos produits
- Format carré ou 3:4
- Fond neutre (blanc ou gris clair)
- Haute qualité (min 400x400px)
- Style épuré, focus sur le flacon

### Placeholder
```css
background: #F5F5F5;
display: flex;
align-items: center;
justify-content: center;
color: #6B6B6B;
```

---

## 8. Responsive Design

### Breakpoints

| Nom | Largeur | Colonnes grille |
|-----|---------|-----------------|
| Mobile | < 768px | 1-2 colonnes |
| Tablet | 768px - 1024px | 2-3 colonnes |
| Desktop | > 1024px | 3-4 colonnes |

### Container
```css
max-width: 1200px;
margin: 0 auto;
padding: 0 20px;
```

---

## 9. Animations

### Transitions standard
```css
transition: all 0.3s ease;
```

### Hover sur boutons
- Légère opacité (0.9) ou changement de couleur subtil
- Pas d'animations excessives (cohérence luxe)

---

## 10. Accessibilité

- Contraste minimum WCAG AA (4.5:1)
- Focus visible sur éléments interactifs
- Labels explicites sur formulaires
- Taille minimum des zones cliquables: 44x44px