// Navigation System
// Handles file tree navigation and section switching

const navigation = {
    currentSection: 'about',

    init() {
        // Get all navigation links
        const navLinks = document.querySelectorAll('.file-tree .file');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const target = link.getAttribute('data-target');
                if (target) {
                    this.navigateTo(target);
                }
            });
        });
    },

    navigateTo(sectionId) {
        // Update current section
        this.currentSection = sectionId;

        // Hide all sections
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update navigation active state
        const navLinks = document.querySelectorAll('.file-tree .file');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === sectionId) {
                link.classList.add('active');
            }
        });

        // Update status bar
        this.updateStatusBar(sectionId);

        // Scroll to top of content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.scrollTop = 0;
        }
    },

    updateStatusBar(sectionId) {
        const statusElement = document.getElementById('current-section');
        const paths = {
            'about': '/root/about_me.sh',
            'experience': '/root/experience.log',
            'education': '/root/education.json',
            'projects': '/root/projects/',
            'security': '/root/security_lab/',
            'gravity': '/root/gravity_engine.exe',
            'contact': '/root/contact.txt'
        };

        if (statusElement && paths[sectionId]) {
            statusElement.textContent = paths[sectionId];
        }
    }
};

// Export for use in main.js
window.navigation = navigation;
