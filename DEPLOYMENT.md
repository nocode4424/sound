# Deployment Guide - Solaris AI Voice Agent Platform

## Prerequisites

- Supabase account (already configured)
- Retell AI API key (already configured in .env)
- GitHub repository (already set up)
- Netlify account (for hosting)

## Current Setup Status

✅ **Database**: Schema deployed to Supabase
✅ **Agents**: 2 public Retell agents added to database:
   - `agent_fa37190e8f04c48e46532b70c4` (Restaurant Order Assistant)
   - `agent_06ea01f0bc105f6211fccd0647` (Customer Service Agent)
✅ **Code**: Pushed to https://github.com/nocode4424/voiceagent.git
✅ **Edge Functions**: Deployed to Supabase
   - `create-web-call` - Generates Retell access tokens
   - `create-restaurant-agent` - Creates custom agents
✅ **Secrets**: All API keys configured in Supabase
✅ **Dev Server**: Running at http://localhost:5173

## Deployment Steps

### 1. Configure Supabase Auth

1. Go to https://supabase.com/dashboard
2. Select your project: `voiceplatform`
3. Navigate to **Authentication → Providers**
4. Enable **Google** provider:
   - Add your Google OAuth Client ID
   - Add your Google OAuth Client Secret
   - Add authorized redirect URL: `https://sjkemdyylakwrpzgtolf.supabase.co/auth/v1/callback`
   - Add your production URL when deployed

### 2. Deploy Supabase Edge Functions ✅ COMPLETED

The edge functions have been deployed. If you need to redeploy:

```bash
# Make sure you're in the project directory
cd /Users/jeffgordon/Downloads/hireplated

# Login to Supabase CLI (if not already)
supabase login

# Deploy functions with explicit workdir
supabase functions deploy create-web-call --project-ref sjkemdyylakwrpzgtolf --workdir /Users/jeffgordon/Downloads/hireplated
supabase functions deploy create-restaurant-agent --project-ref sjkemdyylakwrpzgtolf --workdir /Users/jeffgordon/Downloads/hireplated
```

Secrets are already configured. To view them:
```bash
supabase secrets list --project-ref sjkemdyylakwrpzgtolf
```

### 3. Deploy to Netlify

1. Go to https://app.netlify.com
2. Click **Add new site → Import an existing project**
3. Choose **GitHub** and authorize
4. Select repository: `nocode4424/voiceagent`
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Add environment variables:
   - `VITE_SUPABASE_URL`: `https://sjkemdyylakwrpzgtolf.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `sb_publishable_-dsrUU42kFeQTChddD8Uaw_zL8871gN`
   - `VITE_APP_URL`: (will be your Netlify URL, e.g., `https://solaris-ai.netlify.app`)
7. Click **Deploy site**

### 4. Update Supabase Auth URLs

After Netlify deployment:
1. Copy your Netlify URL
2. Go to Supabase Dashboard → Authentication → URL Configuration
3. Add to **Redirect URLs**:
   - `https://your-netlify-url.netlify.app/dashboard`
   - `https://your-netlify-url.netlify.app`
4. Update **Site URL** to your Netlify URL

### 5. Test the Deployment

1. Visit your Netlify URL
2. Click "Get Started"
3. Sign in with Google
4. Navigate to "Explore Agents"
5. Click "Try This Agent" on the Restaurant Order Assistant
6. Test the voice call

## Environment Variables Reference

### Client-Side (.env)
```env
VITE_SUPABASE_URL=https://sjkemdyylakwrpzgtolf.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_-dsrUU42kFeQTChddD8Uaw_zL8871gN
VITE_APP_URL=http://localhost:5173  # Change to Netlify URL in production
```

### Server-Side (Supabase Secrets)
```env
RETELL_API_KEY=your_retell_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_from_supabase_dashboard
```

## Features Available

### ✅ Completed & Deployed
- Landing page with marketing content
- Google Sign-In authentication
- User dashboard
- Explore public agents (2 agents available)
- Voice calling with Retell agents
- My Agents page
- Call History with transcripts
- Settings/Profile management
- Responsive design

### 🚧 Coming Soon
- Restaurant agent creation wizard
- More agent types (property management, sales, etc.)
- Advanced analytics
- Phone number integration
- Team management

## Troubleshooting

### Voice calls not working
1. Check browser console for errors
2. Verify microphone permissions granted
3. Check edge function logs in Supabase
4. Verify Retell API key is set correctly

### Auth not working
1. Verify Google OAuth credentials in Supabase
2. Check redirect URLs match your domain
3. Clear browser cookies and try again

### Agents not showing
1. Check database connection
2. Verify agents table has data
3. Check row-level security policies

## Support

For issues or questions:
- Check browser console for errors
- Review Supabase function logs
- Check network tab for API failures
