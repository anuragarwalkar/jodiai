# JodiAI - AI-Powered Marriage Assistant

A futuristic marriage app that uses AI to analyze Jeevansathi profiles and provide intelligent match recommendations.

## Features

- 🤖 **AI-Powered Analysis**: Uses Google Gemini AI to analyze profile compatibility
- 🎯 **Smart Recommendations**: Intelligent matching based on your requirements
- 🚀 **Futuristic UI**: Modern, responsive design with smooth animations
- 📱 **Mobile-First**: Works seamlessly on all devices
- 🔐 **Profile Verification**: Verified profile prioritization
- 💬 **Conversation Starters**: AI-generated conversation suggestions

## Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **Langchain** - AI integration
- **Google Gemini AI** - AI analysis
- **CORS** - Cross-origin requests

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd jodiai

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Configuration

#### Backend (.env)
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
NODE_ENV=development
PORT=5000
GOOGLE_API_KEY=your_actual_gemini_api_key_here
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Frontend (.env)
```bash
cd frontend
cp .env.example .env
```

The frontend `.env` is already configured for local development.

### 3. Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `backend/.env` file

### 4. Start the Application

#### Start Backend (Terminal 1)
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:5000

#### Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:5173

### 5. Using the App

1. **Dashboard**: Overview of matches and activity
2. **Profiles**: Browse and analyze profiles with AI
3. **Requirements**: Set your match preferences
4. **AI Analysis**: View detailed compatibility analysis

## API Endpoints

### Profile Endpoints
- `POST /api/profiles/transform` - Transform Jeevansathi data
- `POST /api/profiles/compatibility` - Calculate compatibility

### AI Endpoints  
- `POST /api/ai/analyze-profile` - Analyze single profile
- `POST /api/ai/recommend-matches` - Generate recommendations
- `POST /api/ai/set-requirements` - Set user requirements

### Health Check
- `GET /health` - Backend health status

## Usage Example

### Analyzing a Jeevansathi Profile

1. Copy the Jeevansathi API response (like the one you provided)
2. Use the transform endpoint to convert it:

```javascript
const response = await fetch('/api/profiles/transform', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jeevansathiData: yourJeevansathiResponse,
    userPreferences: yourPreferences
  })
});
```

3. Analyze with AI:

```javascript
const analysis = await fetch('/api/ai/analyze-profile', {
  method: 'POST', 
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    profile: transformedProfile,
    userRequirements: yourRequirements
  })
});
```

## Customization

### Adding New Requirements
1. Update `RequirementsContext.jsx` 
2. Modify AI prompts in `aiService.js`
3. Update UI components

### Styling
- Edit `App.css` for global styles
- Component styles are inline with Tailwind-like classes
- Color scheme defined in CSS custom properties

### AI Prompts
- Modify prompts in `backend/services/aiService.js`
- Adjust temperature and model parameters

## Deployment

### Backend Deployment
1. Set production environment variables
2. Deploy to Heroku, Railway, or similar
3. Update CORS origins

### Frontend Deployment  
1. Update `VITE_API_BASE_URL` to production backend
2. Build: `npm run build`
3. Deploy to Vercel, Netlify, or similar

## Project Structure

```
jodiai/
├── backend/
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── server.js         # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── context/      # React context
│   │   ├── pages/        # Page components
│   │   ├── services/     # API calls
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Test thoroughly
5. Submit a pull request

## Support

For questions or issues:
- Check the console for errors
- Verify API keys are correct
- Ensure both frontend and backend are running
- Check network connectivity

## License

MIT License - see LICENSE file for details

---

**Happy Matching! 💕**
