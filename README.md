# AgriSense AI - Agriculture Chatbot for Japanese Farmers

A full-stack AI-powered agriculture assistant designed specifically for Japanese farmers, providing personalized farming advice, weather information, and persistent conversation management.

## 🔐 Demo Credentials

```
Email: 22054137@kiit.ac.in
Password: ykyclmykycc
```

## 🌐 Live Demo

- **Backend API**: https://assignment-suryansh-3.onrender.com
- **Frontend**: [Coming Soon - Deploy on Vercel]

---

## 📸 Screenshots

### Home Page - Authentication
![Home Page](screenshots/home.png)
*Secure login and registration with JWT authentication*

### Chat Interface - AI Assistant
![Chat Interface](screenshots/chat.png)
*Real-time AI-powered conversations with context retention*

### Weather Widget
![Weather Widget](screenshots/weather.png)
*Live weather data integrated with farming advice*

### User Profile Management
![User Profile](screenshots/profile.png)
*Manage personal info, farm details, and location settings*

### Conversation History
![Conversation History](screenshots/conversations.png)
*All past conversations saved and accessible anytime*

---

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL (Neon Serverless)
- **ORM**: Drizzle ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **AI Integration**: Google Gemini 2.0 Flash
- **Weather API**: OpenWeatherMap API
- **Validation**: Zod
- **Security**: Helmet, CORS, Rate Limiting

### DevOps & Deployment
- **Backend Hosting**: Render (Docker)
- **Frontend Hosting**: Vercel
- **Database**: Neon PostgreSQL (Serverless)
- **Version Control**: Git & GitHub
- **Containerization**: Docker

---

## ✨ Key Features

### 1. 🔐 User Authentication & Authorization
- Secure signup and signin with JWT tokens
- Password hashing with bcrypt (10 rounds)
- Token-based session management
- Protected routes and API endpoints
- Automatic token refresh

### 2. 🤖 AI-Powered Chat Assistant
- **Intelligent Responses**: Context-aware AI using Google Gemini 2.0 Flash
- **Agriculture Expertise**: Specialized knowledge for Japanese farming practices
- **Multi-turn Conversations**: AI remembers entire conversation history
- **Personalized Advice**: Recommendations based on user's farm details and location
- **Topics Covered**:
  - Crop recommendations and cultivation techniques
  - Pest control and disease management
  - Soil health and fertilization
  - Irrigation and water management
  - Seasonal planting schedules
  - Weather-based farming decisions

### 3. 💬 Persistent Conversation Management
**All conversations are permanently saved to the database:**
- ✅ **Conversation Retention**: Every message (user and AI) is stored with timestamps
- ✅ **Resume Chats**: Continue any previous conversation from where you left off
- ✅ **Session History**: View all past chat sessions with titles
- ✅ **Context Preservation**: AI maintains full conversation context across sessions
- ✅ **Delete Option**: Remove unwanted conversations anytime
- ✅ **Auto-titling**: Sessions automatically titled based on first message

**How It Works:**
1. User sends a message → Saved to database
2. AI responds → Response saved to database
3. User closes app → All data preserved
4. User returns → Can access any previous conversation
5. Click on old session → All messages loaded instantly
6. Continue chatting → New messages added to same session

### 4. 🌦️ Real-Time Weather Information
- Location-based weather data from OpenWeatherMap
- Current conditions: Temperature, humidity, rainfall
- Weather descriptions in Japanese
- Integration with user's farm location (city + prefecture)
- Weather-aware farming recommendations

### 5. 👤 User Profile Management
- **Personal Information**: Name, email, location
- **Farm Details**:
  - Farm size (e.g., "2ha", "5000平方メートル")
  - Crop types (e.g., "rice", "tomato", "cucumber")
  - Farming methods (e.g., "organic", "greenhouse", "traditional")
- **Location Settings**: City and prefecture for weather data
- Update profile anytime

### 6. 📱 Responsive Design
- Mobile-first approach
- Adaptive layout for all screen sizes
- Touch-friendly interface
- Optimized for Japanese text rendering

---

## 🏗️ Architecture

### Database Schema

```sql
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  city VARCHAR(100),
  prefecture VARCHAR(100),
  farm_size VARCHAR(50),
  crop_types JSONB,
  farming_methods JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Chat Sessions Table
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Messages Table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role ENUM('user', 'assistant') NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Weather Logs Table (Optional - for analytics)
CREATE TABLE weather_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city VARCHAR(100) NOT NULL,
  prefecture VARCHAR(100),
  temperature VARCHAR(20),
  humidity VARCHAR(20),
  rainfall VARCHAR(20),
  weather_condition VARCHAR(50),
  description VARCHAR(255),
  fetched_at TIMESTAMP DEFAULT NOW()
);
```

### API Endpoints

#### 🔐 Authentication
```
POST   /api/auth/signup     - Register new user
POST   /api/auth/signin     - User login
POST   /api/auth/signout    - User logout
GET    /api/auth/me         - Get current user
```

