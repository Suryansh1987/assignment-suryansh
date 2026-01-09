# AgriSense AI (アグリセンス AI)

A production-ready full-stack agriculture chatbot for Japanese farmers with voice input, real-time weather integration, and AI-powered farming advice.

## Features

- 🎙️ **Japanese Voice Input** - Speak naturally in Japanese using Web Speech API
- 🌦️ **Real-time Weather** - Get current weather data for your farm location
- 🤖 **AI-Powered Advice** - Receive contextual farming recommendations from Google Gemini
- 💬 **Chat History** - Multiple conversation sessions with full message history
- 👤 **User Profiles** - Manage personal info and farm details (crops, size, methods)
- 🔐 **Secure Authentication** - JWT-based signup and signin
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

### Frontend
- **Framework**: Vite + React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Voice**: Web Speech API (ja-JP)

### Backend
- **Runtime**: Node.js + Express
- **Language**: TypeScript
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: JWT + bcrypt
- **AI**: Google Gemini API
- **Weather**: OpenWeatherMap API

### Deployment
- **Frontend**: Vercel
- **Backend**: Railway
- **Database**: Neon (Serverless PostgreSQL)

## Project Structure

```
japanese-company/
├── frontend/           # React + Vite application
│   ├── src/
│   │   ├── pages/      # Page components
│   │   ├── components/ # Reusable UI components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── services/   # API service layer
│   │   ├── context/    # React context providers
│   │   └── types/      # TypeScript type definitions
│   └── package.json
│
└── backend/            # Express API server
    ├── src/
    │   ├── db/         # Database schema and migrations
    │   ├── controllers/# Route handlers
    │   ├── services/   # Business logic
    │   ├── middlewares/# Express middlewares
    │   ├── routes/     # API routes
    │   ├── config/     # Configuration files
    │   └── utils/      # Utility functions
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Neon PostgreSQL account (free tier available)
- Google Gemini API key (from Google AI Studio)
- OpenWeatherMap API key (free tier available)

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd japanese-company

# Install root dependencies
npm install

# Install all workspace dependencies
npm run install:all
```

### 2. Database Setup

1. Create a free account at [neon.tech](https://neon.tech)
2. Create a new project named "agrisense-db"
3. Select region: Tokyo (closest to Japan)
4. Copy the connection string

### 3. Get API Keys

**Google Gemini API:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key

**OpenWeatherMap API:**
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get a free API key from your account dashboard
3. Copy the key

### 4. Configure Environment Variables

**Backend (.env):**

Create `backend/.env`:

```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database (from Neon)
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
JWT_EXPIRES_IN=7d

# Google Gemini AI
GEMINI_API_KEY=your-gemini-api-key-here

# OpenWeatherMap
OPENWEATHER_API_KEY=your-openweather-api-key-here
```

**Frontend (.env):**

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=AgriSense AI
```

### 5. Initialize Database

```bash
cd backend

# Generate migration files
npm run db:generate

# Push schema to database
npm run db:push
```

### 6. Run Development Servers

**Option 1: Run both servers concurrently (from root directory):**

```bash
npm run dev
```

**Option 2: Run separately:**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

The app will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## Available Scripts

### Root Directory

```bash
npm run dev              # Run both frontend and backend
npm run build            # Build both projects
npm run install:all      # Install all dependencies
```

### Backend

```bash
npm run dev              # Start development server with hot reload
npm run build            # Build TypeScript to JavaScript
npm start                # Run production server
npm run db:generate      # Generate Drizzle migration files
npm run db:push          # Push schema to database
npm run db:studio        # Open Drizzle Studio (database GUI)
```

### Frontend

```bash
npm run dev              # Start Vite dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

## Usage Guide

### 1. Sign Up

1. Visit the landing page
2. Click "アカウント登録" (Sign Up)
3. Enter your details:
   - Name
   - Email
   - Password
   - City (e.g., 横浜市)
   - Prefecture (e.g., 神奈川県)
4. Submit to create account

### 2. Complete Profile

1. Go to Profile page
2. Add farm details:
   - Farm size (e.g., "2ha")
   - Crop types (e.g., 米, トマト, キュウリ)
   - Farming methods (e.g., 有機農法, 温室栽培)

### 3. Start Chatting

1. Click "新しいチャット" (New Chat)
2. Type your question or click the microphone button to speak in Japanese
3. Get AI-powered farming advice based on your profile and current weather
4. Continue the conversation - AI remembers context!

### 4. Voice Input

1. Click the microphone button (🎤) in the chat input
2. Allow microphone permissions when prompted
3. Speak your question in Japanese
4. Text will automatically appear in the input field
5. Click send or press Enter

## API Documentation

### Authentication Endpoints

```
POST /api/auth/signup    # Register new user
POST /api/auth/signin    # Login user
GET  /api/auth/verify    # Verify JWT token
```

### User Endpoints

```
GET  /api/users/profile  # Get current user profile
PUT  /api/users/profile  # Update user profile and farm details
```

### Chat Endpoints

```
GET  /api/sessions         # Get all user sessions
POST /api/sessions         # Create new chat session
GET  /api/sessions/:id     # Get session with messages
DELETE /api/sessions/:id   # Delete session

POST /api/chat/message     # Send message and get AI response
```

### Weather Endpoints

```
GET  /api/weather/current  # Get current weather for user location
```

## Deployment

### Backend (Railway)

1. Push code to GitHub
2. Connect Railway to your repository
3. Set root directory: `/backend`
4. Add environment variables (see Backend .env section)
5. Add Neon PostgreSQL database URL
6. Deploy - Railway auto-deploys on push

### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set root directory: `/frontend`
4. Framework: Vite
5. Add environment variables:
   - `VITE_API_BASE_URL`: Your Railway backend URL
6. Deploy - Vercel auto-deploys on push

## Troubleshooting

### Voice Input Not Working

- **Issue**: Microphone button doesn't appear
- **Solution**: Voice input requires HTTPS in production. Ensure your Vercel deployment uses HTTPS. It works on localhost for development.

### Database Connection Errors

- **Issue**: Cannot connect to database
- **Solution**: Ensure your Neon database connection string includes `?sslmode=require` at the end

### CORS Errors

- **Issue**: Frontend can't access backend API
- **Solution**: Ensure `FRONTEND_URL` in backend .env matches your frontend URL exactly

### AI Not Responding

- **Issue**: Chat messages fail or return errors
- **Solution**: Verify your `GEMINI_API_KEY` is valid and has not exceeded quota

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues or questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the troubleshooting section above

---

Built with ❤️ for Japanese farmers using modern web technologies
