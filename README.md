# Solaris AI - Voice Agent Platform

A beautiful, modern platform for exploring and creating AI voice agents. Built with React, TypeScript, Vite, Tailwind CSS, and Supabase.

## Features

- ✨ Beautiful dark-themed UI with glass morphism design
- 🎙️ Voice AI agent marketplace (explore pre-built agents)
- 🛠️ Custom agent creation wizard (restaurant agents)
- 🔐 Google Sign-In authentication via Supabase Auth
- 📊 User dashboard with analytics
- 🎨 Smooth animations with Framer Motion
- 📱 Fully responsive design

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **Voice AI**: Retell AI SDK (primary), VAPI SDK (secondary)
- **LLM**: Anthropic Claude API

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- (Optional) Retell AI API key
- (Optional) Anthropic API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nocode4424/voiceagent.git
cd voiceagent
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with your Supabase credentials (already configured in `.env.example`)

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (Button, Card, Input, etc.)
│   ├── layout/          # Layout components (Header, Footer, Dashboard)
│   ├── auth/            # Authentication components
│   ├── landing/         # Landing page sections
│   ├── agents/          # Agent-related components
│   └── voice/           # Voice call interface
├── pages/               # Route-level components
│   ├── Landing.tsx
│   ├── Dashboard.tsx
│   ├── Explore.tsx
│   └── CreateAgent.tsx
├── hooks/               # Custom React hooks
│   ├── useAuth.ts
│   ├── useAgents.ts
│   └── useRetellCall.ts
├── lib/                 # Utilities and API clients
│   ├── supabase.ts
│   ├── utils.ts
│   └── voices.ts
├── types/               # TypeScript type definitions
└── styles/              # Global styles
```

## Database Schema

The database schema has been applied to Supabase and includes:

- `profiles` - Extended user data
- `agents` - Public agent catalog
- `user_agents` - User-created agents
- `conversations` - Call logs and transcripts
- `agent_reviews` - User reviews for agents
- `waitlist` - Email capture for new features

See `supabase/migrations/001_initial_schema.sql` for the complete schema.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Implemented

✅ Landing page with hero, features, and CTAs
✅ Google Sign-In authentication
✅ User dashboard with stats
✅ Explore agents - browse and test 2 public Retell agents
✅ Voice calling - real Retell integration via WebRTC
✅ My Agents - view and manage user-created agents
✅ Call History - view transcripts and analytics
✅ Settings - profile and account management
✅ Supabase Edge Functions for Retell API
✅ Responsive design
✅ Dark theme with glass morphism
✅ Database schema deployed to Supabase

## Ready to Deploy

The application is complete and ready for production deployment. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Start Deployment

1. **Deploy Edge Functions**:
   ```bash
   supabase functions deploy create-web-call --project-ref sjkemdyylakwrpzgtolf
   supabase functions deploy create-restaurant-agent --project-ref sjkemdyylakwrpzgtolf
   supabase secrets set RETELL_API_KEY=your_key --project-ref sjkemdyylakwrpzgtolf
   ```

2. **Configure Google OAuth** in Supabase Dashboard

3. **Deploy to Netlify**:
   - Connect GitHub repository
   - Set environment variables
   - Deploy!

## Development Status

✅ **COMPLETE** - All core features implemented and functional:
- Landing page → Sign up → Dashboard flow
- Explore 2 live Retell agents
- Make voice calls directly in browser
- View call history and transcripts
- Manage profile settings
- Fully responsive mobile design

## Live Agents

Two Retell agents are configured and ready to test:
1. **Restaurant Order Assistant** (`agent_fa37190e8f04c48e46532b70c4`)
2. **Customer Service Agent** (`agent_06ea01f0bc105f6211fccd0647`)

## License

Proprietary - All rights reserved
