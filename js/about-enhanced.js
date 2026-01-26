// About Section Enhancements
// Handles animated stats, progress bars, and intersection observing

const aboutEnhanced = {
    initialized: false,

    init() {
        if (this.initialized) return;

        this.observeSection();
        this.initialized = true;
    },

    observeSection() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStats();
                    this.animateProgressBars();
                    observer.disconnect(); // Only animate once
                }
            });
        }, { threshold: 0.3 });

        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            observer.observe(aboutSection);
        }
    },

    animateStats() {
        const stats = document.querySelectorAll('.stat-value');

        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = Math.ceil(target / (duration / 16)); // 60fps

            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = current;
                }
            }, 16);
        });
    },

    animateProgressBars() {
        const fills = document.querySelectorAll('.progress-fill');

        fills.forEach(fill => {
            const progress = fill.getAttribute('data-progress');
            // Reset width first
            fill.style.width = '0%';

            // Force reflow
            void fill.offsetWidth;

            // Set width to animate
            setTimeout(() => {
                fill.style.width = `${progress}%`;
            }, 100);
        });
    }
};

// Export for use in main.js
window.aboutEnhanced = aboutEnhanced;
