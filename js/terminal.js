// Terminal Command System
// Handles sudo commands and terminal input

const terminal = {
    input: null,
    output: null,
    commandHistory: [],
    historyIndex: -1,

    commands: {
        'sudo help': {
            description: 'Display available commands',
            execute: () => {
                return [
                    '<span class="ct-pink">Available Commands:</span>',
                    '',
                    '<span class="keyword">sudo help</span>         - Show this help message',
                    '<span class="keyword">sudo destruct</span>    - Initiate self-destruct sequence',
                    '<span class="keyword">sudo confirm</span>     - Confirm self-destruct activation',
                    '<span class="keyword">sudo abort</span>       - Abort active self-destruct',
                    '<span class="keyword">sudo cancel</span>      - Cancel self-destruct confirmation',
                    '<span class="keyword">sudo color-shift</span>  - Cycle through color themes',
                    '<span class="keyword">sudo contact</span>      - Jump to contact section',
                    '<span class="keyword">sudo clear</span>        - Clear terminal output',
                    '<span class="keyword">reboot</span>            - Force system reboot to normal',
                    '<span class="keyword">whoami</span>            - Display user information',
                    '<span class="keyword">ls</span>                - List available sections',
                    '',
                    '<span class="comment"># Tip: Press UP/DOWN arrows to navigate command history</span>'
                ];
            }
        },

        'sudo destruct': {
            description: 'Initiate self-destruct sequence',
            execute: () => {
                const toggle = document.getElementById('destruct-toggle');
                if (toggle && !toggle.checked) {
                    toggle.checked = true;
                    toggle.dispatchEvent(new Event('change'));
                    return [
                        '<span class="status critical">⚠️ Self-destruct sequence initiated</span>',
                        '<span class="comment"># Waiting for confirmation...</span>'
                    ];
                }
                return ['<span class="status warning">Sequence already active</span>'];
            }
        },

        'sudo confirm': {
            description: 'Confirm self-destruct (used during confirmation)',
            execute: () => {
                return ['<span class="comment"># Confirmation processed</span>'];
            }
        },

        'sudo abort': {
            description: 'Abort active self-destruct sequence',
            execute: () => {
                return ['<span class="comment"># Abort command processed</span>'];
            }
        },

        'sudo cancel': {
            description: 'Cancel self-destruct confirmation',
            execute: () => {
                return ['<span class="comment"># Cancel command processed</span>'];
            }
        },

        'sudo color-shift': {
            description: 'Cycle through color themes',
            execute: () => {
                // Rotate through color variations
                const root = document.documentElement;
                const currentHue = getComputedStyle(root).getPropertyValue('--ct-pink') || '#FF005C';

                // Simple hue rotation
                document.body.style.filter = `hue-rotate(${Math.random() * 360}deg)`;

                setTimeout(() => {
                    document.body.style.filter = 'none';
                }, 2000);

                return [
                    '<span class="ct-pink">✨ Color palette shifted!</span>',
                    '<span class="comment"># Reverting to default in 2 seconds...</span>'
                ];
            }
        },

        'sudo contact': {
            description: 'Navigate to contact section',
            execute: () => {
                if (window.navigation) {
                    window.navigation.navigateTo('contact');
                    return ['<span class="ct-pink">📧 Navigating to contact section...</span>'];
                }
                return ['<span class="status error">Error: Navigation system not found</span>'];
            }
        },

        'sudo clear': {
            description: 'Clear terminal output',
            execute: () => {
                if (this.output) {
                    this.output.innerHTML = '';
                    this.output.classList.add('hidden');
                }
                return null; // Don't print anything
            }
        },

        'reboot': {
            description: 'Force system reboot and restore to normal',
            execute: () => {
                // Force immediate rebuild if self-destruct is active
                if (window.selfDestruct && window.selfDestruct.isDestroying) {
                    // Stop any ongoing sequences
                    clearInterval(window.selfDestruct.countdownInterval);

                    // Clean up all visual effects
                    document.body.classList.remove('destruction-active', 'warning-active', 'pre-destruction', 'glitch-active');
                    document.body.style.animation = '';
                    document.body.style.filter = '';
                    document.documentElement.style.perspective = '';
                    document.body.style.transformStyle = '';

                    // Remove all effect elements
                    const effects = [
                        '.destruct-warning-overlay',
                        '.matrix-rain',
                        '.screen-crack',
                        '.digital-particle',
                        '.debris-3d',
                        '.vortex-effect',
                        '.total-blackout',
                        '.explosion-particle'
                    ];

                    effects.forEach(selector => {
                        document.querySelectorAll(selector).forEach(el => el.remove());
                    });

                    // Restore all elements
                    window.selfDestruct.destructionElements.forEach((el) => {
                        el.classList.remove('exploding', 'exploding-3d', 'rebuilding');
                        el.style.opacity = '';
                        el.style.transform = '';
                        el.style.transition = '';
                        el.style.transformStyle = '';
                    });

                    // Reset state
                    window.selfDestruct.isActive = false;
                    window.selfDestruct.isDestroying = false;

                    // Reset toggle
                    const toggle = document.getElementById('destruct-toggle');
                    if (toggle) toggle.checked = false;

                    // Reset status
                    const statusText = document.getElementById('destruct-status');
                    if (statusText) {
                        statusText.textContent = 'Standby';
                        statusText.classList.remove('active');
                    }

                    return [
                        '<span class="ct-success">🔄 SYSTEM REBOOT INITIATED</span>',
                        '<span class="ct-pink">✓ All systems restored to normal</span>',
                        '<span class="comment"># Destruction sequence terminated</span>',
                        '<span class="comment"># All effects cleared</span>',
                        '<span class="comment"># Site returned to operational state</span>',
                        '',
                        '<span class="ct-success">✓ REBOOT COMPLETE</span>'
                    ];
                } else {
                    // System is already normal
                    return [
                        '<span class="ct-pink">🔄 SYSTEM CHECK</span>',
                        '<span class="comment"># All systems operational</span>',
                        '<span class="ct-success">✓ No reboot needed</span>'
                    ];
                }
            }
        },

        'whoami': {
            description: 'Display current user',
            execute: () => {
                return [
                    '<span class="ct-pink">cyber-tamer</span>',
                    '',
                    '<span class="keyword">Role:</span> Security Engineer & Software Developer',
                    '<span class="keyword">Skills:</span> Penetration Testing, Distributed Systems, Linux',
                    '<span class="keyword">Status:</span> Online and ready to secure your systems'
                ];
            }
        },

        'ls': {
            description: 'List available sections',
            execute: () => {
                return [
                    '<span class="ct-pink">drwxr-xr-x</span>  cyber-tamer  /root/',
                    '',
                    '<span class="keyword">about_me.sh</span>',
                    '<span class="keyword">experience.log</span>',
                    '<span class="keyword">education.json</span>',
                    '<span class="keyword">projects/</span>',
                    '<span class="keyword">security_lab/</span>',
                    '<span class="keyword">self_destruct.exe</span>',
                    '<span class="keyword">contact.txt</span>'
                ];
            }
        }
    },

    init() {
        this.input = document.getElementById('terminal-input');
        this.output = document.getElementById('terminal-output');

        if (this.input) {
            this.input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const command = this.input.value.trim();
                    if (command) {
                        this.executeCommand(command);
                        this.commandHistory.push(command);
                        this.historyIndex = this.commandHistory.length;
                        this.input.value = '';
                    }
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (this.historyIndex > 0) {
                        this.historyIndex--;
                        this.input.value = this.commandHistory[this.historyIndex];
                    }
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (this.historyIndex < this.commandHistory.length - 1) {
                        this.historyIndex++;
                        this.input.value = this.commandHistory[this.historyIndex];
                    } else {
                        this.historyIndex = this.commandHistory.length;
                        this.input.value = '';
                    }
                }
            });
        }
    },

    executeCommand(commandStr) {
        // Show output container
        if (this.output) {
            this.output.classList.remove('hidden');
        }

        // Add command to output
        this.addOutput(`<span class="prompt-symbol">cyber-tamer@portfolio:~$</span> ${commandStr}`);

        // Check if command exists
        const cmd = this.commands[commandStr.toLowerCase()];

        if (cmd) {
            const result = cmd.execute();
            if (result) {
                result.forEach(line => {
                    this.addOutput(line);
                });
            }
        } else {
            // Command not found
            this.addOutput(`<span class="status error">bash: ${commandStr}: command not found</span>`);
            this.addOutput(`<span class="comment"># Type 'sudo help' to see available commands</span>`);
        }

        // Add spacing
        this.addOutput('');

        // Scroll to bottom
        this.output.scrollTop = this.output.scrollHeight;
    },

    addOutput(text) {
        if (this.output) {
            const line = document.createElement('div');
            line.className = 'output-line';
            line.innerHTML = text;
            this.output.appendChild(line);
        }
    }
};

// Export for use in main.js
window.terminal = terminal;
