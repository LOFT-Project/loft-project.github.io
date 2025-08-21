// LOFT Platform Directory JavaScript
class PlatformDirectory {
    constructor() {
        this.platforms = [];
        this.filteredPlatforms = [];
        this.sortAscending = true;
        this.init();
    }

    async init() {
        await this.loadPlatforms();
        this.setupEventListeners();
        this.renderPlatforms();
    }

    async loadPlatforms() {
        try {
            console.log('🔄 Loading platform data...');
            
            // Try to fetch from processed JSON data
            const response = await fetch('data/platforms.json');
            
            if (response.ok) {
                const data = await response.json();
                this.platforms = data.platforms || [];
                console.log(`✅ Loaded ${this.platforms.length} platforms from JSON`);
            } else {
                console.warn('⚠️  Could not load platforms.json, using fallback data');
                this.platforms = this.getFallbackData();
            }
            
            this.filteredPlatforms = [...this.platforms];
            
        } catch (error) {
            console.error('❌ Error loading platforms, using fallback:', error);
            this.platforms = this.getFallbackData();
            this.filteredPlatforms = [...this.platforms];
        }
    }

    getFallbackData() {
        return [
            {
                name: "ProtonMail",
                website: "https://protonmail.com",
                category: "Email",
                free_tier: "500MB storage, 150 messages/day",
                trial: "N/A",
                developer_account: "N/A",
                contributor: "loft-maintainer",
                tags: ["Free Tier", "Phishing"],
                phishing_description: "Encrypted email service commonly abused for phishing campaigns due to privacy features"
            },
            {
                name: "GitHub",
                website: "https://github.com",
                category: "Development",
                free_tier: "Unlimited public repos, 2000 Actions minutes",
                trial: "N/A",
                developer_account: "Free for developers",
                contributor: "loft-maintainer",
                tags: ["Free Tier", "Dev Tier", "Download", "C&C", "SSO"],
                dev_tier_description: "Platform provides development tools and repositories for legitimate and malicious projects",
                download_description: "Public repositories can host malicious payloads and tools",
                cc_description: "Issues and wikis can be used for command and control communication",
                sso_description: "Enterprise GitHub supports SAML/OIDC integration for organizational single sign-on"
            },
            {
                name: "Dropbox",
                website: "https://dropbox.com",
                category: "Storage",
                free_tier: "2GB storage, file sharing",
                trial: "30 days Business features",
                developer_account: "N/A",
                contributor: "loft-maintainer",
                tags: ["Free Tier", "Trial", "Download", "Exfiltration"],
                download_description: "Shared links commonly used to distribute malicious files",
                exfiltration_description: "File synchronization can be abused for data exfiltration"
            },
            {
                name: "Discord",
                website: "https://discord.com",
                category: "Communication",
                free_tier: "Unlimited messaging, voice, video",
                trial: "N/A",
                developer_account: "Bot development API",
                contributor: "loft-maintainer",
                tags: ["Free Tier", "Dev Tier", "C&C", "Exfiltration", "SSO"],
                dev_tier_description: "Bot API allows automated interactions and data collection",
                cc_description: "Channels and DMs used for command and control operations",
                exfiltration_description: "File uploads and webhooks enable data exfiltration",
                sso_description: "Discord supports OAuth integration with external identity providers for server authentication"
            },
            {
                name: "Pastebin",
                website: "https://pastebin.com", 
                category: "Storage",
                free_tier: "Unlimited public pastes",
                trial: "N/A",
                developer_account: "API access available",
                contributor: "loft-maintainer",
                tags: ["Free Tier", "Dev Tier", "C&C", "Download"],
                dev_tier_description: "API allows programmatic paste creation and retrieval",
                cc_description: "Anonymous pastes used for sharing commands and configurations",
                download_description: "Raw paste URLs used to host and distribute malicious scripts"
            },
            {
                name: "Telegram",
                website: "https://telegram.org",
                category: "Communication", 
                free_tier: "Unlimited messaging, file sharing up to 2GB",
                trial: "N/A",
                developer_account: "Bot API available",
                contributor: "loft-maintainer",
                tags: ["Free Tier", "Dev Tier", "C&C", "Exfiltration"],
                dev_tier_description: "Bot API enables automated messaging and file operations",
                cc_description: "Channels and bots commonly used for command distribution",
                exfiltration_description: "Large file support and bots enable data exfiltration"
            }
        ];
    }

