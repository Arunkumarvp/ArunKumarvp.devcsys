// GitHub-style Commit Heatmap
// Generates a visual representation of coding activity

const heatmap = {
    container: null,

    init() {
        this.container = document.getElementById('commit-heatmap');
        if (this.container) {
            this.generate();
        }
    },

    generate() {
        // Generate 365 days of data (53 weeks)
        const days = 365;
        const data = this.generateData(days);

        // Create cells
        data.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.className = 'heatmap-cell';
            cell.classList.add(`level-${this.getLevel(value)}`);
            cell.setAttribute('data-value', value);
            cell.setAttribute('data-date', this.getDateForIndex(index));

            // Add tooltip on hover
            cell.addEventListener('mouseenter', (e) => {
                this.showTooltip(e, value, index);
            });

            cell.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });

            this.container.appendChild(cell);
        });
    },

    generateData(days) {
        // Generate semi-realistic commit data
        const data = [];
        for (let i = 0; i < days; i++) {
            // Higher activity during weekdays
            const dayOfWeek = (i % 7);
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

            // Random with weighted distribution
            let commits = 0;
            const rand = Math.random();

            if (isWeekend) {
                // Less activity on weekends
                if (rand > 0.7) commits = Math.floor(Math.random() * 5);
            } else {
                // More activity on weekdays
                if (rand > 0.3) commits = Math.floor(Math.random() * 15);
            }

            data.push(commits);
        }
        return data;
    },

    getLevel(value) {
        // Map commit count to intensity level (0-4)
        if (value === 0) return 0;
        if (value <= 3) return 1;
        if (value <= 6) return 2;
        if (value <= 9) return 3;
        return 4;
    },

    getDateForIndex(index) {
        // Calculate date based on index (going backwards from today)
        const today = new Date();
        const date = new Date(today);
        date.setDate(date.getDate() - (364 - index));
        return date.toLocaleDateString();
    },

    showTooltip(event, commits, index) {
        // Create or update tooltip
        let tooltip = document.getElementById('heatmap-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'heatmap-tooltip';
            tooltip.style.position = 'fixed';
            tooltip.style.background = 'var(--ct-indigo)';
            tooltip.style.border = '1px solid var(--ct-pink)';
            tooltip.style.borderRadius = 'var(--radius-sm)';
            tooltip.style.padding = 'var(--spacing-sm) var(--spacing-md)';
            tooltip.style.fontSize = '0.85rem';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.zIndex = '10001';
            tooltip.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.5)';
            document.body.appendChild(tooltip);
        }

        const date = this.getDateForIndex(index);
        tooltip.innerHTML = `<strong>${commits}</strong> commits on ${date}`;
        tooltip.style.left = (event.clientX + 10) + 'px';
        tooltip.style.top = (event.clientY + 10) + 'px';
        tooltip.style.display = 'block';
    },

    hideTooltip() {
        const tooltip = document.getElementById('heatmap-tooltip');
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }
};

// Export for use in main.js
window.heatmap = heatmap;
