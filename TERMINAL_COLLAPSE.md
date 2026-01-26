# Terminal Collapse Feature

## 🎯 Hide & Show Terminal with Arrow Button!

Your terminal now has a **collapsible arrow button** that lets you hide and show it with smooth animations!

---

## 📍 Where to Find It

Look for the **pink gradient button** with an arrow (▼) located:
- **Above the terminal** (top-right area)
- **Just to the right** of the terminal input

---

## 🎮 How to Use

### **Method 1: Click the Arrow Button**
1. Click the **▼** button
2. Terminal **slides down** and hides
3. Arrow rotates to **▲**
4. Click again to expand
5. Terminal **slides back up**

### **Method 2: Keyboard Shortcut**
- Press **`Ctrl + ` `** (Windows/Linux)
- Press **`Cmd + ` `** (Mac)
- Terminal toggles instantly!

---

## ✨ Visual Effects

### **When Collapsed:**
- Terminal slides down
- Only small portion visible (40px)
- Arrow rotates **180°** (points up ▲)
- You can see the arrow tab peeking up

### **When Expanded:**
- Terminal slides up smoothly
- Full terminal visible
- Arrow points down (▼)
- Terminal input auto-focuses

### **Button Hover:**
- Gradient color shift
- Glowing shadow (pink)
- Slight lift animation
- Smooth transitions

---

## 🎨 Design Details

**Arrow Button:**
- **Width**: 60px
- **Height**: 30px
- **Position**: Top of terminal, right side
- **Colors**: Pink → Magenta gradient
- **Border**: Pink neon glow
- **Shape**: Rounded top corners

**Animation:**
- **Duration**: 0.3 seconds
- **Easing**: Smooth ease function
- **Transform**: translateY animation
- **Arrow rotation**: 180° flip

---

## 💡 Use Cases

### **1. More Screen Space**
- Hide terminal when not using it
- Get more room to view portfolio content
- Cleaner interface

### **2. Focus Mode**
- Hide terminal to reduce distractions
- Focus on reading content
- Expand when you need commands

### **3. Presentations**
- Show portfolio cleanly
- Expand terminal for demos
- Quick toggle for effect

### **4. Mobile**
- Save vertical space on phones
- Show terminal only when needed
- Better mobile experience

---

## ⌨️ Keyboard Shortcut

**`Ctrl + ` `** (or `Cmd + ` ` on Mac)

The backtick key is usually located:
- Top-left of keyboard
- Below the Escape key
- Left of the number 1 key

---

## 🔧 Technical Details

### **States:**
- **Expanded** (default): `transform: translateY(0)`
- **Collapsed**: `transform: translateY(calc(100% - 40px))`

### **Classes:**
- `.command-terminal` - Main container
- `.collapsed` - Added when hidden
- `.terminal-toggle` - Arrow button
- `.arrow-icon` - The arrow symbol

### **JavaScript API:**
```javascript
// Programmatically control terminal
window.terminalCollapse.show();  // Expand terminal
window.terminalCollapse.hide();  // Collapse terminal
window.terminalCollapse.toggle(); // Toggle state
```

---

## 📱 Mobile Optimization

The arrow button is fully responsive:
- Touch-friendly size (60x60px effective)
- Smooth animations on mobile
- Works on all screen sizes
- No lag on touch devices

---

## 🎯 Auto-Focus Behavior

**When Expanding:**
- Terminal input automatically focuses
- Cursor appears in input field
- Ready to type immediately

**When Collapsing:**
- Terminal input loses focus
- Keyboard dismisses on mobile
- Clean collapsed state

---

## 🌟 Visual Guide

```
┌────────────────────────────────────┐
│                         [▼ Button] │ ← Click to collapse
│ cyber-tamer@portfolio:~$ _______  │
│ [Terminal output here]             │
└────────────────────────────────────┘

              ↓ CLICK ↓

┌────────────────────────────────────┐
│                         [▲ Button] │ ← Click to expand
└────────────────────────────────────┘
   (Terminal hidden below, only 40px visible)
```

---

## 💫 Smooth Animations

All transitions are **0.3 seconds** with **ease** timing:
- Terminal slide up/down
- Arrow rotation
- Button hover effects
- Focus transitions

**No janky animations - smooth as butter!** ✨

---

## 🎨 Color Scheme

**Button Colors:**
- **Default**: Pink → Magenta gradient
- **Hover**: Magenta → Pink gradient (reversed!)
- **Glow**: Pink shadow (0.3-0.5 opacity)
- **Border**: Neon pink

**Arrow:**
- **Color**: White
- **Font**: Bold
- **Size**: 1rem

---

## 🚀 Performance

- **GPU-accelerated** transforms
- **No layout reflow** (uses transform)
- **Smooth 60 FPS** animations
- **Lightweight** (< 50 lines of code)

---

## 🎯 Benefits

✅ **Better UX** - Hide when not needed  
✅ **More space** - Cleaner interface  
✅ **Smooth animations** - Professional feel  
✅ **Keyboard shortcut** - Power user friendly  
✅ **Mobile optimized** - Works everywhere  
✅ **Auto-focus** - Smart behavior  
✅ **Visual feedback** - Hover & active states  

---

## 🎮 Try It Now!

1. Look for the **pink button** with ▼ arrow above terminal
2. **Click it** - Watch terminal slide down
3. **Click again** - Watch it slide back up
4. Try the **keyboard shortcut** - `Ctrl + ` `
5. Enjoy your **collapsible terminal!** 🎉

**Your terminal is now fully interactive with smooth hide/show animations!** ✨

---

**Pro Tip:** Use the keyboard shortcut (`Ctrl + ` `) for instant toggling while typing!
