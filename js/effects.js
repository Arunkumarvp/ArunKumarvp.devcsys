// Visual Effects
// Glitch effects, animations, and other visual enhancements

const effects = {
    init() {
        this.initGlitchEffect();
        this.initTypingEffect();
        this.initScrollAnimations();
    },

    initGlitchEffect() {
        // Glitch effect already handled by CSS
        // Add occasional random glitches
        const glitchElements = document.querySelectorAll('.glitch');

        glitchElements.forEach(element => {
            setInterval(() => {
                if (Math.random() > 0.95) { // 5% chance every interval
                    element.style.animation = 'none';
                    setTimeout(() => {
                        element.style.animation = '';
                    }, 100);
                }
            }, 3000);
        });
    },

    initTypingEffect() {
        // Optional: Could add typing animation to certain elements
        // For now, content displays immediately
    },

    initScrollAnimations() {
        // Add intersection observer for fade-in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe project cards
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
    },

    createParticle(x, y) {
        // Create a particle effect at given coordinates
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'var(--ct-pink)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10000';

        document.body.appendChild(particle);

        // Animate
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 5 + 2;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        let posX = x;
        let posY = y;
        let opacity = 1;

        const animate = () => {
            posX += vx;
            posY += vy;
            opacity -= 0.02;

            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };

        animate();
    },

    addClickEffect() {
        // Add particle effects on clicks
        document.addEventListener('click', (e) => {
            // Create multiple particles
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    this.createParticle(e.clientX, e.clientY);
                }, i * 20);
            }
        });
    }
};

// Export for use in main.js
window.effects = effects;
