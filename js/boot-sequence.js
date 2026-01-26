// Boot Sequence Animation
// Simulates Linux terminal boot process

const bootSequence = {
    logs: [
        '[    0.000000] Initializing kernel...',
        '[    0.142857] Loading security modules...',
        '[    0.285714] Mounting filesystems...',
        '[    0.428571] Starting network services...',
        '[    0.571428] Loading anti-gravity modules...',
        '[    0.714285] Initializing physics engine...',
        '[    0.857142] Establishing secure handshake...',
        '[    1.000000] Configuring terminal interface...',
        '[    1.142857] Loading user profile: cyber-tamer',
        '[    1.285714] Checking system integrity...',
        '[    1.428571] Starting web services...',
        '[    1.571428] Initializing portfolio modules...',
        '[    1.714285] All systems operational',
        '[    1.857142] Ready for deployment',
        '',
        '[\x1b[32m  OK  \x1b[0m] Boot sequence complete',
        '[\x1b[32m  OK  \x1b[0m] Welcome to Cyber-Tamer Portfolio v1.0',
        '',
        'Starting interactive mode...'
    ],

    currentIndex: 0,
    bootText: null,
    progressBar: null,
    overlay: null,

    init() {
        this.bootText = document.getElementById('boot-text');
        this.progressBar = document.getElementById('progress-bar');
        this.overlay = document.getElementById('boot-sequence');

        this.animate();
    },

    animate() {
        if (this.currentIndex < this.logs.length) {
            // Add current log line
            this.bootText.textContent += this.logs[this.currentIndex] + '\n';

            // Update progress bar
            const progress = ((this.currentIndex + 1) / this.logs.length) * 100;
            this.progressBar.style.width = progress + '%';

            // Scroll to bottom
            this.bootText.scrollTop = this.bootText.scrollHeight;

            this.currentIndex++;

            // Random delay between 50-150ms for realistic effect
            const delay = Math.random() * 100 + 50;
            setTimeout(() => this.animate(), delay);
        } else {
            // Boot complete - fade out after 1 second
            setTimeout(() => {
                this.overlay.classList.add('hidden');
                // Start uptime counter
                if (window.uptimeCounter) {
                    window.uptimeCounter.start();
                }
            }, 1000);
        }
    }
};

// Uptime Counter
const uptimeCounter = {
    startTime: null,
    interval: null,
    element: null,

    start() {
        this.startTime = Date.now();
        this.element = document.getElementById('uptime');

        this.interval = setInterval(() => {
            this.update();
        }, 1000);
    },

    update() {
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const hours = Math.floor(elapsed / 3600);
        const minutes = Math.floor((elapsed % 3600) / 60);
        const seconds = elapsed % 60;

        const formatted = `Uptime: ${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
        this.element.textContent = formatted;
    },

    pad(num) {
        return num.toString().padStart(2, '0');
    }
};

// Export for use in main.js
window.bootSequence = bootSequence;
window.uptimeCounter = uptimeCounter;

// Auto-start on page load
document.addEventListener('DOMContentLoaded', () => {
    bootSequence.init();
});