#### 💬 Chat
```
POST   /api/chat                      - Send message and get AI response
GET    /api/chat/sessions             - Get all user sessions
GET    /api/chat/sessions/:sessionId  - Get specific session with all messages
DELETE /api/chat/sessions/:sessionId  - Delete a session
```

#### 🌦️ Weather
```
GET    /api/weather?city=Tokyo&prefecture=Tokyo  - Get weather data
```

#### 👤 User
```
GET    /api/users/profile   - Get user profile
PUT    /api/users/profile   - Update user profile
```

#### ❤️ Health
```
GET    /api/health          - API health check
```

---

## 🎯 Implementation Details

### Conversation Retention System

The application implements a robust conversation persistence system:

**Frontend Flow:**
1. User creates new chat → POST to `/api/chat` with message
2. Backend creates session + saves user message + gets AI response + saves AI response
3. All messages returned to frontend with session ID
4. Frontend stores session ID in state
5. User continues chatting → Messages sent with session ID
6. Backend appends to existing session

**Backend Flow:**
```typescript
// When user sends message
1. Check if sessionId exists
2. If no sessionId → Create new session
3. Save user message to database
4. Fetch all previous messages from this session
5. Send conversation history to Gemini AI
6. Get AI response
7. Save AI response to database
8. Return both messages to frontend
```

**Database Relations:**
- One user has many chat sessions (1:N)
- One session has many messages (1:N)
- Cascade delete: Deleting user removes all sessions and messages
- Cascade delete: Deleting session removes all messages

### AI Context Management

The chatbot maintains intelligent context:
- Sends up to last 20 messages to AI for context
- System prompt specializes AI for agriculture
- User profile data included in context
- Current weather data included when relevant

### Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT token authentication with expiry
- ✅ HTTP-only cookie support
- ✅ CORS protection
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ Helmet.js security headers
- ✅ Input validation with Zod
- ✅ SQL injection protection (Drizzle ORM)
- ✅ XSS protection

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 20+
- PostgreSQL database (or Neon account)
- Google Gemini API key
- OpenWeatherMap API key

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret_min_32_chars
GEMINI_API_KEY=your_gemini_api_key
OPENWEATHER_API_KEY=your_openweather_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
PORT=5000
JWT_EXPIRES_IN=7d
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
EOF

# Run database migrations
npm run db:push

# Start development server
npm run dev
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000" > .env

# Start development server
npm run dev
```

### Docker Deployment (Backend)

```bash
cd backend

# Build Docker image
docker build -t agrisense-backend .

# Run container
docker run -p 5000:5000 \
  -e DATABASE_URL=your_db_url \
  -e JWT_SECRET=your_secret \
  -e GEMINI_API_KEY=your_key \
  -e OPENWEATHER_API_KEY=your_key \
  -e FRONTEND_URL=your_frontend_url \
  -e NODE_ENV=production \
  agrisense-backend
```

---

## 🌍 Deployment Guide

### Backend on Render

1. **Create Web Service**
   - Environment: Docker
   - Root Directory: `./backend`
   - Dockerfile Path: `./backend/Dockerfile`

2. **Set Environment Variables**
   ```
   NODE_ENV=production
   PORT=5000
   DATABASE_URL=your_neon_postgres_url
   JWT_SECRET=your_secret_min_32_chars
   GEMINI_API_KEY=your_gemini_key
   OPENWEATHER_API_KEY=your_weather_key
   FRONTEND_URL=your_vercel_url
   ```

3. **Deploy**
   - Push to GitHub
   - Render auto-deploys on push

### Frontend on Vercel

1. **Import Project**
   - Root Directory: `./frontend`
   - Framework: Vite

2. **Set Environment Variables**
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```

3. **Deploy**
   - Vercel auto-deploys on push

4. **Update Backend**
   - Add Vercel URL to `FRONTEND_URL` in Render




---

## 🎓 Learning Highlights

### What Was Implemented

✅ **Full-Stack Architecture** - Separate frontend and backend with REST API
✅ **Database Design** - Relational schema with proper foreign keys and cascading
✅ **Authentication System** - JWT-based with secure password hashing
✅ **AI Integration** - Google Gemini API with conversation history
✅ **Persistent Storage** - All messages and sessions saved to PostgreSQL
✅ **State Management** - React Context for global auth state
✅ **API Design** - RESTful endpoints with proper HTTP methods
✅ **Error Handling** - Comprehensive error handling on frontend and backend
✅ **Type Safety** - Full TypeScript coverage for better development experience
✅ **Docker Containerization** - Backend containerized for consistent deployment
✅ **Environment Configuration** - Proper env var management with validation

### Technologies Learned

- **Drizzle ORM**: Type-safe database queries in TypeScript
- **Neon PostgreSQL**: Serverless PostgreSQL with automatic scaling
- **Google Gemini AI**: Advanced AI model integration
- **JWT Authentication**: Stateless authentication with tokens
- **Docker**: Containerization for production deployment
- **Render**: Cloud platform for backend hosting
- **Vercel**: Frontend hosting with automatic deployments

---
