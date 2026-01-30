# Advanced Agent Creation Feature - Implementation Summary

## Overview
Added a comprehensive advanced agent creation feature that gives users two paths:
1. **Simple Mode** - Easy personality sliders (existing approach)
2. **Advanced Mode** - Full control over all Retell AI settings

## Changes Made

### 1. Dashboard Updates (`src/pages/Dashboard.tsx`)
**Changes:**
- Reduced box sizes and font sizes throughout
- Made stats boxes smaller (p-4, text-xl values, w-5 h-5 icons)
- Made quick action boxes smaller (p-5, text-lg headings)
- Added "Create Your First Agent" section with 3 smaller template boxes:
  - **Receptionist** - Answer calls, transfer to departments, take messages
  - **Outbound Sales** - Make calls, qualify leads, book appointments
  - **From Scratch** - Build completely custom agent
- Template boxes only show when user has ≤2 agents
- All boxes link to `/create?type=X` for future type-specific flows

### 2. New Components Created

#### `src/lib/agent-presets.ts`
Preset configurations for different restaurant types:
- **Casual Restaurant** - Fast-paced, friendly (GPT-4 Mini, 1.1x speed)
- **Fine Dining** - Sophisticated, polished (GPT-4, 0.9x speed)
- **Fast Casual** - Quick, efficient (GPT-4 Mini, 1.2x speed)
- **Custom** - User configures everything

#### `src/components/ui/collapsible.tsx`
Reusable collapsible section component with:
- Smooth expand/collapse animation
- Chevron rotation indicator
- Dark theme styling

#### `src/components/onboarding/steps/ModeSelectionStep.tsx`
Initial mode selection screen with:
- Two large cards (Simple vs Advanced)
- "Recommended" badge on Simple mode
- Clear descriptions and feature lists
- Smooth animations on hover

#### `src/components/onboarding/steps/AdvancedAgentStep.tsx`
Comprehensive advanced settings form with:

**Section 1: Agent Instructions**
- Large textarea for custom system prompt
- Character counter (50 char minimum)

**Section 2: Preset Selector**
- Dropdown to load optimized presets
- Auto-populates all settings

**Section 3: LLM Settings**
- Model selection (GPT-4, GPT-4 Mini, Claude, Gemini)
- Temperature slider (0-1, consistency vs creativity)
- Max tokens input (response length)

**Section 4: Voice Settings**
- Speaking speed slider (0.5x - 2.0x)
- Voice expressiveness slider (0-1)

**Section 5: Conversation Behavior**
- Responsiveness slider (how quickly AI responds)
- Interruption sensitivity (how easily interrupted)
- Backchannel toggle + frequency slider

**Section 6: Call Management**
- Silence timeout (seconds)
- Max call duration (minutes)
- Voicemail detection toggle

**Section 7: Advanced Settings (Collapsible)**
- Ambient sound selection
- Ambient volume slider
- Normalize for speech toggle
- Opt out of data storage toggle

### 3. Updated Components

#### `src/components/onboarding/OnboardingFlow.tsx`
- Added `mode` state tracking
- Added `creationMode` state ('simple' | 'advanced' | null)
- Updated `OnboardingData` interface with 15+ new optional fields
- Conditional step rendering based on mode:
  - Simple: Mode → Welcome → Info → Personality → Voice → Menu → Knowledge → Preview (7 steps)
  - Advanced: Mode → Welcome → Info → Advanced → Voice → Menu → Knowledge → Preview (6 steps)
- Dynamic progress bar that adjusts to mode
- Updated `handleComplete` to call edge function with all data
- Added static import for supabase client

#### `src/components/onboarding/steps/PreviewStep.tsx`
- Mode detection based on `generalPrompt` presence
- Conditional rendering:
  - Simple mode: Shows personality visualization (warmth, pace, chattiness, formality)
  - Advanced mode: Shows technical settings summary + prompt preview

### 4. Database Migration

#### `supabase/migrations/002_restaurant_configs.sql`
New table to store all restaurant-specific agent settings:

**Columns:**
- `user_agent_id` - Link to user_agents table
- `restaurant_name` - Restaurant name
- `personality_level` - Calculated from sliders or formality (0-100)
- `hours_json` - Operating hours by day
- `menu_json` - Parsed menu items
- `menu_raw` - Original menu text
- `popular_items` - Items to recommend
- `upsell_items` - Items to suggest
- `pickup_time_minutes` - Default prep time
- `generated_prompt` - Full system prompt

**Advanced Settings Columns:**
- `llm_model` - Which LLM to use
- `temperature` - Response creativity (0-1)
- `max_tokens` - Response length
- `voice_speed` - Speaking pace (0.5-2.0)
- `voice_temperature` - Voice expressiveness (0-1)
- `responsiveness` - Response timing (0-1)
- `interruption_sensitivity` - Interrupt ease (0-1)
- `enable_backchannel` - Enable "mm-hmm" sounds
- `backchannel_frequency` - How often (0-1)
- `end_call_after_silence_ms` - Silence timeout
- `max_call_duration_ms` - Max call length
- `enable_voicemail_detection` - Auto-detect voicemail
- `ambient_sound` - Background noise type
- `ambient_sound_volume` - Background volume (0-1)
- `normalize_for_speech` - Auto-correct for natural speech
- `opt_out_sensitive_data_storage` - Privacy setting

**RLS Policies:**
- Users can only access their own restaurant configs (via user_agents join)

### 5. Edge Function Updates

#### `supabase/functions/create-restaurant-agent/index.ts`
Major rewrite to support both modes:

**New Interface:**
- Updated `RestaurantInput` interface with all new fields
- Added `mode` field to distinguish simple vs advanced

