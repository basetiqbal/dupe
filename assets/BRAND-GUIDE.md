# The Dupe Edit — Brand Assets

## Logo Suite

A refined, editorial-style logo system designed for digital-first use.

### Files

| File | Purpose | Use Case |
|------|---------|----------|
| `logo.svg` | Primary wordmark | Main branding |
| `logo-stacked.svg` | Centered stack | Social headers, about pages |
| `logo-horizontal.svg` | Compact inline | Website header, nav |
| `logo-monogram.svg` | TDE monogram | Favicon, app icon, watermarks |
| `logo-mark.svg` | Editorial "D" mark | Magazine-style, minimal |
| `logo-full.svg` | Full lockup + tagline | Marketing, landing pages |

---

## Typography

### Logo Fonts
- **Primary:** Playfair Display (500 weight)
- **Fallback:** Times New Roman, Georgia, serif

### Hierarchy
```
THE          — 9-11px, uppercase, 0.35em letter-spacing
Dupe Edit    — 22-36px, 500 weight, tight tracking
```

---

## Color Palette

### Primary
| Color | Hex | Use |
|-------|-----|-----|
| Black | `#1a1816` | Primary text, logo |
| Off-White | `#faf9f7` | Light backgrounds |
| Taupe | `#8b7355` | Warm accent, hover states |

### Neutral
| Color | Hex | Use |
|-------|-----|-----|
| Warm Gray | `#4a4541` | Secondary text |
| Light Gray | `#e8e4df` | Borders, dividers |
| Cream | `#f5f0e8` | Subtle backgrounds |

### Dark Mode
| Color | Hex | Use |
|-------|-----|-----|
| Deep Charcoal | `#0f0f0e` | Dark background |
| Off-Black | `#1a1918` | Dark surface |
| Light Taupe | `#c4b5a3` | Dark mode text |

---

## Usage Guidelines

### ✓ Do
- Use on clean, uncluttered backgrounds
- Maintain adequate whitespace around logo
- Use the monogram for small sizes (< 40px)
- Apply warm taupe for hover/interactive states

### ✗ Don't
- Stretch or distort proportions
- Add drop shadows or effects
- Place on busy backgrounds
- Use below minimum sizes

### Minimum Sizes
- Wordmark: 120px width
- Monogram: 24px width
- Mark: 20px width

---

## Implementation

### HTML (Current Site)
```html
<a href="/" class="logo" aria-label="The Dupe Edit">
  <span class="logo-the">THE</span>
  <span class="logo-main">Dupe Edit</span>
</a>
```

### CSS Variables
```css
--font-logo: 'Playfair Display', Georgia, serif;
--color-logo: #1a1816;
--color-logo-hover: #8b7355;
```

### SVG Inline (favicons, social)
The SVG files use `currentColor` for fills, making them automatically adapt to light/dark modes when embedded.

---

## Brand Voice References

- **Vogue** — Editorial authority
- **The Cut** — Smart, accessible luxury
- **Glossier** — Modern minimalism
- **Into The Gloss** — Curated taste

---

## Quick Copy

**Tagline:** Where good taste meets great value.  
**Alt Tagline:** Luxury finds, curated.  
**Mission:** Discover affordable alternatives to your luxury beauty obsessions.
