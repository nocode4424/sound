# Voice SDK Reference

## Overview

This platform uses **two different SDKs per provider**:

| Provider | Client SDK (Browser) | Server SDK (Edge Functions) |
|----------|---------------------|----------------------------|
| **Retell AI** | `retell-client-js-sdk` | `retell-sdk` |
| **VAPI** | `@vapi-ai/web` | `@vapi-ai/server-sdk` |

---

## Package Installation

```bash
# Client-side SDKs (installed in main project)
npm install retell-client-js-sdk @vapi-ai/web

# Optional: VAPI React widget (if you want pre-built UI)
npm install @vapi-ai/client-sdk-react

# Server-side SDKs (used in Supabase Edge Functions via ESM imports)
# These are imported directly in Deno, not installed via npm
```

---

## Retell AI

### Client SDK: `retell-client-js-sdk`

**Purpose:** Browser-based voice calls via WebRTC

**Install:**
```bash
npm install retell-client-js-sdk
```

**Usage:**
```typescript
import { RetellWebClient } from "retell-client-js-sdk";

const retellWebClient = new RetellWebClient();

// 1. Get access token from YOUR server (not directly from Retell)
const response = await fetch('/api/retell/create-web-call', {
  method: 'POST',
  body: JSON.stringify({ agentId: 'agent_xxxxx' })
});
const { access_token } = await response.json();

// 2. Start the call
await retellWebClient.startCall({ 
  accessToken: access_token,
  // Optional settings:
  sampleRate: 24000, // Audio sample rate
  emitRawAudioSamples: false // Set true to get raw audio data
});

// 3. Listen to events
retellWebClient.on("call_started", () => {
  console.log("Call started");
});

retellWebClient.on("call_ended", () => {
  console.log("Call ended");
});

retellWebClient.on("agent_start_talking", () => {
  console.log("Agent is speaking");
});

retellWebClient.on("agent_stop_talking", () => {
  console.log("Agent stopped speaking");
});

retellWebClient.on("update", (update) => {
  // Real-time transcript updates
  // update.transcript contains last 5 sentences
  console.log("Transcript:", update.transcript);
});

retellWebClient.on("error", (error) => {
  console.error("Error:", error);
});

// 4. End the call
retellWebClient.stopCall();
```

### Server SDK: `retell-sdk`

**Purpose:** Create calls, manage agents, get access tokens (runs on server only)

**In Supabase Edge Function:**
```typescript
// supabase/functions/create-retell-call/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { agentId } = await req.json();
  
  // Call Retell API directly (SDK doesn't work in Deno, use fetch)
  const response = await fetch("https://api.retellai.com/v2/create-web-call", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${Deno.env.get("RETELL_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      agent_id: agentId,
    }),
  });

  const data = await response.json();
  
  return new Response(JSON.stringify({
    access_token: data.access_token,
    call_id: data.call_id,
  }), {
    headers: { "Content-Type": "application/json" },
  });
});
```

### Retell API Endpoints (for Edge Functions)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/v2/create-web-call` | POST | Get access token for web call |
| `/v2/create-phone-call` | POST | Initiate outbound phone call |
| `/v2/agent` | POST | Create new agent |
| `/v2/agent/{agent_id}` | GET | Get agent details |
| `/v2/agent/{agent_id}` | PATCH | Update agent |
| `/v2/call/{call_id}` | GET | Get call details/transcript |

---

## VAPI

### Client SDK: `@vapi-ai/web`

**Purpose:** Browser-based voice calls via WebRTC

**Install:**
```bash
npm install @vapi-ai/web
```

