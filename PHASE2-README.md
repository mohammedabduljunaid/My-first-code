# Phase 2: Multiplayer Web Game

## Overview
A real-time multiplayer 8 Ball Pool game with Firebase backend, matchmaking, and social features.

## Tech Stack
- **Frontend**: React + TypeScript
- **Backend**: Node.js + Express
- **Database**: Firebase Firestore + Realtime Database
- **Auth**: Firebase Authentication
- **Real-time**: WebSockets + Socket.io
- **Hosting**: Firebase Hosting

## Features

### Core Gameplay
- Real-time multiplayer matches
- Turn-based shooting system
- Live ball physics synchronization
- Lag compensation
- Spectator mode

### Matchmaking
- Skill-based matchmaking
- Ranked system
- Casual quick matches
- Private room creation

### Social
- Player profiles
- Friends list
- Chat system (global, room, private)
- Presence indicators
- Leaderboards

### Account System
- Firebase Auth (Google, Facebook, Email)
- Player profiles
- Statistics tracking
- Achievement system
- Reward history

## Project Structure

```
phase-2-multiplayer-web/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── GameBoard.tsx
│   │   │   ├── Matchmaking.tsx
│   │   │   ├── Chat.tsx
│   │   │   └── Profile.tsx
│   │   ├── services/
│   │   │   ├── firebase.ts
│   │   │   ├── socketService.ts
│   │   │   └── gameService.ts
│   │   ├── pages/
│   │   └── App.tsx
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── server.ts
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   └���─ middleware/
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
```bash
node >= 16
npm >= 8
firebase cli
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Add Firebase credentials to .env
npm start
```

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Add Firebase service account key
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Game
- `GET /api/match/find` - Find match
- `POST /api/match/create` - Create private match
- `POST /api/match/:id/shoot` - Submit shot
- `GET /api/match/:id` - Get match state

### Social
- `GET /api/player/profile/:id` - Get player profile
- `GET /api/leaderboard` - Get global leaderboard
- `POST /api/friends/add` - Add friend
- `GET /api/chat/messages` - Get chat messages

## WebSocket Events

### Connection
- `connect` - Player connected
- `disconnect` - Player disconnected

### Game
- `game:start` - Game started
- `game:shot` - Player took shot
- `game:end` - Game ended
- `game:state` - State update

### Chat
- `chat:message` - New message
- `chat:typing` - User typing

## Development

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Deploy
firebase deploy
```

## Deployment

### Firebase Hosting
```bash
firebase init hosting
firebase deploy --only hosting
```

### Heroku (Backend)
```bash
heroku create app-name
git push heroku main
```

## Performance Optimization
- Lazy loading components
- Code splitting
- Service worker for offline support
- Firestore indexes for queries
- CDN for static assets

## Security
- Firebase Security Rules
- Input validation
- Rate limiting
- Anti-cheat detection
- Secure WebSocket (WSS)

## Monitoring
- Firebase Analytics
- Error tracking (Sentry)
- Performance monitoring
- User session tracking

## Next Steps
After Phase 2 completes, move to Phase 3 (Flutter Mobile App) for iOS/Android deployment.
