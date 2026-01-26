# 🐧 Fun Penguin Companion Grid

## 🎮 Controls & Interactions

Your penguin friend is now super interactive! Here's what he can do:

### Basic Movement
- **Follows Mouse**: Waddles after your cursor.
- **Faces Direction**: Flips left/right based on movement.

### Special Actions
- **Double Click**: Do a **Backflip!** ("Weee!") 🤸
- **Mouse Down**: Squish animation ("Squish!").
- **Hover Links/Buttons**: Jumps excitedly.

### Passive Behaviors
- **Chatter**: Randomly says Linux/Tech phrases every 5-15 seconds.
  - "I use Arch btw"
  - "sudo make sandwich"
  - "Is there fish?"
- **Sleep Mode**: After 5 seconds of no movement, he falls asleep (Zzz...).
- **Wake Up**: Move the mouse to wake him up ("I'm awake!").

## 🎨 Customization (For Devs)

### Edit Phrases
Modify `penguinCursor.phrases` array in `js/penguin-cursor.js`.

### Adjust Speed
Change `const speed = 0.15` in `animate()` method.

### Adjust Sleep Time
Change `5000` (5 seconds) in `resetSleepTimer()`.

---

Have fun with your new Linux buddy! 🐧
