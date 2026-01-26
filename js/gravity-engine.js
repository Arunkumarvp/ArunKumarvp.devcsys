// Anti-Gravity Physics Engine
// Uses Matter.js to create physics-enabled UI elements

const gravityEngine = {
    engine: null,
    render: null,
    world: null,
    bodies: [],
    isActive: false,
    originalPositions: new Map(),
    mouse: null,
    mouseConstraint: null,

    init() {
        // Create Matter.js engine
        this.engine = Matter.Engine.create();
        this.world = this.engine.world;

        // Reduce gravity for a "floating in space" effect
        this.engine.world.gravity.y = 0.3;

        // Get toggle button
        const toggle = document.getElementById('gravity-toggle');
        if (toggle) {
            toggle.addEventListener('change', () => {
                if (toggle.checked) {
                    this.activate();
                } else {
                    this.deactivate();
                }
            });
        }
    },

    activate() {
        this.isActive = true;

        // Update status
        const statusText = document.getElementById('gravity-status');
        if (statusText) {
            statusText.textContent = 'Active';
            statusText.classList.remove('standby');
            statusText.classList.add('active');
        }

        // Get all elements with data-physics attribute
        const elements = document.querySelectorAll('[data-physics="true"]');

        elements.forEach(element => {
            this.convertToPhysicsBody(element);
        });

        // Create render inside main content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            const rect = mainContent.getBoundingClientRect();

            this.render = Matter.Render.create({
                element: document.body,
                engine: this.engine,
                options: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    wireframes: false,
                    background: 'transparent',
                    pixelRatio: window.devicePixelRatio
                }
            });

            // Position render canvas
            this.render.canvas.style.position = 'fixed';
            this.render.canvas.style.top = '0';
            this.render.canvas.style.left = '0';
            this.render.canvas.style.pointerEvents = 'none';
            this.render.canvas.style.zIndex = '9998';

            Matter.Render.run(this.render);
        }

        // Add mouse control
        this.addMouseControl();

        // Run the engine
        this.runner = Matter.Runner.create();
        Matter.Runner.run(this.runner, this.engine);

        // Add boundaries
        this.addBoundaries();

        // console.log('🚀 Anti-Gravity Engine Activated');
    },

    deactivate() {
        this.isActive = false;

        // Update status
        const statusText = document.getElementById('gravity-status');
        if (statusText) {
            statusText.textContent = 'Standby';
            statusText.classList.remove('active');
            statusText.classList.add('standby');
        }

        // Stop engine
        if (this.runner) {
            Matter.Runner.stop(this.runner);
        }

        // Remove render
        if (this.render) {
            Matter.Render.stop(this.render);
            if (this.render.canvas) {
                this.render.canvas.remove();
            }
            this.render = null;
        }

        // Clear world
        Matter.World.clear(this.world);
        Matter.Engine.clear(this.engine);

        // Restore original positions
        this.originalPositions.forEach((pos, element) => {
            element.style.position = pos.position;
            element.style.top = pos.top;
            element.style.left = pos.left;
            element.style.transform = pos.transform;
        });

        this.bodies = [];
        this.originalPositions.clear();

        // console.log('🛑 Anti-Gravity Engine Deactivated');
    },

    convertToPhysicsBody(element) {
        // Save original position and styling
        const computedStyle = window.getComputedStyle(element);
        this.originalPositions.set(element, {
            position: computedStyle.position,
            top: computedStyle.top,
            left: computedStyle.left,
            transform: computedStyle.transform
        });

        // Get element dimensions and position
        const rect = element.getBoundingClientRect();

        // Create physics body
        const body = Matter.Bodies.rectangle(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            rect.width,
            rect.height,
            {
                restitution: 0.6,
                friction: 0.1,
                density: 0.001,
                render: {
                    visible: false
                }
            }
        );

        // Add to world
        Matter.World.add(this.world, body);

        // Store reference
        this.bodies.push({ element, body });

        // Make element position fixed
        element.style.position = 'fixed';
        element.style.zIndex = '9999';

        // Sync element with physics body
        this.syncElementWithBody(element, body);
    },

    syncElementWithBody(element, body) {
        const updatePosition = () => {
            if (!this.isActive) return;

            const rect = element.getBoundingClientRect();
            element.style.left = (body.position.x - rect.width / 2) + 'px';
            element.style.top = (body.position.y - rect.height / 2) + 'px';
            element.style.transform = `rotate(${body.angle}rad)`;

            requestAnimationFrame(updatePosition);
        };

        updatePosition();
    },

    addBoundaries() {
        const wallOptions = {
            isStatic: true,
            render: { visible: false }
        };

        const walls = [
            // Floor
            Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, wallOptions),
            // Ceiling
            Matter.Bodies.rectangle(window.innerWidth / 2, -50, window.innerWidth, 100, wallOptions),
            // Left wall
            Matter.Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, wallOptions),
            // Right wall
            Matter.Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, wallOptions)
        ];

        Matter.World.add(this.world, walls);
    },

    addMouseControl() {
        // Create mouse
        this.mouse = Matter.Mouse.create(document.body);

        // Create mouse constraint
        this.mouseConstraint = Matter.MouseConstraint.create(this.engine, {
            mouse: this.mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

        Matter.World.add(this.world, this.mouseConstraint);

        // Allow scrolling when not dragging
        this.mouseConstraint.mouse.element.removeEventListener('mousewheel', this.mouseConstraint.mouse.mousewheel);
        this.mouseConstraint.mouse.element.removeEventListener('DOMMouseScroll', this.mouseConstraint.mouse.mousewheel);
    }
};

// Export for use in main.js
window.gravityEngine = gravityEngine;
