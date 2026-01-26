# Cyber-Tamer Portfolio Website

A cyberpunk-themed portfolio website with a Linux terminal aesthetic and interactive anti-gravity physics engine. Built with vanilla HTML, CSS, and JavaScript for easy deployment on GitHub Pages.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## 🎨 Features

### Core Functionality
- **Linux Terminal Theme** - Authentic terminal experience with file tree navigation
- **Boot Sequence Animation** - Realistic system startup simulation
- **Anti-Gravity Physics Engine** - Toggle physics on all UI elements using Matter.js
- **Interactive Command Terminal** - Execute sudo commands like a real terminal
- **Cyberpunk Aesthetics** - "Hard Truth" color palette with glitch effects
- **GitHub-style Heatmap** - Visual representation of coding activity
- **Fully Responsive** - Works on desktop, tablet, and mobile devices

### Interactive Features
- **File Tree Navigation** - Click through sections like a file system
- **Physics Mode** - Drag and throw UI elements when anti-gravity is enabled
- **Terminal Commands**:
  - `sudo help` - Display available commands
  - `sudo gravity` - Toggle anti-gravity engine
  - `sudo color-shift` - Cycle through color themes
  - `sudo contact` - Jump to contact section
  - `sudo clear` - Clear terminal output
  - `whoami` - Display user information
  - `ls` - List available sections

### Visual Effects
- Glitch animations on headings
- Glassmorphism UI elements
- Scanline overlay effect
- Smooth transitions and hover effects
- Particle effects (optional)
- Easter egg: Konami code activation

## 🎨 Color Palette

The "Hard Truth" cyberpunk color scheme:

| Color | Hex Code | Usage |
|-------|----------|-------|
| Midnight Black | `#03001C` | Main background |
| Deep Indigo | `#0B0133` | Terminal surfaces |
| Royal Purple | `#3B015A` | Secondary accents |
| Dark Magenta | `#71015B` | Interactive elements |
| Neon Pink | `#FF005C` | Primary highlights |

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cyber-tamer-portfolio.git
   cd cyber-tamer-portfolio
   ```

2. **Start a local server**
   
   Using Python 3:
   ```bash
   python3 -m http.server 8000
   ```
   
   Or using PHP:
   ```bash
   php -S localhost:8000
   ```
   
   Or using Node.js (with http-server):
   ```bash
   npx http-server -p 8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### GitHub Pages Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Select source: `main` branch, `/ (root)` folder
   - Click Save

3. **Access your site**
   ```
   https://yourusername.github.io/cyber-tamer-portfolio
   ```

## 📁 Project Structure

```
cyber-tamer-portfolio/
├── index.html              # Main HTML structure
├── styles.css              # Complete styling with cyberpunk theme
├── js/
│   ├── boot-sequence.js    # Terminal boot animation
│   ├── navigation.js       # File tree navigation system
│   ├── gravity-engine.js   # Matter.js physics engine
│   ├── terminal.js         # Command terminal system
│   ├── effects.js          # Visual effects and animations
│   ├── heatmap.js          # GitHub-style commit heatmap
│   └── main.js             # Application entry point
└── README.md               # This file
```

## 🎮 Keyboard Shortcuts

- **Ctrl/Cmd + G** - Toggle anti-gravity engine
- **Ctrl/Cmd + K** - Focus terminal input
- **Escape** - Clear focus
- **↑/↓ Arrows** - Navigate terminal command history
- **Konami Code** - Activate easter egg 🎉

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, animations, glassmorphism
- **JavaScript (ES6+)** - Modular architecture
- **Matter.js** - 2D physics engine (via CDN)
- **Google Fonts** - JetBrains Mono, Inter

## 📝 Customization

### Update Content

Edit `index.html` to customize:
- Personal information in the About section
- Project cards and descriptions
- Security incident logs
- Contact information

### Change Colors

Modify CSS custom properties in `styles.css`:
```css
:root {
    --ct-black: #03001C;
    --ct-indigo: #0B0133;
    --ct-purple: #3B015A;
    --ct-magenta: #71015B;
    --ct-pink: #FF005C;
}
```

### Add New Terminal Commands

Edit `js/terminal.js` and add to the `commands` object:
```javascript
'your-command': {
    description: 'Command description',
    execute: () => {
        return ['Output line 1', 'Output line 2'];
    }
}
```

## 🔧 Browser Compatibility

- ✅ Chrome/Chromium (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ IE11 (Not supported - modern ES6 features used)

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints at:
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

## 🐛 Known Issues

- Physics engine may have performance issues on older devices
- Mobile responsiveness in physics mode may vary by device

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🙏 Credits

- **Matter.js** - Physics engine by Liam Brummitt
- **Google Fonts** - JetBrains Mono & Inter typefaces
- **Design Inspiration** - Cyberpunk 2077, Terminal UIs, Hacker aesthetics

## 📧 Contact

- **Email**: cyber.tamer@example.com
- **GitHub**: [@cybertamer](https://github.com/cybertamer)
- **LinkedIn**: [linkedin.com/in/cybertamer](https://linkedin.com/in/cybertamer)

---

**Built with ❤️ and ☕ by Cyber-Tamer**

*"Taming chaotic systems, one line of code at a time."*
