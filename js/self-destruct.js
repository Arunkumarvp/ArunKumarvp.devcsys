// Self-Destruct Sequence Module
// Dramatic destruction and reconstruction animation for Cyber-Tamer Portfolio

const selfDestruct = {
    isActive: false,
    isDestroying: false,
    countdown: 10,
    countdownInterval: null,
    destructionElements: [],

    init() {
        const toggle = document.getElementById('destruct-toggle');
        if (toggle) {
            toggle.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.activate(); // Start immediately!
                } else if (!this.isDestroying) {
                    // Allow manual toggle off only if not actively destroying
                    this.cancel();
                }
            });
        }
    },

    cancel() {
        const toggle = document.getElementById('destruct-toggle');
        if (toggle) toggle.checked = false;

        if (window.terminal) {
            terminal.addOutput('<span class="ct-success">✓ Self-destruct system disarmed</span>');
            terminal.output.classList.remove('hidden');
        }
    },

    activate() {
        if (this.isDestroying) return;

        this.isActive = true;
        this.isDestroying = true;
        this.countdown = 10;

        // Update status
        const statusText = document.getElementById('destruct-status');
        if (statusText) {
            statusText.textContent = 'ARMED';
            statusText.classList.add('active');
        }

        // Add immediate dramatic effects
        document.body.classList.add('pre-destruction');

        // Show dramatic warning
        this.showWarning();

        // Add glitch effect to entire site
        setTimeout(() => this.addGlitchEffect(), 100);
        setTimeout(() => this.addColorDistortion(), 500);
        setTimeout(() => this.addCrackEffect(), 1000);

        // Start countdown after effects
        setTimeout(() => {
            this.startCountdown();
            this.addWarningEffects();
        }, 1500);
    },

    showWarning() {
        if (window.terminal) {
            terminal.addOutput('<span class="status critical">🚨 SELF-DESTRUCT ACTIVATED</span>');
            terminal.addOutput('<span class="ct-pink">System termination in progress...</span>');
            terminal.addOutput('<span class="comment"># All systems compromised</span>');
            terminal.output.classList.remove('hidden');
        }

        // Create fullscreen warning overlay with enhanced effects
        const overlay = document.createElement('div');
        overlay.className = 'destruct-warning-overlay';
        overlay.innerHTML = `
            <div class="destruct-warning">
                <h1 class="glitch destruct-title" data-text="⚠️ CRITICAL SYSTEM FAILURE ⚠️">⚠️ CRITICAL SYSTEM FAILURE ⚠️</h1>
                <div class="countdown-display">
                    <span id="countdown-number">10</span>
                </div>
                <p class="destruct-message">SELF-DESTRUCT SEQUENCE ACTIVE</p>
                <div class="warning-bars">
                    <div class="warning-bar"></div>
                    <div class="warning-bar"></div>
                    <div class="warning-bar"></div>
                </div>
                <p class="destruct-abort">SYSTEM FAILURE IMMINENT</p>
            </div>
        `;
        document.body.appendChild(overlay);

        // Fade in overlay with shake
        setTimeout(() => {
            overlay.classList.add('active');
            document.body.style.animation = 'shake 0.5s ease infinite';
        }, 10);
    },

    addGlitchEffect() {
        document.body.classList.add('glitch-active');
        setTimeout(() => {
            document.body.classList.remove('glitch-active');
        }, 2000);
    },

    addColorDistortion() {
        document.body.style.filter = 'hue-rotate(180deg) saturate(200%)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 1000);
    },

    addCrackEffect() {
        const crack = document.createElement('div');
        crack.className = 'screen-crack';
        document.body.appendChild(crack);
        setTimeout(() => crack.classList.add('active'), 10);
    },

    startCountdown() {
        const countdownDisplay = document.getElementById('countdown-number');

        this.countdownInterval = setInterval(() => {
            this.countdown--;

            if (countdownDisplay) {
                countdownDisplay.textContent = this.countdown;

                // Pulse effect
                countdownDisplay.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    countdownDisplay.style.transform = 'scale(1)';
                }, 100);
            }

            // Terminal countdown
            if (window.terminal) {
                terminal.addOutput(`<span class="ct-pink">[${this.countdown}] Countdown active...</span>`);
                terminal.output.scrollTop = terminal.output.scrollHeight;
            }

            // Warning sounds (visual feedback)
            this.flashScreen();

            if (this.countdown <= 0) {
                clearInterval(this.countdownInterval);
                this.destroy();
            }
        }, 1000);

        // Listen for abort command
        this.listenForAbort();
    },

    listenForAbort() {
        const terminalInput = document.getElementById('terminal-input');
        if (!terminalInput) return;

        const abortHandler = (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim().toLowerCase();
                if (command === 'sudo abort') {
                    this.abort();
                    terminalInput.removeEventListener('keydown', abortHandler);
                }
            }
        };

        terminalInput.addEventListener('keydown', abortHandler);
    },

    abort() {
        clearInterval(this.countdownInterval);
        this.isDestroying = false;
        this.isActive = false;

        // Remove overlay
        const overlay = document.querySelector('.destruct-warning-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 500);
        }

        // Remove effects
        document.body.classList.remove('warning-active', 'destruction-active');

        // Update toggle
        const toggle = document.getElementById('destruct-toggle');
        if (toggle) toggle.checked = false;

        // Terminal feedback
        if (window.terminal) {
            terminal.addOutput('<span class="ct-success">✓ SEQUENCE ABORTED</span>');
            terminal.addOutput('<span class="comment"># Crisis averted</span>');
            terminal.output.classList.remove('hidden');
        }
    },

    flashScreen() {
        document.body.style.backgroundColor = this.countdown % 2 === 0 ? '#FF005C' : '#03001C';
        setTimeout(() => {
            document.body.style.backgroundColor = '';
        }, 100);
    },

    addWarningEffects() {
        document.body.classList.add('warning-active');
    },

    destroy() {
        document.body.classList.add('destruction-active');

        if (window.terminal) {
            terminal.addOutput('<span class="status critical">💥 DETONATION</span>');
            terminal.output.classList.remove('hidden');
        }

        // Remove warning overlay
        const overlay = document.querySelector('.destruct-warning-overlay');
        if (overlay) overlay.remove();

        // Add 3D perspective to body
        document.documentElement.style.perspective = '1000px';
        document.body.style.transformStyle = 'preserve-3d';

        // Add matrix rain effect
        this.createMatrixRain();

        // Add digital particle system
        this.createDigitalParticles();

        // Collect all destructible elements
        this.destructionElements = Array.from(document.querySelectorAll('.terminal-window, .sidebar, .project-card, .badge, .experience-entry'));

        // Add 3D depth to elements before destruction
        this.destructionElements.forEach((el) => {
            el.style.transformStyle = 'preserve-3d';
            el.style.transition = 'all 0.5s ease-out';
        });

        // Destroy elements sequentially with 3D effects
        this.destructionElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('exploding-3d');

                // Create 3D explosion effect
                this.createExplosion(el);
                this.create3DDebris(el);

                setTimeout(() => {
                    el.style.opacity = '0';
                    el.style.transform = `
                        scale(0) 
                        rotateX(${Math.random() * 720}deg) 
                        rotateY(${Math.random() * 720}deg) 
                        rotateZ(${Math.random() * 720}deg)
                        translateZ(-500px)
                    `;
                }, 300);
            }, index * 100);
        });

        // Screen vortex implosion
        setTimeout(() => {
            this.vortexImplosion();
        }, this.destructionElements.length * 100 + 1000);

        // Final explosion
        setTimeout(() => {
            this.finalExplosion();
        }, this.destructionElements.length * 100 + 2000);

        // Complete blackout
        setTimeout(() => {
            this.totalBlackout();
        }, this.destructionElements.length * 100 + 3000);

        // Rebuild after blackout
        setTimeout(() => {
            this.rebuild();
        }, this.destructionElements.length * 100 + 6000);
    },

    createMatrixRain() {
        const matrixContainer = document.createElement('div');
        matrixContainer.className = 'matrix-rain';
        matrixContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9998;
            overflow: hidden;
        `;

        // Create falling code columns
        for (let i = 0; i < 30; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.cssText = `
                position: absolute;
                top: -100%;
                left: ${Math.random() * 100}%;
                width: 20px;
                height: 100%;
                color: var(--ct-pink);
                font-family: var(--font-mono);
                font-size: 12px;
                line-height: 20px;
                animation: matrix-fall ${3 + Math.random() * 3}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
                text-shadow: 0 0 5px var(--ct-pink);
                opacity: 0.7;
            `;
            column.textContent = this.generateMatrixText();
            matrixContainer.appendChild(column);
        }

        document.body.appendChild(matrixContainer);

        setTimeout(() => matrixContainer.remove(), 8000);
    },

    generateMatrixText() {
        const chars = '01アイウエオカキクケコサシスセソ';
        let text = '';
        for (let i = 0; i < 50; i++) {
            text += chars[Math.floor(Math.random() * chars.length)] + '\n';
        }
        return text;
    },

    createDigitalParticles() {
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'digital-particle';
                particle.style.cssText = `
                    position: fixed;
                    width: 4px;
                    height: 4px;
                    background: var(--ct-pink);
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    pointer-events: none;
                    z-index: 9999;
                    box-shadow: 0 0 10px var(--ct-pink);
                    animation: digital-float ${2 + Math.random() * 3}s ease-out forwards;
                `;
                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 5000);
            }, i * 50);
        }
    },

    create3DDebris(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Create 3D debris pieces
        for (let i = 0; i < 15; i++) {
            const debris = document.createElement('div');
            debris.className = 'debris-3d';
            debris.style.cssText = `
                position: fixed;
                width: ${20 + Math.random() * 30}px;
                height: ${20 + Math.random() * 30}px;
                background: linear-gradient(135deg, var(--ct-pink), var(--ct-magenta));
                left: ${centerX}px;
                top: ${centerY}px;
                pointer-events: none;
                z-index: 10000;
                transform-style: preserve-3d;
                border: 1px solid var(--ct-pink);
            `;

            const angle = (Math.PI * 2 * i) / 15;
            const velocity = 150 + Math.random() * 150;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            const tz = -200 + Math.random() * 400;
            const rx = Math.random() * 720;
            const ry = Math.random() * 720;
            const rz = Math.random() * 720;

            debris.style.setProperty('--tx', tx + 'px');
            debris.style.setProperty('--ty', ty + 'px');
            debris.style.setProperty('--tz', tz + 'px');
            debris.style.setProperty('--rx', rx + 'deg');
            debris.style.setProperty('--ry', ry + 'deg');
            debris.style.setProperty('--rz', rz + 'deg');

            debris.style.animation = 'debris-3d-explode 1.5s ease-out forwards';

            document.body.appendChild(debris);
            setTimeout(() => debris.remove(), 1500);
        }
    },

    vortexImplosion() {
        const vortex = document.createElement('div');
        vortex.className = 'vortex-effect';
        vortex.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            margin: -50px 0 0 -50px;
            border-radius: 50%;
            border: 3px solid var(--ct-pink);
            box-shadow: 
                0 0 20px var(--ct-pink),
                inset 0 0 20px var(--ct-pink);
            z-index: 10001;
            animation: vortex-expand 2s ease-out forwards;
            pointer-events: none;
        `;
        document.body.appendChild(vortex);

        // Add rotating spirals
        for (let i = 0; i < 5; i++) {
            const spiral = document.createElement('div');
            spiral.className = 'spiral-ring';
            spiral.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: ${100 + i * 50}px;
                height: ${100 + i * 50}px;
                margin-left: ${-50 - i * 25}px;
                margin-top: ${-50 - i * 25}px;
                border-radius: 50%;
                border: 2px solid var(--ct-magenta);
                animation: spiral-rotate ${2 + i * 0.5}s linear infinite;
                opacity: ${0.8 - i * 0.15};
            `;
            vortex.appendChild(spiral);
        }

        setTimeout(() => vortex.remove(), 2000);
    },

    totalBlackout() {
        // Remove all visual effects
        document.body.classList.remove('destruction-active', 'warning-active', 'pre-destruction', 'glitch-active');

        // Clean up effects
        const matrixRain = document.querySelector('.matrix-rain');
        const screenCrack = document.querySelector('.screen-crack');
        if (matrixRain) matrixRain.remove();
        if (screenCrack) screenCrack.remove();

        // Create complete blackout
        const blackout = document.createElement('div');
        blackout.className = 'total-blackout';
        blackout.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            z-index: 10002;
            animation: blackout-fade 1s ease-in forwards;
        `;
        document.body.appendChild(blackout);

        // Add terminal-style reboot message
        setTimeout(() => {
            const rebootMsg = document.createElement('div');
            rebootMsg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: var(--ct-success);
                font-family: var(--font-mono);
                font-size: 1.5rem;
                z-index: 10003;
                text-align: center;
                animation: blink 1s ease-in-out infinite;
            `;
            rebootMsg.innerHTML = `
                <div>SYSTEM REBOOTING...</div>
                <div style="margin-top: 20px; font-size: 1rem;">[█████░░░░░] 50%</div>
            `;
            document.body.appendChild(rebootMsg);

            setTimeout(() => rebootMsg.remove(), 2500);
        }, 500);

        // Remove blackout before rebuild
        setTimeout(() => blackout.remove(), 3000);
    },

    createExplosion(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Create particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'explosion-particle';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';

            const angle = (Math.PI * 2 * i) / 20;
            const velocity = 100 + Math.random() * 100;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');

            document.body.appendChild(particle);

            setTimeout(() => particle.remove(), 1000);
        }
    },

    finalExplosion() {
        // White flash
        const flash = document.createElement('div');
        flash.className = 'final-flash';
        document.body.appendChild(flash);

        setTimeout(() => flash.remove(), 500);

        // Shake screen
        document.body.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
    },

    rebuild() {
        if (window.terminal) {
            terminal.addOutput('<span class="ct-pink">🔧 System Rebuild Initiated...</span>');
            terminal.addOutput('<span class="comment"># Restoring components...</span>');
            terminal.output.classList.remove('hidden');
        }

        // Remove destruction class
        document.body.classList.remove('destruction-active', 'warning-active');

        // Restore elements
        this.destructionElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.remove('exploding');
                el.style.opacity = '';
                el.style.transform = '';
                el.classList.add('rebuilding');

                setTimeout(() => {
                    el.classList.remove('rebuilding');
                }, 500);
            }, index * 50);
        });

        // Reset toggle
        setTimeout(() => {
            const toggle = document.getElementById('destruct-toggle');
            if (toggle) toggle.checked = false;

            this.isActive = false;
            this.isDestroying = false;

            if (window.terminal) {
                terminal.addOutput('<span class="ct-success">✓ System Restored</span>');
                terminal.addOutput('<span class="comment"># All systems operational</span>');
                terminal.output.classList.remove('hidden');
            }
        }, this.destructionElements.length * 50 + 500);
    }
};

// Export for use in other modules
window.selfDestruct = selfDestruct;