    setupEventListeners() {
        const searchInput = document.getElementById('search');
        const sortBtn = document.getElementById('sort-btn');

        searchInput.addEventListener('input', () => this.filterPlatforms());
        sortBtn.addEventListener('click', () => this.sortPlatforms());
    }

    filterPlatforms() {
        const searchTerm = document.getElementById('search').value.toLowerCase().trim();
        
        if (!searchTerm) {
            this.filteredPlatforms = [...this.platforms];
        } else if (searchTerm.startsWith('+')) {
            // Search in tags
            const tagSearch = searchTerm.slice(1);
            this.filteredPlatforms = this.platforms.filter(platform => 
                platform.tags.some(tag => tag.toLowerCase().includes(tagSearch))
            );
        } else if (searchTerm.startsWith('#')) {
            // Search in category
            const categorySearch = searchTerm.slice(1);
            this.filteredPlatforms = this.platforms.filter(platform =>
                platform.category.toLowerCase().includes(categorySearch)
            );
        } else {
            // General search
            this.filteredPlatforms = this.platforms.filter(platform => {
                return platform.name.toLowerCase().includes(searchTerm) ||
                       platform.free_tier.toLowerCase().includes(searchTerm) ||
                       platform.category.toLowerCase().includes(searchTerm) ||
                       platform.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            });
        }

        this.renderPlatforms();
    }

    sortPlatforms() {
        this.sortAscending = !this.sortAscending;
        this.filteredPlatforms.sort((a, b) => {
            const comparison = a.name.localeCompare(b.name);
            return this.sortAscending ? comparison : -comparison;
        });
        this.renderPlatforms();
    }

    renderPlatforms() {
        const tbody = document.getElementById('platforms-tbody');
        const count = document.getElementById('count');
        
        count.textContent = `${this.filteredPlatforms.length} platforms`;
        
        if (this.filteredPlatforms.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: #666;">No platforms found</td></tr>';
            return;
        }

        tbody.innerHTML = this.filteredPlatforms.map((platform, index) => this.createPlatformRow(platform, index)).join('');
        
        // Add click handlers for expandable rows
        this.addExpandHandlers();
        
        // Add click handlers for tag filtering
        this.addTagClickHandlers();
        
        // Add click handlers for category filtering
        this.addCategoryClickHandlers();
    }

