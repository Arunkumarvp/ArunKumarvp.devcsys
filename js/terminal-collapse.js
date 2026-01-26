// Terminal Collapse/Expand Functionality
// Allows hiding and showing the terminal with smooth animation

const terminalCollapse = {
    terminal: null,
    toggleBtn: null,
    isCollapsed: false,

    init() {
        this.terminal = document.getElementById('command-terminal');
        this.toggleBtn = document.getElementById('terminal-toggle');

        if (this.toggleBtn && this.terminal) {
            this.toggleBtn.addEventListener('click', () => this.toggle());

            // Also allow keyboard shortcut (Ctrl/Cmd + `)
            document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === '`') {
                    e.preventDefault();
                    this.toggle();
                }
            });
        }
    },

    toggle() {
        this.isCollapsed = !this.isCollapsed;

        if (this.isCollapsed) {
            this.collapse();
        } else {
            this.expand();
        }
    },

    collapse() {
        this.terminal.classList.add('collapsed');

        // Blur terminal input when collapsed
        const terminalInput = document.getElementById('terminal-input');
        if (terminalInput) {
            terminalInput.blur();
        }
    },

    expand() {
        this.terminal.classList.remove('collapsed');

        // Focus terminal input when expanded
        const terminalInput = document.getElementById('terminal-input');
        if (terminalInput) {
            setTimeout(() => terminalInput.focus(), 300);
        }
    },

    // Public method to expand terminal programmatically
    show() {
        if (this.isCollapsed) {
            this.toggle();
        }
    },

    // Public method to collapse terminal programmatically
    hide() {
        if (!this.isCollapsed) {
            this.toggle();
        }
    }
};

// Export for use in main.js
window.terminalCollapse = terminalCollapse;
