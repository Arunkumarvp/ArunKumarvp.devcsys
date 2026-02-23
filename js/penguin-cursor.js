/**
 * Penguin Cursor Companion (Enhanced Fun Mode)
 * A cute Linux Tux penguin that follows the mouse cursor
 * Features: Waddle, Sleep, Talk, Jump, Backflip
 */
const penguinCursor = {
    element: null,
    bodyElement: null,
    speechElement: null,
    mouseX: 0,
    mouseY: 0,
    penguinX: 0,
    penguinY: 0,
    isMoving: false,
    isSleeping: false,
    moveTimeout: null,
    sleepTimeout: null,
    talkTimeout: null,
    isContextActive: false,
    speechTimeout: null,

    // Context-Aware Descriptions
    contextMap: {
        'about': "Here's my bio & skills! 👨‍💻",
        'experience': "My mission logs! 💼",
        'projects': "Cool stuff I built! 🚀",
        'contact': "Hiring? Email me! 📧",
        'destruct-toggle': "DO NOT TOUCH! ⚠️",
        'terminal-input': "Hack the planet? ⌨️",
        'resume-download-btn': "Grab my data! 📄"
    },

    // Fun Phrases
    phrases: [
        "I use Arch btw",
        "sudo make sandwich",
        "Nice click!",
        "Is there fish?",
        "rm -rf / ? No!",
        "Compiling...",
        "Penguin power!",
        "Open source ❤️",
        "Where is the terminal?",
        "Zzz...",
        "Linux rulez!"
    ],

    init() {
        this.createPenguin();

        // Initial position
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        this.penguinX = this.mouseX;
        this.penguinY = this.mouseY;

        // Mouse listeners
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mousedown', () => this.handleMouseDown());
        document.addEventListener('mouseup', () => this.handleMouseUp());
        document.addEventListener('dblclick', () => this.handleDoubleClick());

        // Add Context Listeners
        this.addContextListeners();

        // Hover listeners for interactive elements
        this.addHoverEffects();

        // Random chatter loop (only when not in a context)
        this.startChatter();

        // Start animation loop
        this.animate();

        // Start sleep timer
        this.resetSleepTimer();
    },

    createPenguin() {
        const div = document.createElement('div');
        div.className = 'penguin-companion';
        div.id = 'penguin-follower';

        // Use user provided 3D image
        const penguinImage = 'uploaded_media_1769452743389.png';

        div.innerHTML = `
            <div class="penguin-speech"></div>
            <div class="penguin-zzz">Zzz</div>
            <div class="penguin-body">
                <!-- User Provided 3D Penguin -->
                <img src="https://ik.imagekit.io/qbkraoafhm32/Arunkumar_portfolio/image-removebg-preview_2zIDmHV7Q.png" 
                     alt="Cute 3D Penguin" 
                     class="tux-3d-img"
                     style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 5px 15px rgba(0,0,0,0.5));">
            </div>
        `;

        document.body.appendChild(div);
        this.element = div;
        this.bodyElement = div.querySelector('.penguin-body');
        this.speechElement = div.querySelector('.penguin-speech');

        // Make the container slightly larger for the 3D details
        div.style.width = '70px'; // Bigger for more detail
        div.style.height = '70px';
    },

    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        // Wake up if sleeping
        if (this.isSleeping) {
            this.wakeUp();
        }

        this.resetSleepTimer();

        // Set moving state
        this.element.classList.add('moving');
        this.isMoving = true;

        if (this.moveTimeout) clearTimeout(this.moveTimeout);
        this.moveTimeout = setTimeout(() => {
            this.element.classList.remove('moving');
            this.isMoving = false;
        }, 100);

        // Face direction
        if (this.mouseX < this.penguinX) {
            this.element.style.transform = `translate(${this.penguinX}px, ${this.penguinY}px) scaleX(-1) translate(-50%, -50%)`;
            // Keep speech text correct orientation (not flipped)
            this.speechElement.style.transform = 'translateX(-50%) scaleX(-1)';
        } else {
            this.element.style.transform = `translate(${this.penguinX}px, ${this.penguinY}px) scaleX(1) translate(-50%, -50%)`;
            this.speechElement.style.transform = 'translateX(-50%) scaleX(1)';
        }
    },

    handleMouseDown() {
        this.element.classList.add('clicking');
        this.say("Squish!");
    },

    handleMouseUp() {
        this.element.classList.remove('clicking');
    },

    addContextListeners() {
        // Add hover listeners for specific sections
        for (const [id, text] of Object.entries(this.contextMap)) {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('mouseenter', () => {
                    this.isContextActive = true;
                    this.say(text, 3000); // Show for 3 seconds
                    this.jump(); // Jump when explaining!
                });

                el.addEventListener('mouseleave', () => {
                    this.isContextActive = false;
                });
            }
        }

        // Special case for self-destruct toggle wrapper
        const toggle = document.querySelector('.toggle-wrapper');
        if (toggle) {
            toggle.addEventListener('mouseenter', () => {
                this.isContextActive = true;
                this.say("DANGER! EXPLOSIVES! 🧨", 3000);
            });
            toggle.addEventListener('mouseleave', () => this.isContextActive = false);
        }
    },

    handleDoubleClick() {
        // Do a backflip!
        if (this.bodyElement.classList.contains('flipping')) return;

        this.bodyElement.classList.add('flipping');
        this.say("Weee!");

        setTimeout(() => {
            this.bodyElement.classList.remove('flipping');
        }, 600);
    },

    // Add hover listeners to clickable elements
    addHoverEffects() {
        const interactables = document.querySelectorAll('a, button, .toggle-switch, .stat-card');

        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => this.jump());
        });
    },

    jump() {
        if (this.bodyElement.classList.contains('jumping') || this.isSleeping) return;

        this.bodyElement.classList.add('jumping');
        setTimeout(() => {
            this.bodyElement.classList.remove('jumping');
        }, 500);
    },

    // Sleep Logic
    resetSleepTimer() {
        if (this.sleepTimeout) clearTimeout(this.sleepTimeout);
        // Sleep after 5 seconds of inactivity
        this.sleepTimeout = setTimeout(() => this.goToSleep(), 5000);
    },

    goToSleep() {
        if (this.isMoving) return;
        this.isSleeping = true;
        this.element.classList.add('sleeping');
    },

    wakeUp() {
        this.isSleeping = false;
        this.element.classList.remove('sleeping');
        this.say("I'm awake!");
    },

    // Chatter Logic
    startChatter() {
        const randomTime = Math.random() * 10000 + 5000; // 5-15 seconds

        this.talkTimeout = setTimeout(() => {
            // Only chat if we aren't currently explaining a section (context active)
            if (!this.isSleeping && !this.isContextActive) {
                const text = this.phrases[Math.floor(Math.random() * this.phrases.length)];
                this.say(text);
            }
            this.startChatter();
        }, randomTime);
    },

    say(text, duration = 2000) {
        if (!this.speechElement) return;

        this.speechElement.textContent = text;
        this.speechElement.classList.add('visible');

        // Clear existing timeout to prevent overlapping hides
        if (this.speechTimeout) clearTimeout(this.speechTimeout);

        this.speechTimeout = setTimeout(() => {
            this.speechElement.classList.remove('visible');
        }, duration);
    },

    animate() {
        const speed = 0.15;

        const dx = this.mouseX - this.penguinX;
        const dy = this.mouseY - this.penguinY;

        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
            this.penguinX += dx * speed;
            this.penguinY += dy * speed;

            const scaleX = (this.mouseX < this.penguinX) ? -1 : 1;

            this.element.style.left = '0px';
            this.element.style.top = '0px';
            this.element.style.transform = `translate(${this.penguinX}px, ${this.penguinY}px) scaleX(${scaleX}) translate(-50%, -50%)`;
        }

        requestAnimationFrame(() => this.animate());
    }
};

window.penguinCursor = penguinCursor;
