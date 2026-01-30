# Solaris AI - Voice Agent Platform

## Website Overview

This document describes the complete vision for Solaris AI, a platform where business owners can explore pre-built voice AI agents and create their own custom agents. The website should feel modern, premium, and trustworthy—like a product built by people who understand both AI and small business needs.

---

## Theme & Visual Direction

The overall aesthetic is **dark, sophisticated, and tech-forward** without being cold or intimidating. Think "premium SaaS product" meets "approachable AI assistant."

**Color Palette:**
- Deep blue/navy backgrounds (#0A1628, #1E293B) create depth and professionalism
- Electric blue (#3B82F6) and purple (#8B5CF6) accents add energy and highlight interactive elements
- White and light grays for text ensure readability against dark backgrounds
- Subtle gradients and glass-morphism effects give cards and containers visual interest

**Typography:**
- Clean, modern sans-serif (Inter) for excellent readability
- Headings are bold and confident
- Body text is comfortable to read at length

**Overall Feel:**
- Spacious layouts with generous whitespace
- Cards and containers have subtle borders and backdrop blur (glass effect)
- Everything feels polished and intentional

---

## Navigation

### Top Navigation Bar

The navigation bar sits fixed at the top of every page. It should be sleek and unobtrusive but always accessible.

**Structure:**
- **Left side:** Solaris AI logo (clickable, returns to homepage)
- **Center/Right:** Main navigation links with dropdown menus
- **Far right:** "Sign In" button (ghost style) and "Get Started" button (primary gradient)

### Dropdown Mega-Menus

Each main navigation item reveals a **slide-down mega-menu** on hover. These aren't simple link lists—they're informative panels that help visitors understand what each section offers.

**Example: "Solutions" dropdown**
```
┌─────────────────────────────────────────────────────────────────────────┐
│  SOLUTIONS                                                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  [Icon] Restaurants              [Icon] Property Management             │
│  AI agents that take pickup      Handle tenant calls, maintenance       │
│  orders, recommend dishes,       requests, and scheduling               │
│  and calculate totals.           automatically.                         │
│                                                                          │
│  [Icon] Service Contractors      [Icon] Sales & Lead Qualification      │
│  Schedule appointments,          Qualify leads 24/7, capture            │
│  provide quotes, and handle      contact info, and book demos           │
│  emergency dispatch.             automatically.                         │
│                                                                          │
│  ─────────────────────────────────────────────────────────────────────  │
│  [See all solutions →]                                                  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

Each use case in the dropdown has:
- A relevant icon
- A clear title
- A brief 1-2 sentence description explaining the value
- Clickable—takes user to a dedicated landing page for that use case

**Other navigation dropdowns:**
- **Features:** Voice quality, integrations, analytics, customization options
- **Pricing:** Plan comparison, enterprise options
- **Resources:** Documentation, tutorials, case studies, blog

The dropdowns animate smoothly (slide down with a subtle fade, ~200ms) and have a slight delay before closing so users don't accidentally dismiss them.

---

## Landing Page

### Hero Section

The hero is the first thing visitors see. It needs to immediately communicate what Solaris AI does and why they should care.

**Elements:**
- **Headline:** Bold, benefit-focused (e.g., "Your Business, Always Answering")
- **Subheadline:** Brief explanation of the product (e.g., "AI voice agents that handle calls, take orders, and book appointments—so you never miss an opportunity")
- **Primary CTA:** "Get Started Free" button with gradient background, subtle hover animation (slight scale + glow)
- **Secondary CTA:** "See It In Action" or "Watch Demo" (ghost button or text link)
- **Visual:** Either an abstract illustration of voice waves/AI, or a clean mockup showing the product interface

### Component Reference

See `components.md` for specific component patterns to follow, including:
- **Shiny hover button** - Primary CTAs use a diagonal shine effect on hover (45deg gradient sweep, 1500ms duration)
- **Submit button with states** - Expands to show loading spinner, then checkmark on success
- **Day/night toggle** - Animated toggle for theme switching (if implemented)
```

/components.md
What to add to CLAUDE.md: At the bottom in the "Reference Links" section, add:
markdown### Local Documentation
- [Retell API Reference](./docs/retell-api-docs.md) - Full Retell SDK documentation
- [VAPI API Reference](./docs/vapi-api-docs.md) - Full VAPI SDK documentation


### Social Proof Section

Below the hero, show credibility indicators:
- Logos of businesses using the platform (or placeholder text like "Trusted by 500+ businesses")
- Brief testimonial quotes
- Key metrics if available ("10,000+ calls handled")

### Use Case Cards

A section showcasing the primary use cases, each as a clickable card:

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   [Restaurant   │  │   [Property     │  │   [Service      │
│      Icon]      │  │   Mgmt Icon]    │  │  Business Icon] │
│                 │  │                 │  │                 │
│   Restaurants   │  │    Property     │  │   Contractors   │
│                 │  │   Management    │  │   & Services    │
│  Take orders,   │  │  Handle tenant  │  │  Book jobs,     │
│  upsell items,  │  │  calls and      │  │  qualify leads, │
│  confirm pickup │  │  maintenance    │  │  dispatch crews │
│                 │  │                 │  │                 │
│  [Learn More →] │  │  [Learn More →] │  │  [Learn More →] │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

Each card has:
- Hover animation: subtle lift (translateY -4px) and shadow increase
- Icon or small illustration
- Title
- Brief value proposition
- "Learn More" link

### How It Works Section

Simple 3-step explanation:

1. **Choose or Create** — Browse our pre-built agents or create your own custom agent in minutes
2. **Configure** — Upload your menu, set your hours, customize the personality
3. **Go Live** — Connect to your phone system or test directly in your browser

Each step has an icon/illustration and brief description.

### Features Grid

Highlight key platform capabilities:
- Natural voice conversations
- Menu and pricing integration
- Real-time order calculation
- Customizable personality
- Analytics and call logs
- Easy setup (no coding required)

### Final CTA Section

Before the footer, one more strong call to action:
- Compelling headline ("Ready to never miss another call?")
- "Get Started Free" button
- Note about no credit card required / free trial

### Footer

Standard footer with:
- Logo and brief tagline
- Navigation links organized by category
- Social media links
- Legal links (Privacy, Terms)
- Copyright

---

## Sign-Up Flow

The sign-up process should feel smooth and welcoming while gathering useful information about the user.

### Step 1: Initial Sign-Up Modal/Page

When user clicks "Get Started":

**Option A: Quick social sign-in**
- "Sign up with Google" button (prominent)
- "Sign up with Email" option below

**Option B: Email sign-up form**
- Email address field
- Password field (with strength indicator)
- "Create Account" button

Both options use Supabase Auth under the hood.

### Step 2: Onboarding Questions

After initial account creation, guide user through a brief onboarding flow. This appears as a multi-step modal or dedicated page.

**Screen 1: "Let's get to know you"**
- Full name
- Company/Business name
- "Continue" button

**Screen 2: "What type of business do you run?"**
- Radio buttons or clickable cards:
  - Restaurant / Food Service
  - Property Management
  - Home Services (Plumber, HVAC, etc.)
  - Professional Services
  - Retail
  - Other (with text input)

**Screen 3: "What's your biggest phone challenge?"**
- Checkboxes (select all that apply):
  - Missing calls when busy
  - After-hours inquiries
  - Repetitive questions (hours, pricing)
  - Scheduling appointments
  - Taking orders
  - Qualifying leads

**Screen 4: "How many calls do you get per day?"**
- Radio buttons:
  - Less than 10
  - 10-25
  - 25-50
  - 50-100
  - More than 100

This information helps us:
1. Personalize their dashboard experience
2. Suggest relevant agent templates
3. Understand our user base
4. Follow up with targeted onboarding emails

### Step 3: Email Verification

After onboarding questions:

**Confirmation screen:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    [Email Icon - Animated]                  │
│                                                             │
│              Check your inbox!                              │
│                                                             │
│   We've sent a verification link to                        │
│   jeff@example.com                                          │
│                                                             │
│   Click the link in the email to activate your account     │
│   and start exploring voice AI agents.                      │
│                                                             │
│   ─────────────────────────────────────────────────────    │
│                                                             │
│   Didn't receive it?                                        │
│   [Resend Email]  •  [Change Email Address]                │
│                                                             │
│   Pro tip: Check your spam folder if you don't see it      │
│   within a few minutes.                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Step 4: Email Verified → Welcome

When user clicks the verification link:

**Welcome screen (brief):**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    [Checkmark Animation]                    │
│                                                             │
│              You're all set, Jeff!                         │
│                                                             │
│   Your account is verified and ready to go.                │
│                                                             │
│   [Go to Dashboard]                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Auto-redirect to dashboard after 3 seconds, or user can click immediately.

---

## Dashboard (Logged-In Experience)

After logging in, users land on their dashboard. The dashboard is the central hub with clear navigation to the two main areas.

### Dashboard Layout

**Top bar:**
- Solaris AI logo (left)
- Search (optional, for future when they have many agents)
- Notifications icon
- Profile dropdown (right) — Settings, Billing, Sign Out

**Sidebar navigation:**
- Dashboard (home)
- Explore Agents
- My Agents
- Create Agent
- Call History
- Settings

**Main content area:**
- Welcome message with user's name
- Quick stats (if they have agents: total calls, active agents)
- Quick action cards

### Dashboard Home Content

**Welcome Section:**
```
Welcome back, Jeff! 👋

You have 2 active agents and handled 47 calls this week.

[+ Create New Agent]  [View Call History]
```

**Quick Actions Grid:**
```
┌─────────────────────────┐  ┌─────────────────────────┐
│  [Phone Icon]           │  │  [Wand Icon]            │
│                         │  │                         │
│  Explore Agents         │  │  Create Your Own        │
│                         │  │                         │
│  Test our pre-built     │  │  Build a custom agent   │
│  voice agents with      │  │  tailored to your       │
│  a live call            │  │  business               │
│                         │  │                         │
│  [Try Now →]            │  │  [Get Started →]        │
└─────────────────────────┘  └─────────────────────────┘
```

**My Agents Section (if they have agents):**
- List of their created agents
- Status indicator (active/draft)
- Quick actions: Edit, Test Call, View Analytics

---

## Area 1: Explore Agents (Test Pre-Built Agents)

This section showcases pre-built voice agents that users can test immediately via browser-based voice calls. These are agents that I (Jeff) will build and add to the Supabase `agents` table with `is_public = true`.

### Explore Page Layout

**Header:**
- Page title: "Explore Voice Agents"
- Subtitle: "Test-drive our pre-built agents with a live voice call"

**Filter/Categories:**
- Horizontal tabs or pills: All, Restaurants, Property Management, Services, Sales
- Optional search bar

**Agent Cards Grid:**

Each card shows:
- Agent name
- Category badge
- Brief description
- Rating/popularity (optional)
- "Try This Agent" button

### Agent Detail / Call Interface

When user clicks "Try This Agent":

**Call Interface (before call):**
- Agent name and status indicator
- Large microphone icon / call button
- "What this agent does" bullet points
- "Try saying" example prompts

**During Call:**
- Animated voice waveform showing who's speaking
- Call duration timer
- Mute and End Call buttons
- Live transcript below

The voice call happens through WebRTC via the Retell Web SDK. The browser requests microphone permission, and the user talks directly to the AI agent.

---

## Area 2: Create Your Own Agent

This is where users build custom agents tailored to their business.

### Create Agent Entry Point

When user navigates to "Create Agent":

**Initial Selection Screen:**
```
What type of agent would you like to create?

┌─────────────────────────────────────────────────────────────┐
│  [Restaurant Icon]                                          │
│                                                             │
│  Restaurant Order Agent                                     │
│                                                             │
│  Perfect for takeout and pickup orders. Takes orders,      │
│  knows your menu and prices, recommends popular items,      │
│  and calculates totals automatically.                       │
│                                                             │
│  [Create Restaurant Agent →]                                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  [Coming Soon Badge]                                        │
│                                                             │
│  More agent types coming soon                               │
│                                                             │
│  Property management, service scheduling,                   │
│  lead qualification, and more.                              │
│                                                             │
│  [Join Waitlist]                                            │
└─────────────────────────────────────────────────────────────┘
```

Currently only the Restaurant agent is available. Other types show "Coming Soon" with an option to join a waitlist.

### Restaurant Agent Creation Wizard

A 5-step wizard with progress indicator:

**Step 1: Restaurant Basics**
- Restaurant name
- Operating hours (day-by-day with open/close times)
- Typical pickup time (minutes)
- Personality slider (Formal ↔ Casual)

**Step 2: Menu Upload**
- File upload (PDF, images, CSV, TXT)
- OR paste menu text
- AI parses and confirms item count

**Step 3: Popular & Upsell Items**
- Select 2-4 popular items (agent recommends these)
- Select 1-2 upsell items (agent suggests adding these)

**Step 4: Voice Selection**
- 4 voice options with preview buttons:
  - Young Male (energetic, friendly)
  - Middle-Age Male (warm, professional)
  - Young Female (bright, welcoming)
  - Middle-Age Female (composed, reassuring)

**Step 5: Review & Create**
- Summary of all settings with Edit links
- "Create My Agent" button
- Loading state with progress steps
- Success state with "Test Your Agent" CTA

### After Creation

The new agent appears in "My Agents" and is visible only to that user. They can:
- Test call it via browser
- Edit any settings
- View call analytics (once connected to phone)
- Archive or delete it

---

## My Agents Section

Shows all agents the user has created.

**Agent Cards show:**
- Agent name and type
- Status badge (Active, Draft, Archived)
- Creation date
- Call count this month
- Action buttons: Test Call, Edit, View Analytics, More (...)

---

## Profile & Settings

**Profile page includes:**
- Full name
- Email (with verified indicator)
- Company name
- Business type
- Password change
- Delete account (danger zone)

---

## Button & Interaction Design

### Button Styles

**Primary Button (CTA):**
- Gradient background (blue to purple)
- White text
- Hover: Subtle scale (1.02), increased glow/shadow
- Active: Slight scale down (0.98)
- Transition: 150ms ease-out

**Secondary Button:**
- Transparent background with border
- White/light text
- Hover: Background fills slightly, border brightens

**Ghost Button:**
- No background or border
- Text with subtle underline or icon
- Hover: Text brightens

### Micro-Animations

- **Buttons:** Scale on hover (1.02-1.05), slight shadow lift
- **Cards:** Lift up (translateY -4px) on hover, shadow increases
- **Inputs:** Focus ring animates in, border color transitions
- **Checkboxes/Radios:** Smooth fill animation when selected
- **Dropdowns:** Slide down with fade (200ms)
- **Modals:** Fade in backdrop, scale in content (from 0.95 to 1)
- **Page transitions:** Fade + slight Y translation

### Loading States

- **Page loads:** Skeleton screens that match content layout
- **Button actions:** Button shows spinner, text changes to "Creating..." etc.
- **Voice calls:** Pulsing animation while connecting, waveform while talking

---

## Future Additions (Noted for Reference)

These features are not in v1 but are planned:

1. **Additional Agent Types** - Property Management, Service businesses, Lead qualification
2. **Phone Number Integration** - Connect agents to real phone numbers via Twilio/SIP
3. **Advanced Analytics** - Call trends, common questions, order value tracking
4. **Team Management** - Multiple users, role-based permissions
5. **Integrations** - POS systems, calendars, CRMs, Zapier

---

# Technical Implementation

The sections below contain technical details for developers.

---
## Local API Documentation

Complete API documentation is available in the `/docs` folder. **Always consult these files before implementing any voice provider integration:**

- **`/docs/retell-api-docs.md`** - Complete Retell AI API reference including all endpoints, SDK methods, webhook events, and configuration options
- **`/docs/vapi-api-docs.md`** - Complete VAPI API reference including all endpoints, SDK methods, webhook events, and configuration options

These documents contain the authoritative API specifications. Use them for:
- Exact method signatures and parameters
- All available configuration options
- Webhook payload structures
- Error handling patterns
- Rate limits and best practices

---
## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + Framer Motion |
| Backend | Supabase (Auth, Database, Edge Functions, Storage) |
| Voice AI | Retell AI SDK (primary), VAPI SDK (secondary) |
| LLM | Anthropic Claude API (structured outputs for agent generation) |
| Hosting | Netlify |
| Version Control | GitHub |

---

## Database Schema

### Tables

**profiles** - Extended user data
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  company_name TEXT,
  business_type TEXT,
  phone_challenge TEXT[],
  call_volume TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**agents** - Public agent catalog (pre-built agents for Explore section)
```sql
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  provider TEXT NOT NULL CHECK (provider IN ('retell', 'vapi')),
  provider_agent_id TEXT NOT NULL,
  category TEXT,
  is_public BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  config JSONB DEFAULT '{}',
  test_call_count INTEGER DEFAULT 0,
  rating DECIMAL(2,1),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**user_agents** - User-created agents (visible only to creator)
```sql
CREATE TABLE user_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  agent_type TEXT NOT NULL DEFAULT 'restaurant',
  provider TEXT NOT NULL DEFAULT 'retell',
  provider_agent_id TEXT,
  provider_llm_id TEXT,
  voice_id TEXT,
  config JSONB DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
  call_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**restaurant_configs** - Restaurant-specific settings
```sql
CREATE TABLE restaurant_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_agent_id UUID REFERENCES user_agents(id) ON DELETE CASCADE NOT NULL UNIQUE,
  restaurant_name TEXT NOT NULL,
  personality_level INTEGER DEFAULT 50,
  hours_json JSONB NOT NULL,
  menu_json JSONB NOT NULL,
  menu_raw TEXT,
  popular_items TEXT[] DEFAULT '{}',
  upsell_items TEXT[] DEFAULT '{}',
  pickup_time_minutes INTEGER DEFAULT 15,
  generated_prompt TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**conversations** - Call logs
```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  agent_id UUID REFERENCES agents(id),
  user_agent_id UUID REFERENCES user_agents(id),
  provider TEXT NOT NULL,
  provider_call_id TEXT,
  duration_seconds INTEGER,
  transcript JSONB,
  call_analysis JSONB,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**waitlist** - Captures interest for future agent types
```sql
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  email TEXT NOT NULL,
  agent_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## API Keys & Environment

### Client-Side (.env)
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_APP_URL=http://localhost:5173
```

### Server-Side (Supabase Edge Functions)
```env
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
RETELL_API_KEY=key_xxxxx
VAPI_API_KEY=xxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

**CRITICAL:** Retell, VAPI, and Anthropic API keys must NEVER be exposed client-side.

---

## Retell AI Integration

### Server-Side (Edge Functions)

```typescript
import Retell from 'retell-sdk';

const client = new Retell({ apiKey: Deno.env.get('RETELL_API_KEY')! });

// Create LLM
const llm = await client.llm.create({
  model: 'gpt-4o-mini',
  model_temperature: 0.3,
  general_prompt: generatedPrompt,
  begin_message: `Hi! Thanks for calling ${restaurantName}...`,
});

// Create Agent
const agent = await client.agent.create({
  response_engine: { type: 'retell-llm', llm_id: llm.llm_id },
  voice_id: selectedVoiceId,
  agent_name: restaurantName,
  responsiveness: 1.0,
  interruption_sensitivity: 0.8,
  enable_backchannel: true,
});

// Create Web Call
const webCall = await client.call.createWebCall({ agent_id: agent.agent_id });
// Returns: { call_id, access_token, sample_rate }
```

### Client-Side (React)

```typescript
import { RetellWebClient } from 'retell-client-js-sdk';

const retell = new RetellWebClient();

// Start call
await retell.startCall({ accessToken: access_token, sampleRate: 24000 });

// Events
retell.on('call_started', () => {});
retell.on('call_ended', () => {});
retell.on('agent_start_talking', () => {});
retell.on('agent_stop_talking', () => {});
retell.on('update', (update) => { /* transcript */ });
retell.on('error', (error) => {});

retell.stopCall();
```

### Voice Options

```typescript
export const VOICE_OPTIONS = [
  { id: 'young-male', label: 'Young Male', retellVoiceId: 'openai-Echo' },
  { id: 'middle-age-male', label: 'Middle-age Male', retellVoiceId: '11labs-Adrian' },
  { id: 'young-female', label: 'Young Female', retellVoiceId: 'openai-Nova' },
  { id: 'middle-age-female', label: 'Middle-age Female', retellVoiceId: '11labs-Rachel' },
];
```

---

## File Organization

```
src/
├── components/
│   ├── ui/           # Button, Card, Input, Slider, etc.
│   ├── layout/       # Header, Footer, Sidebar, DashboardLayout
│   ├── auth/         # SignUpModal, OnboardingWizard, EmailVerification
│   ├── landing/      # Hero, UseCaseCards, HowItWorks, FinalCTA
│   ├── agents/       # AgentCard, AgentGrid, AgentDetail
│   ├── voice/        # CallInterface, VoiceWaveform, Transcript
│   └── create/       # AgentTypeSelector, RestaurantWizard steps
├── pages/
│   ├── Landing.tsx
│   ├── Dashboard.tsx
│   ├── Explore.tsx
│   ├── MyAgents.tsx
│   ├── CreateAgent.tsx
│   └── Settings.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useRetellCall.ts
│   └── useAgents.ts
├── lib/
│   ├── supabase.ts
│   └── voices.ts
└── types/
    └── index.ts
```

---

## DO NOT

- ❌ Use mock/sample data - always integrate with real Supabase tables
- ❌ Ask for confirmation before proceeding
- ❌ Create placeholder components - implement fully
- ❌ Use `any` type in TypeScript
- ❌ Skip error handling or loading states
- ❌ Expose API keys client-side
- ❌ Use spinners for loading (use skeletons, except voice calls)
- ❌ Write generic copy ("Welcome to our platform")
- ❌ Ignore mobile responsiveness

## ALWAYS

- ✅ Implement proper TypeScript types
- ✅ Add loading and error states
- ✅ Use environment variables for secrets
- ✅ Write self-documenting code
- ✅ Implement responsive design (mobile-first)
- ✅ Add proper ARIA labels
- ✅ Use Framer Motion for animations
- ✅ Handle edge cases (empty states, errors)
- ✅ Write compelling, benefit-focused copy
- ✅ Keep users informed during processes

---

## Reference Links

- [Retell AI Docs](https://docs.retellai.com/)
- [Retell Web SDK](https://github.com/RetellAI/retell-client-js-sdk)
- [Supabase Docs](https://supabase.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Anthropic API](https://docs.anthropic.com/)
