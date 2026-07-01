# 🎱 8 Ball Pool Game

A fully functional 8 Ball Pool game built with HTML5 Canvas and vanilla JavaScript. Play classic pool with realistic physics simulation and ball collision detection.

## Features

✨ **Realistic Physics**
- Friction and momentum simulation
- Elastic ball collisions
- Wall bouncing with energy loss

🎮 **Gameplay Mechanics**
- Cue and power control system
- Ball pocketing and scoring
- Solids vs Stripes assignment
- Scratch detection (cue ball pocketed)
- Win condition (pocket 8 ball last)

🎨 **Visual Design**
- Beautiful green felt table
- Numbered ball display
- Real-time statistics
- Pocket and cushion rendering
- Cue stick preview

## How to Play

1. **Start a Game**: Click "New Game" button to initialize the table
2. **Aim & Shoot**: 
   - Click on the white cue ball
   - Drag backward to set angle and power
   - Release to shoot
3. **Game Rules**:
   - Pocket your assigned balls (solids or stripes) first
   - Pocket the 8 ball last to win
   - If you pocket the cue ball (scratch), your turn ends
   - Choose your ball type on first pocket

4. **Controls**:
   - **New Game**: Start a fresh game
   - **Reset Table**: Return cue ball to starting position and clear velocities

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mohammedabduljunaid/My-first-code.git
cd My-first-code/8-ball-pool
```

2. Open `index.html` in your web browser

That's it! No build process or dependencies required.

## Files

- `index.html` - Game HTML structure
- `style.css` - Styling and layout
- `game.js` - Game logic, physics, and rendering
- `README.md` - This file

## Game Statistics

Track your performance with real-time stats:
- **Player Type**: Shows if you're playing solids or stripes
- **Balls Pocketed**: Count of successfully pocketed balls
- **Shots**: Number of times you've shot the cue ball

## Technologies

- **HTML5** - Game structure
- **CSS3** - Styling and responsiveness
- **JavaScript (Vanilla)** - Game engine and physics

## Physics Implementation

### Friction
Balls gradually slow down using a friction coefficient applied each frame.

### Collision Detection
- **Ball-to-Ball**: Distance-based collision with velocity exchange
- **Ball-to-Wall**: Boundary detection with velocity reversal

### Pocketing
Balls automatically disappear when they reach a pocket radius threshold.

## Future Enhancements

- Multiplayer mode (2-player local)
- AI opponent
- Sound effects
- Power meter UI
- Break shot mechanics
- Advanced shot angles and bank shots
- Leaderboard system
- Mobile touch controls

## Browser Compatibility

Works on all modern browsers that support:
- HTML5 Canvas
- ES6 JavaScript
- CSS3 Flexbox

## License

Open source - feel free to modify and enhance!

## Contributing

Want to improve the game? Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Enjoy! 🎱