    createPlatformRow(platform, index) {
        const tags = platform.tags.map(tag => {
            let className = 'tag';
            if (tag.includes('Free Tier')) className += ' free-tier';
            else if (tag.includes('Trial')) className += ' trial';
            else if (tag.includes('Dev Tier')) className += ' developer';
            else if (tag.includes('SSO')) className += ' sso';
            else if (tag.includes('Phishing')) className += ' phishing';
            else if (tag.includes('Download')) className += ' download';
            else if (tag.includes('Exfiltration')) className += ' exfiltration';
            else if (tag.includes('C&C')) className += ' cc';
            
            return `<span class="${className}">${tag}</span>`;
        }).join('');

        const rowId = `platform-${index}`;
        const detailsId = `details-${index}`;

        return `
            <tr class="platform-row" data-platform-id="${index}" id="${rowId}">
                <td>
                    <div class="platform-header">
                        <span class="expand-indicator">▶</span>
                        <div class="platform-info">
                            <div class="platform-name">${platform.name}</div>
                            <a href="${platform.website}" target="_blank" class="platform-url">${platform.website}</a>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="category-info">${platform.category}</div>
                </td>
                <td>
                    <div class="tags">${tags}</div>
                </td>
            </tr>
            <tr class="platform-details" id="${detailsId}" style="display: none;">
                <td colspan="3">
                    <div class="details-content">
                        <div class="detail-row">
                            <strong>Free Tier:</strong> ${platform.free_tier}
                        </div>
                        ${platform.trial && platform.trial !== 'N/A' ? 
                            `<div class="detail-row"><strong>Trial:</strong> ${platform.trial}</div>` : ''}
                        ${platform.developer_account && platform.developer_account !== 'N/A' ? 
                            `<div class="detail-row"><strong>Developer Account:</strong> ${platform.developer_account}</div>` : ''}
                        ${platform.dev_tier_description ? 
                            `<div class="detail-row"><strong>Dev Tier:</strong> ${platform.dev_tier_description}</div>` : ''}
                        ${platform.sso_description ? 
                            `<div class="detail-row"><strong>SSO:</strong> ${platform.sso_description}</div>` : ''}
                        ${platform.phishing_description ? 
                            `<div class="detail-row"><strong>Phishing:</strong> ${platform.phishing_description}</div>` : ''}
                        ${platform.download_description ? 
                            `<div class="detail-row"><strong>Download:</strong> ${platform.download_description}</div>` : ''}
                        ${platform.exfiltration_description ? 
                            `<div class="detail-row"><strong>Exfiltration:</strong> ${platform.exfiltration_description}</div>` : ''}
                        ${platform.cc_description ? 
                            `<div class="detail-row"><strong>C&C:</strong> ${platform.cc_description}</div>` : ''}
                        ${platform.pricing_url ? 
                            `<div class="detail-row"><strong>Pricing:</strong> <a href="${platform.pricing_url}" target="_blank" class="detail-link">${platform.pricing_url}</a></div>` : ''}
                        ${platform.last_updated ? 
                            `<div class="detail-row"><strong>Last Updated:</strong> ${platform.last_updated}</div>` : ''}
                        ${platform.contributor ? 
                            `<div class="detail-row"><strong>Contributor:</strong> ${platform.contributor}</div>` : ''}
                    </div>
                </td>
            </tr>
        `;
    }

    addExpandHandlers() {
        const platformRows = document.querySelectorAll('.platform-row');
        
        platformRows.forEach(row => {
            row.addEventListener('click', (e) => {
                // Don't expand if clicking on a link
                if (e.target.tagName === 'A') return;
                
                const platformId = row.dataset.platformId;
                const detailsRow = document.getElementById(`details-${platformId}`);
                const indicator = row.querySelector('.expand-indicator');
                
                if (detailsRow.style.display === 'none') {
                    detailsRow.style.display = 'table-row';
                    indicator.textContent = '▼';
                    row.classList.add('expanded');
                } else {
                    detailsRow.style.display = 'none';
                    indicator.textContent = '▶';
                    row.classList.remove('expanded');
                }
            });
            
            // Add hover cursor
            row.style.cursor = 'pointer';
        });
    }

    addTagClickHandlers() {
        const tagElements = document.querySelectorAll('.tag');
        
        tagElements.forEach(tag => {
            tag.addEventListener('click', (e) => {
                // Prevent row expansion when clicking tags
                e.stopPropagation();
                
                // Get tag text and clean it for search
                const tagText = tag.textContent.trim();
                
                // Update search input with tag filter
                const searchInput = document.getElementById('search');
                searchInput.value = `+${tagText.toLowerCase()}`;
                
                // Trigger filtering
                this.filterPlatforms();
                
                // Focus search input to show the applied filter
                searchInput.focus();
                searchInput.blur(); // Remove focus but keep the value visible
            });
            
            // Add hover cursor to indicate clickability
            tag.style.cursor = 'pointer';
        });
    }

    addCategoryClickHandlers() {
        const categoryElements = document.querySelectorAll('.category-info');
        
        categoryElements.forEach(category => {
            category.addEventListener('click', (e) => {
                // Prevent row expansion when clicking categories
                e.stopPropagation();
                
                // Get category text and clean it for search
                const categoryText = category.textContent.trim();
                
                // Update search input with category filter
                const searchInput = document.getElementById('search');
                searchInput.value = `#${categoryText.toLowerCase()}`;
                
                // Trigger filtering
                this.filterPlatforms();
                
                // Focus search input to show the applied filter
                searchInput.focus();
                searchInput.blur(); // Remove focus but keep the value visible
            });
            
            // Add hover cursor to indicate clickability
            category.style.cursor = 'pointer';
        });
    }
}

// Initialize the platform directory when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PlatformDirectory();
});