**Helper Function:**
- `personalityToSettings()` - Converts personality sliders (1-10) to Retell settings
  - Warmth → voice_temperature (0.3-1.0)
  - Pace → responsiveness (0.5-1.0) & voice_speed (0.8-1.2)
  - Chattiness → backchannel_frequency (0.3-0.9)
  - Formality → temperature adjustment

**Mode-Based Logic:**
- **Simple Mode:**
  - Uses Anthropic Claude to generate system prompt from personality sliders
  - Auto-calculates all Retell settings from slider values
  - Generates appropriate begin message based on formality

- **Advanced Mode:**
  - Uses user-provided system prompt directly
  - Passes all user-configured settings to Retell API
  - Falls back to sensible defaults for unspecified values

**Retell API Integration:**
- Creates LLM with appropriate model and temperature
- Creates Agent with all voice, conversation, and call settings
- Stores everything in database for later editing

**Database Storage:**
- Saves to `user_agents` table with status 'active'
- Saves to `restaurant_configs` table with all settings
- Links agent to user via `user_id`

## File Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── collapsible.tsx          [NEW]
│   │   └── index.ts                  [UPDATED - added Collapsible export]
│   └── onboarding/
│       ├── OnboardingFlow.tsx        [UPDATED - mode support]
│       └── steps/
│           ├── ModeSelectionStep.tsx      [NEW]
│           ├── AdvancedAgentStep.tsx      [NEW]
│           └── PreviewStep.tsx            [UPDATED - mode-aware preview]
├── lib/
│   └── agent-presets.ts              [NEW]
└── pages/
    └── Dashboard.tsx                 [UPDATED - smaller boxes, create templates]

supabase/
├── migrations/
│   └── 002_restaurant_configs.sql    [NEW]
└── functions/
    └── create-restaurant-agent/
        └── index.ts                   [UPDATED - dual-mode support]
```

## How to Use

### For Users:

1. **Navigate to Create Agent** from dashboard
2. **Choose Setup Mode:**
   - Select "Guided Setup" for simple personality sliders
   - Select "Advanced Setup" for full control
3. **Configure Agent:**
   - Simple: Adjust 4 personality sliders
   - Advanced: Write prompt + configure all settings
4. **Complete Setup:** Voice, menu, knowledge base (same for both modes)
5. **Launch:** Review and create agent

### For Developers:

#### Apply Database Migration:
```bash
# Option 1: Via Supabase CLI (requires Docker)
supabase db push

# Option 2: Via Supabase Dashboard
# Go to SQL Editor → paste contents of 002_restaurant_configs.sql → Run
```

#### Environment Variables Required:
```env
# Client-side (.env)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...

# Server-side (Supabase Edge Functions secrets)
RETELL_API_KEY=key_xxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxx
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
```

## Testing Checklist

- [ ] Dashboard shows smaller boxes
- [ ] Dashboard shows 3 "create agent" templates when user has ≤2 agents
- [ ] Mode selection screen appears first in onboarding
- [ ] Simple mode shows personality sliders
- [ ] Advanced mode shows full settings form
- [ ] Preset selector loads correct values
- [ ] All sliders work and show live values
- [ ] Collapsible "Advanced Settings" expands/collapses
- [ ] Preview step shows different summaries based on mode
- [ ] Edge function receives mode and all settings
- [ ] Agent created successfully in Retell
- [ ] Settings saved to database correctly
- [ ] User can navigate back/forward through wizard

## Next Steps

1. **Apply Migration:** Run the database migration to create the restaurant_configs table
2. **Test Both Modes:** Create agents using both simple and advanced modes
3. **Verify Retell Integration:** Ensure agents are created with correct settings in Retell dashboard
4. **Add Edit Functionality:** Allow users to edit existing agents (especially switching modes)
5. **Add Type-Specific Flows:** Implement receptionist and outbound sales agent types
6. **Add Validation:** Better error handling and field validation throughout

## Technical Details

### Personality Slider → Retell Settings Mapping

| Slider | Range | Maps To | Formula |
|--------|-------|---------|---------|
| Warmth | 1-10 | voice_temperature | 0.3 + (warmth/10) * 0.7 |
| Pace | 1-10 | responsiveness, voice_speed | 0.5 + (pace/10) * 0.5, 0.8 + (pace/10) * 0.4 |
| Chattiness | 1-10 | backchannel_frequency, temperature | 0.3 + (chattiness/10) * 0.6 |
| Formality | 1-10 | temperature (negative) | Subtracts from temperature |

### Advanced Settings Ranges

| Setting | Min | Max | Default | Description |
|---------|-----|-----|---------|-------------|
| temperature | 0 | 1 | 0.7 | Response creativity |
| voiceSpeed | 0.5 | 2.0 | 1.0 | Speaking pace |
| voiceTemperature | 0 | 1 | 1.0 | Voice emotion |
| responsiveness | 0 | 1 | 1.0 | Response timing |
| interruptionSensitivity | 0 | 1 | 1.0 | Interrupt ease |
| backchannelFrequency | 0 | 1 | 0.8 | "mm-hmm" frequency |
| endCallAfterSilenceMs | 10000 | 600000 | 30000 | Silence timeout |
| maxCallDurationMs | 60000 | 3600000 | 1800000 | Max call length |

## Success Metrics

When testing, verify:
1. ✅ Build completes without errors
2. ✅ Dev server starts successfully
3. ✅ All TypeScript types are correct
4. ✅ Both modes are accessible
5. ✅ Settings persist through wizard steps
6. ✅ API receives all data correctly
7. ✅ Database stores all settings

## Notes

- The mode selection happens BEFORE the welcome screen
- Users can go back and change their mode selection
- All settings have sensible defaults
- Advanced mode is clearly marked as "Expert" level
- Simple mode is recommended for most users
- The same PreviewStep works for both modes with conditional rendering