**Usage:**
```typescript
import Vapi from '@vapi-ai/web';

// Initialize with PUBLIC key (safe for client-side)
const vapi = new Vapi('your-public-key');

// 1. Start call with existing assistant
await vapi.start('your-assistant-id');

// Or start with assistant overrides
await vapi.start('your-assistant-id', {
  recordingEnabled: true,
  variableValues: {
    customerName: 'John',
    orderId: '12345'
  }
});

// Or start with inline assistant config (no pre-created assistant)
await vapi.start({
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful assistant." }
    ]
  },
  voice: {
    provider: "11labs",
    voiceId: "burt"
  }
});

// 2. Listen to events
vapi.on('call-start', () => {
  console.log('Call has started');
});

vapi.on('call-end', () => {
  console.log('Call has ended');
});

vapi.on('speech-start', () => {
  console.log('User started speaking');
});

vapi.on('speech-end', () => {
  console.log('User stopped speaking');
});

vapi.on('volume-level', (volume) => {
  console.log(`Volume: ${volume}`);
});

vapi.on('message', (message) => {
  // Transcripts, function calls, etc.
  console.log('Message:', message);
});

vapi.on('error', (error) => {
  console.error('Error:', error);
});

// 3. Control the call
vapi.setMuted(true);  // Mute
vapi.setMuted(false); // Unmute
vapi.isMuted();       // Check mute status

// Send a message mid-call
vapi.send({
  type: 'add-message',
  message: {
    role: 'system',
    content: 'The user just clicked the help button'
  }
});

// Make the assistant say something
vapi.say("Let me transfer you to a human agent.");

// End the call
vapi.stop();
```

### Optional: VAPI React Widget

**Install:**
```bash
npm install @vapi-ai/client-sdk-react @vapi-ai/web
```

**Usage:**
```tsx
import { VapiWidget } from '@vapi-ai/client-sdk-react';

function VoiceChat() {
  return (
    <VapiWidget
      publicKey="your-public-key"
      assistantId="your-assistant-id"
      mode="voice"           // 'voice' | 'chat' | 'hybrid'
      theme="dark"           // 'light' | 'dark'
      accentColor="#3B82F6"
      position="bottom-right"
      title="AI Assistant"
      voiceShowTranscript={true}
    />
  );
}
```

### VAPI Server SDK (for Edge Functions)

**In Supabase Edge Function:**
```typescript
// supabase/functions/create-vapi-assistant/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { name, systemPrompt, voice } = await req.json();
  
  const response = await fetch("https://api.vapi.ai/assistant", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${Deno.env.get("VAPI_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          { role: "system", content: systemPrompt }
        ]
      },
      voice: {
        provider: "11labs",
        voiceId: voice
      }
    }),
  });

  const assistant = await response.json();
  
  return new Response(JSON.stringify({
    assistantId: assistant.id,
  }), {
    headers: { "Content-Type": "application/json" },
  });
});
```

### VAPI API Endpoints (for Edge Functions)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/assistant` | POST | Create new assistant |
| `/assistant/{id}` | GET | Get assistant details |
| `/assistant/{id}` | PATCH | Update assistant |
| `/assistant/{id}` | DELETE | Delete assistant |
| `/call` | GET | List calls |
| `/call/{id}` | GET | Get call details |

---

## Key Differences

| Feature | Retell AI | VAPI |
|---------|-----------|------|
| **Auth for web calls** | Requires server-generated access token | Uses public key directly |
| **Event naming** | `call_started`, `agent_start_talking` | `call-start`, `speech-start` |
| **Transcript access** | Via `update` event | Via `message` event |
| **Mute control** | Not built-in (handle audio stream) | `setMuted()` method |
| **Mid-call messages** | Not supported | `send()` and `say()` methods |

---

## Unified Hook Pattern

To abstract provider differences, create a unified hook:

```typescript
// src/hooks/useVoiceCall.ts
import { useState, useCallback, useRef, useEffect } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import Vapi from '@vapi-ai/web';

type Provider = 'retell' | 'vapi';
type CallStatus = 'idle' | 'connecting' | 'connected' | 'ended' | 'error';

interface TranscriptEntry {
  role: 'agent' | 'user';
  content: string;
  timestamp: Date;
}

interface UseVoiceCallOptions {
  provider: Provider;
  onCallStart?: () => void;
  onCallEnd?: () => void;
  onTranscriptUpdate?: (transcript: TranscriptEntry[]) => void;
  onError?: (error: Error) => void;
}

export function useVoiceCall(options: UseVoiceCallOptions) {
  const { provider, onCallStart, onCallEnd, onTranscriptUpdate, onError } = options;
  
  const [status, setStatus] = useState<CallStatus>('idle');
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const retellRef = useRef<RetellWebClient | null>(null);
  const vapiRef = useRef<Vapi | null>(null);
  const startTimeRef = useRef<Date | null>(null);

  // Initialize clients
  useEffect(() => {
    if (provider === 'retell') {
      retellRef.current = new RetellWebClient();
    } else {
      vapiRef.current = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);
    }

    return () => {
      // Cleanup
      retellRef.current?.stopCall();
      vapiRef.current?.stop();
    };
  }, [provider]);

  const startCall = useCallback(async (agentId: string) => {
    setStatus('connecting');
    setError(null);
    setTranscript([]);
    startTimeRef.current = new Date();

    try {
      if (provider === 'retell') {
        // Get access token from server
        const res = await fetch('/functions/v1/create-retell-call', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ agentId }),
        });
        const { access_token } = await res.json();

        // Set up event listeners
        retellRef.current!.on('call_started', () => {
          setStatus('connected');
          onCallStart?.();
        });

        retellRef.current!.on('call_ended', () => {
          setStatus('ended');
          onCallEnd?.();
        });

        retellRef.current!.on('update', (update) => {
          if (update.transcript) {
            const newEntry: TranscriptEntry = {
              role: 'agent', // Retell doesn't differentiate well
              content: update.transcript,
              timestamp: new Date(),
            };
            setTranscript(prev => [...prev, newEntry]);
          }
        });

        retellRef.current!.on('error', (err) => {
          setError(new Error(err.message));
          setStatus('error');
          onError?.(new Error(err.message));
        });

        // Start call
        await retellRef.current!.startCall({ accessToken: access_token });

      } else {
        // VAPI - simpler, uses public key
        vapiRef.current!.on('call-start', () => {
          setStatus('connected');
          onCallStart?.();
        });

        vapiRef.current!.on('call-end', () => {
          setStatus('ended');
          onCallEnd?.();
        });

        vapiRef.current!.on('message', (msg) => {
          if (msg.type === 'transcript') {
            const newEntry: TranscriptEntry = {
              role: msg.role === 'assistant' ? 'agent' : 'user',
              content: msg.transcript,
              timestamp: new Date(),
            };
            setTranscript(prev => [...prev, newEntry]);
          }
        });

        vapiRef.current!.on('error', (err) => {
          setError(err);
          setStatus('error');
          onError?.(err);
        });

        await vapiRef.current!.start(agentId);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to start call');
      setError(error);
      setStatus('error');
      onError?.(error);
    }
  }, [provider, onCallStart, onCallEnd, onError]);

  const endCall = useCallback(() => {
    if (provider === 'retell') {
      retellRef.current?.stopCall();
    } else {
      vapiRef.current?.stop();
    }
    setStatus('ended');
  }, [provider]);

  const toggleMute = useCallback(() => {
    if (provider === 'vapi') {
      const newMuted = !isMuted;
      vapiRef.current?.setMuted(newMuted);
      setIsMuted(newMuted);
    }
    // Retell requires manual audio stream handling
  }, [provider, isMuted]);

  const getDuration = useCallback(() => {
    if (!startTimeRef.current) return 0;
    return Math.floor((Date.now() - startTimeRef.current.getTime()) / 1000);
  }, []);

  return {
    status,
    transcript,
    isMuted,
    error,
    startCall,
    endCall,
    toggleMute,
    getDuration,
  };
}
```

---

## Environment Variables Summary

```env
# Client-side (VITE_ prefix)
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_VAPI_PUBLIC_KEY=pk_xxxxxxxx  # Safe for client

# Server-side only (Supabase Edge Functions)
RETELL_API_KEY=key_xxxxxxxx      # Never expose to client
VAPI_API_KEY=xxxxxxxx            # Never expose to client
ANTHROPIC_API_KEY=sk-ant-xxx     # Never expose to client
```
