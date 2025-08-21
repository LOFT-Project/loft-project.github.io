# LOFT - List Of Free Tiers

A curated directory of SaaS platforms offering free tiers, trials, and developer accounts. Styled after the technical aesthetic of [LOTS Project](https://lots-project.com).

## 🌐 Live Site

**[Your GitHub Pages URL will be here]**

## 🎯 Features

- **Clean Table Interface** - Inspired by lots-project.com technical design
- **Advanced Search** - Use `+tag` for tag search, `#category` for category filtering
- **Sort Functionality** - Click sort to reorder platforms alphabetically
- **Responsive Design** - Works on desktop and mobile
- **Auto-Updates** - Content automatically syncs from the LOFT repository

## 🔍 Search Tips

- **General Search**: Type platform name or description
- **Tag Search**: Use `+` prefix (e.g., `+database`, `+free tier`)
- **Category Search**: Use `#` prefix (e.g., `#hosting`, `#authentication`)
- **Clear Search**: Empty the search box to see all platforms

## 🏗️ Technical Stack

- **Static Site** - Pure HTML, CSS, JavaScript
- **GitHub Pages** - Automated deployment
- **YAML Pipeline** - Content sourced from structured data
- **Responsive CSS** - Monospace fonts, technical aesthetic

## 📊 Data Source

Platform data is automatically generated from the [LOFT Content Repository](../LOFT), which contains:
- Individual YAML files for each platform
- Automated processing and validation
- Cross-repository deployment pipeline

## 🎨 Design Philosophy

- **Information Dense** - Maximum data in minimal space
- **Technical Aesthetic** - Monospace fonts, clean lines
- **Keyboard Friendly** - Efficient search and navigation
- **Mobile Optimized** - Responsive table design

## 🔧 Development

### Local Development

```bash
# Simple HTTP server
python3 -m http.server 8000

# Or with Node.js
npx serve .

# Open http://localhost:8000
```

### GitHub Actions

Automated deployment triggered by:
- Direct pushes to this repository
- Content updates from the LOFT repository
- Manual workflow dispatch

## 📝 Adding Content

To add new platforms:
1. Go to the [LOFT Content Repository](../LOFT)
2. Add a new YAML file in the `platforms/` directory
3. GitHub Actions will automatically process and deploy

## 🤝 Contributing

1. **Content Changes**: Add platforms via the LOFT repository
2. **Site Improvements**: Fork this repository for frontend changes
3. **Issues**: Report problems or suggestions via GitHub Issues

## 📄 License

MIT License - Open source and free to use.

---

**Inspired by [LOTS Project](https://lots-project.com)** - Technical documentation meets clean design.