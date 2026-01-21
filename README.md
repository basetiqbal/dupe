# The Dupe Edit

> Luxury alternatives, curated with care.

A minimalist web app that helps users find affordable dupes for luxury beauty and fragrance products. Built for GitHub Pages with a focus on editorial aesthetics, speed, and accessibility.

![The Dupe Edit](https://img.shields.io/badge/version-1.0.0-black) ![License](https://img.shields.io/badge/license-MIT-green) ![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-blue)

---

## ✨ Features

- **Single-page interface** — One search bar, instant results
- **Editorial design** — Feels like a beauty magazine, not a bargain site  
- **Dark mode** — Automatic system detection + manual toggle
- **Curated database** — Hand-selected dupes with honest assessments
- **Mobile-first** — Optimized for on-the-go searching
- **No backend required** — Pure static files for GitHub Pages
- **Automated deployment** — Push to main, automatically deploys

---

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/basetiqbal/dupe.git
cd dupe

# Serve locally (any static server works)
npx serve .
# or
python -m http.server 8000
# or just open index.html in your browser
```

### Deploy to GitHub Pages

Deployment is **automatic** via GitHub Actions. Just push to `main`:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

The site will be live at: `https://basetiqbal.github.io/dupe/`

---

## 📁 Project Structure

```
dupe/
├── index.html              # Main HTML (single page)
├── styles.css              # Design system & styles (with dark mode)
├── app.js                  # Search logic & UI
├── data/
│   └── dupes.js            # Product database
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment
└── README.md               # You are here
```

---

## 🎨 Design System

### Brand Voice
- **Calm** — Never pushy or promotional
- **Confident** — Authoritative without being elitist
- **Inclusive** — No budget shaming, luxury as inspiration
- **Transparent** — Honest about limitations

### Visual Language
- **Typography**: Cormorant Garamond (serif headings) + Inter (body)
- **Colors**: Warm neutrals (stone palette), minimal accent colors
- **Dark Mode**: Elegant dark theme with proper contrast ratios
- **Layout**: Generous whitespace, single-column focus
- **Interactions**: Subtle, purposeful animations

### Theme Toggle
- Respects `prefers-color-scheme` system setting
- Manual override saved to localStorage
- Smooth transitions between modes

---

## 🗃️ Data Architecture

### Product Schema

```javascript
{
  id: "unique-id",
  name: "Product Name",
  brand: "Brand Name",
  category: "fragrance | makeup | skincare",
  subcategory: "eau de parfum | lipstick | moisturizer",
  price: "$XXX",
  description: "Brief description",
  aliases: ["alternate", "search", "terms"],
  dupes: [
    {
      name: "Dupe Product Name",
      brand: "Dupe Brand",
      priceRange: "$XX–$XX",
      matchScore: 0-100,      // Similarity confidence
      reason: "Why it's a good dupe (1-2 sentences)",
      differences: "Key differences (optional)",
      bestFor: ["Tag 1", "Tag 2"]  // User segments
    }
  ]
}
```

### Match Score Guidelines

| Score | Label | Meaning |
|-------|-------|---------|
| 85-100 | Very Close Match | Nearly identical experience |
| 70-84 | Good Match | Captures the essence, minor differences |
| 50-69 | Similar Vibe | Same category/feeling, notable differences |
| <50 | Alternative | Different but worth considering |

---

## 🛠️ Technical Decisions

### Why Client-Side Search?
- **GitHub Pages constraint** — No server-side processing
- **Speed** — Instant results, no network latency for search
- **Privacy** — No user data leaves the browser
- **Simplicity** — Easy to maintain and update

### Why JavaScript Data File (not JSON)?
- Avoids CORS issues when opening `index.html` directly
- Simpler loading without fetch/async complexity
- Easy to convert to JSON API later

### Future Scaling Path

```
MVP (Now)           → V1.1              → V2               → V3
Static JS data      → External JSON     → API + Database   → AI/Embeddings
Client fuzzy search → Category filters  → Server search    → Semantic search
~20 products        → ~100 products     → 1000+ products   → Unlimited
```

---

## 📝 Content Guidelines

### Adding New Products

1. Open `data/dupes.js`
2. Add a new product object to the `products` array
3. Follow the schema above
4. Include at least 2-3 dupes per luxury product

### Dupe Quality Standards

- ✅ **Must be meaningfully cheaper** (at least 30% less)
- ✅ **Must be widely accessible** (drugstore, Sephora, Ulta, Amazon)
- ✅ **Must have verifiable similarity** (community consensus, ingredient analysis)
- ❌ **Don't exaggerate** — If it's not a true dupe, say so
- ❌ **Don't include discontinued products**
- ❌ **Don't include counterfeits or unauthorized products**

### Writing Dupe Descriptions

```
Good: "Shares the amber-vanilla DNA with similar longevity. 
       Less complex dry-down but excellent everyday alternative."

Bad:  "OMG this is literally the SAME THING!! You'd never know 
       the difference! Best dupe EVER!!"
```

---

## 🔮 Roadmap

### Phase 1 (MVP) ✅
- [x] Single-page search interface
- [x] Editorial design system
- [x] Dark mode support
- [x] Client-side fuzzy search
- [x] Curated fragrance + makeup database
- [x] Mobile-responsive layout
- [x] GitHub Actions auto-deployment

### Phase 2 (Enhanced Discovery)
- [ ] Category browsing (Fragrance / Makeup / Skincare)
- [ ] Filter by price range
- [ ] "Random dupe" discovery feature
- [ ] Share/bookmark results

### Phase 3 (Community)
- [ ] User submissions (via GitHub Issues or form)
- [ ] Voting/rating on dupe accuracy
- [ ] "Verified" badge for community-tested dupes

### Phase 4 (Intelligence)
- [ ] API backend for larger dataset
- [ ] Ingredient-based similarity matching
- [ ] Price tracking integration
- [ ] AI-powered recommendations

---

## 🤝 Contributing

We welcome contributions! Here's how:

### Adding Dupes
1. Fork the repository
2. Edit `data/dupes.js`
3. Submit a pull request with:
   - Source for your dupe claim (Reddit, YouTube, blog)
   - Your personal experience (if applicable)

### Reporting Issues
- Use GitHub Issues for bugs or suggestions
- Include browser/device info for bugs

### Code Contributions
- Follow existing code style
- Test on mobile before submitting
- Keep it simple — complexity is the enemy

---

## 📄 License

MIT License — Use freely, attribution appreciated.

---

## 💌 Philosophy

> "Luxury should inspire, not gatekeep."

The Dupe Edit exists because everyone deserves to feel good. We believe:

- **Price ≠ worth** — Expensive doesn't always mean better
- **Accessibility matters** — Beauty shouldn't require wealth
- **Honesty builds trust** — We'd rather say "no good dupe exists" than mislead
- **Simplicity is luxury** — Clean design, clear information, no clutter

---

<p align="center">
  <em>Made with care for beauty lovers everywhere.</em>
</p>
