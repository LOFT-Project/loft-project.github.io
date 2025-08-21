# LOFT - Living Off Free Trials

A security research platform documenting services commonly abused for malicious purposes including phishing, malware distribution, command & control, and data exfiltration. This project follows the methodologies of [LOTS Project](https://lots-project.com), [LOLBAS](https://lolbas-project.github.io/), and [GTFOBins](https://gtfobins.github.io/) for defensive security research.

## 🌐 Live Site

**[Your GitHub Pages URL will be here]**

## 🎯 Features

- **Security Research Focus** - Documents abuse potential of legitimate services
- **Expandable Descriptions** - Click platforms to view security research details
- **Advanced Search** - Use `+tag` for tag search, `#category` for category filtering
- **Security Tags** - Phishing, Download, Exfiltration, C&C, SSO, Dev Tier classifications
- **Contributor Attribution** - Shows research contributors in expanded view
- **Clean Table Interface** - Technical design inspired by LOTS/LOLBAS methodology
- **Auto-Updates** - Content automatically syncs from the LOFT repository

## 🔍 Search Tips

- **General Search**: Type platform name or description
- **Tag Search**: Use `+` prefix (e.g., `+phishing`, `+exfiltration`, `+dev tier`)
- **Category Search**: Use `#` prefix (e.g., `#hosting`, `#communication`)
- **Security Focus**: Search for specific abuse types like `+download` or `+c&c`
- **Clear Search**: Empty the search box to see all platforms

## 🏗️ Technical Stack

- **Static Site** - Pure HTML, CSS, JavaScript
- **GitHub Pages** - Automated deployment
- **YAML Pipeline** - Content sourced from structured data
- **Responsive CSS** - Monospace fonts, technical aesthetic

## 📊 Data Source

Security research data is automatically generated from the [LOFT Content Repository](../LOFT), which contains:
- Individual YAML files documenting service abuse potential
- Security-focused tags and descriptions (Phishing, Download, Exfiltration, C&C, SSO, Dev Tier)
- Contributor attribution and research metadata
- Automated processing and validation pipeline
- Fallback data ensures site functionality without processed JSON

## 🛡️ Security Research Ethics

**This project is for defensive security research and education only.**

- **Legitimate Services**: We document abuse of legitimate platforms, not malicious services
- **Defensive Purpose**: Content is designed to help security professionals understand threats
- **No Exploitation**: We do not provide attack tools or specific exploitation methods
- **Responsible Research**: All research follows ethical security research practices
- **Awareness Building**: Goal is to improve security awareness and defensive measures

## 🎨 Design Philosophy

- **Information Dense** - Maximum security research data in minimal space
- **Technical Aesthetic** - Monospace fonts, clean lines inspired by LOTS/LOLBAS
- **Research Focused** - Optimized for security researchers and blue teams
- **Mobile Optimized** - Responsive table design for field research

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

To contribute security research data:
1. Go to the [LOFT Content Repository](../LOFT)
2. Read the [Contributing Guide](https://github.com/loft/loft/contributing.md) for guidelines
3. Copy `platforms/example-platform.yml` as your template
4. Add your platform YAML file with security research descriptions
5. GitHub Actions will automatically process and deploy

## 🤝 Contributing

1. **Security Research Data**: Add platforms via the [LOFT Content Repository](../LOFT)
2. **Read Guidelines**: See [Contributing Guide](https://github.com/loft/loft/contributing.md) for security research focus
3. **Frontend Improvements**: Fork this repository for UI/UX changes
4. **Issues**: Report problems or suggestions via GitHub Issues
5. **Ethical Research**: All contributions must follow defensive security research principles

## 📄 License

MIT License - Open source and free to use.

---

**Inspired by [LOTS Project](https://lots-project.com), [LOLBAS](https://lolbas-project.github.io/), and [GTFOBins](https://gtfobins.github.io/)** - Security research methodologies with clean technical design.