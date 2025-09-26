/**
 * Component Loader for Modular Website
 * This script loads HTML components dynamically and manages page navigation
 */

class ComponentLoader {
    constructor() {
        this.components = {
            'sidebar': './components/sidebar.html',
            'navbar': './components/navbar.html',
            'home': './components/home.html',
            'resume': './components/resume.html',
            'research': './components/research.html',
            'teaching': './components/teaching.html',
            'blog': './components/blog.html',
            'contact': './components/contact.html'
        };
        
        this.currentPage = 'home';
        this.init();
    }

    async init() {
        try {
            // Load sidebar and navbar first
            await this.loadComponent('sidebar', 'sidebar-container');
            await this.loadComponent('navbar', 'navbar-container');
            
            // Load home page by default
            await this.loadPage('home');
            
            // Set up navigation event listeners
            this.setupNavigation();
            
            console.log('Component loader initialized successfully');
        } catch (error) {
            console.error('Error initializing component loader:', error);
        }
    }

    async loadComponent(componentName, containerId) {
        try {
            const response = await fetch(this.components[componentName]);
            if (!response.ok) {
                throw new Error(`Failed to load ${componentName}: ${response.status}`);
            }
            
            const html = await response.text();
            const container = document.getElementById(containerId);
            
            if (container) {
                container.innerHTML = html;
                console.log(`${componentName} component loaded successfully`);
            } else {
                console.error(`Container ${containerId} not found`);
            }
        } catch (error) {
            console.error(`Error loading ${componentName}:`, error);
        }
    }

    async loadPage(pageName) {
        try {
            await this.loadComponent(pageName, 'page-content');
            this.currentPage = pageName;
            
            // Update active navigation state
            this.updateNavigationState(pageName);
            
            console.log(`Page ${pageName} loaded successfully`);
        } catch (error) {
            console.error(`Error loading page ${pageName}:`, error);
        }
    }

    setupNavigation() {
        // Wait for navbar to be loaded, then set up event listeners
        setTimeout(() => {
            const navLinks = document.querySelectorAll('[data-nav-link]');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const pageName = link.textContent.trim().toLowerCase();
                    this.loadPage(pageName);
                });
            });
        }, 100);
    }

    updateNavigationState(activePage) {
        // Remove active class from all nav links
        const navLinks = document.querySelectorAll('[data-nav-link]');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current page
        const activeLink = Array.from(navLinks).find(link => 
            link.textContent.trim().toLowerCase() === activePage
        );
        
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Update page visibility
        this.updatePageVisibility(activePage);
    }

    updatePageVisibility(activePage) {
        // Hide all page articles
        const allPages = document.querySelectorAll('article[data-page]');
        allPages.forEach(page => {
            page.classList.remove('active');
        });

        // Show current page
        const currentPageElement = document.querySelector(`article[data-page="${activePage}"]`);
        if (currentPageElement) {
            currentPageElement.classList.add('active');
        }
    }

    // Public method to programmatically navigate to a page
    navigateTo(pageName) {
        if (this.components[pageName]) {
            this.loadPage(pageName);
        } else {
            console.error(`Page ${pageName} not found`);
        }
    }

    // Get current page
    getCurrentPage() {
        return this.currentPage;
    }
}

// Initialize the component loader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.componentLoader = new ComponentLoader();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComponentLoader;
}
