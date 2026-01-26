// Main Application Entry Point
// Coordinates all modules and initializes the application

document.addEventListener('DOMContentLoaded', () => {
    // console.log('%c🔐 Cyber-Tamer Portfolio v1.0', 'color: #FF005C; font-size: 20px; font-weight: bold;');
    // console.log('%cInitializing systems...', 'color: #00FF88; font-size: 12px;');

    // Initialize all modules
    initializeModules();

    // Add event listeners
    setupEventListeners();

    // Optional: Add particle effects on clicks
    // effects.addClickEffect();

    // console.log('%c✓ All systems operational', 'color: #00FF88; font-size: 12px;');
});

function initializeModules() {
    // Navigation system
    if (window.navigation) {
        navigation.init();
        // console.log('✓ Navigation system initialized');
    }

    // Self-Destruct System
    if (window.selfDestruct) {
        selfDestruct.init();
        // console.log('✓ Self-destruct system initialized');
    }

    // Terminal
    if (window.terminal) {
        terminal.init();
        // console.log('✓ Terminal system initialized');
    }

    // Terminal Collapse
    if (window.terminalCollapse) {
        terminalCollapse.init();
        // console.log('✓ Terminal collapse initialized');
    }

    // Visual effects
    if (window.effects) {
        effects.init();
        // console.log('✓ Visual effects initialized');
    }

    // Heatmap
    if (window.heatmap) {
        heatmap.init();
        // console.log('✓ Commit heatmap generated');
    }

    // Penguin Cursor Companion
    if (window.penguinCursor) {
        penguinCursor.init();
    }
}

function setupEventListeners() {
    // Handle window resize for physics engine
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (gravityEngine && gravityEngine.isActive) {
                // Deactivate and reactivate to adjust to new dimensions
                const toggle = document.getElementById('gravity-toggle');
                if (toggle && toggle.checked) {
                    gravityEngine.deactivate();
                    setTimeout(() => {
                        gravityEngine.activate();
                    }, 100);
                }
            }
        }, 250);
    });

    // Resume download button
    const resumeBtn = document.getElementById('resume-download-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // In a real scenario, this would link to an actual PDF file
            // For now, we'll show a message
            if (window.terminal) {
                terminal.addOutput('<span class="ct-pink">📄 Resume Download</span>');
                terminal.addOutput('<span class="comment"># To enable actual downloads, place your resume.pdf in the root directory</span>');
                terminal.addOutput('<span class="comment"># Then update the href to: href="resume.pdf"</span>');
                terminal.output.classList.remove('hidden');
                terminal.output.scrollTop = terminal.output.scrollHeight;
            }
            // Uncomment this line when you have an actual resume.pdf file:
            // window.open('resume.pdf', '_blank');
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + D: Toggle self-destruct
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            const toggle = document.getElementById('destruct-toggle');
            if (toggle) {
                toggle.checked = !toggle.checked;
                toggle.dispatchEvent(new Event('change'));
            }
        }

        // Ctrl/Cmd + K: Focus terminal
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const terminalInput = document.getElementById('terminal-input');
            if (terminalInput) {
                terminalInput.focus();
            }
        }

        // Escape: Clear focus
        if (e.key === 'Escape') {
            document.activeElement.blur();
        }
    });

    // Add hover sound effects (optional)
    addHoverEffects();
}

function addHoverEffects() {
    // Add subtle scale effect to interactive elements
    const interactiveElements = document.querySelectorAll('.badge, .project-card, .file');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'transform 0.3s ease';
        });
    });
}

// Easter egg: Konami code
(function () {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        // console.log('%c🎮 KONAMI CODE ACTIVATED!', 'color: #FF005C; font-size: 24px; font-weight: bold;');

        // Create particle explosion
        if (window.effects) {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    effects.createParticle(centerX, centerY);
                }, i * 20);
            }
        }

        // Fun color animation
        document.body.style.animation = 'rainbow 2s ease infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 6000);
    }
})();

// Add rainbow animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Expose API for console debugging
window.cyberTamer = {
    navigation,
    selfDestruct,
    terminal,
    effects,
    heatmap,
    version: '1.0.0',
    info: () => {
        // console.log('%cCyber-Tamer Portfolio API', 'color: #FF005C; font-size: 16px; font-weight: bold;');
        // console.log('Available modules:', Object.keys(window.cyberTamer).filter(k => k !== 'info' && k !== 'version'));
        // console.log('Version:', window.cyberTamer.version);
    }
};
