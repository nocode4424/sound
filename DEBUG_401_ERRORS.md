# Quick Guide: Debugging 401 Errors from Retell API

## TL;DR

✅ **Your API endpoints are CORRECT** - The 401 error is NOT caused by wrong endpoint paths.

The issue is either:
1. Missing or invalid `RETELL_API_KEY` environment variable
2. API key doesn't have required permissions
3. API key format is incorrect

---

## Step-by-Step Debugging

### Step 1: Check if API Key Exists

```bash
# SSH into Supabase or use CLI
supabase secrets list
```

**Expected Output:**
```
RETELL_API_KEY=key_xxxxxxxxxxxxx
```

**If missing:** Set it:
```bash
supabase secrets set RETELL_API_KEY=key_your_actual_key_here
```

---

### Step 2: Verify API Key Format

Your Retell API key should:
- Start with `key_`
- Be a long alphanumeric string
- Example: `key_abc123def456ghi789...`

**Wrong formats:**
- ❌ Just the token without `key_` prefix
- ❌ OAuth token
- ❌ Old deprecated format

**Get your key:**
1. Go to https://beta.retellai.com/dashboard
2. Navigate to Settings → API Keys
3. Copy the full key including `key_` prefix

---

### Step 3: Test API Key Directly

```bash
# Replace YOUR_KEY with your actual key
curl -X GET https://api.retellai.com/list-voices \
  -H "Authorization: Bearer key_your_actual_key_here" \
  -H "Content-Type: application/json"
```

**If successful:** You'll get JSON with voice list
**If 401:** Your API key is invalid - regenerate it on Retell dashboard

---

### Step 4: Check Function Logs

```bash
# For restaurant agent
supabase functions logs create-restaurant-agent --follow

# For web calls
supabase functions logs create-web-call --follow
```

**Look for these specific errors:**

```
✅ Good: "LLM created: llm_xxxxx"
✅ Good: "Agent created: agent_xxxxx"
❌ Bad: "RETELL_API_KEY not configured"
❌ Bad: "Retell LLM error: 401 Unauthorized"
❌ Bad: "Retell Agent error: Invalid API key"
```

---

### Step 5: Verify Permissions

In Retell dashboard, check your API key has permissions for:
- ✅ Create Agents
- ✅ Create LLMs
- ✅ Create Calls
- ✅ List Voices

Some keys are **read-only** and won't work for creation endpoints.

---

## Common Mistakes

### Mistake 1: Using Anon Key Instead of Retell Key
```typescript
// ❌ WRONG - This is Supabase key
const retellApiKey = Deno.env.get('SUPABASE_ANON_KEY');

// ✅ RIGHT - This is Retell key
const retellApiKey = Deno.env.get('RETELL_API_KEY');
```

### Mistake 2: Wrong Environment
```bash
# Keys are environment-specific
# Production key won't work in dev/staging
# Make sure you're using the right environment
```

### Mistake 3: Hardcoded Key in Code
```typescript
// ❌ NEVER DO THIS
const retellApiKey = 'key_abc123...';

// ✅ ALWAYS USE ENV VARS
const retellApiKey = Deno.env.get('RETELL_API_KEY');
```

---

## Still Getting 401 After All Checks?

### Advanced Debugging

1. **Enable verbose logging:**

```typescript
// Add to your function before Retell API call
console.log('API Key (first 10 chars):', retellApiKey?.substring(0, 10));
console.log('Request URL:', 'https://api.retellai.com/create-retell-llm');
console.log('Request headers:', {
  'Authorization': `Bearer ${retellApiKey?.substring(0, 15)}...`,
  'Content-Type': 'application/json'
});
```

2. **Check request body:**

```typescript
const requestBody = {
  model: 'gpt-4.1-mini',
  begin_message: beginMessage,
  general_prompt: systemPrompt,
};
console.log('Request body:', JSON.stringify(requestBody, null, 2));
```

3. **Inspect full error response:**

```typescript
if (!llmResponse.ok) {
  const errorText = await llmResponse.text();
  console.error('Full Retell error:', errorText);
  console.error('Status code:', llmResponse.status);
  console.error('Status text:', llmResponse.statusText);
  throw new Error(`Retell LLM error: ${errorText}`);
}
```

4. **Contact Retell Support:**

If none of the above works, contact Retell at:
- Email: support@retellai.com
- Discord: https://discord.gg/retellai
- Include:
  - Your API key (first 15 characters only)
  - Exact error message
  - Timestamp of the error
  - Which endpoint failed

---

## Working Example

Here's a complete working example from `create-restaurant-agent`:

```typescript
const retellApiKey = Deno.env.get('RETELL_API_KEY');

if (!retellApiKey) {
  throw new Error('RETELL_API_KEY not configured');
}

// Create LLM
const llmResponse = await fetch('https://api.retellai.com/create-retell-llm', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${retellApiKey}`,  // ← MUST include "Bearer "
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-4.1-mini',
    begin_message: beginMessage,
    general_prompt: systemPrompt,
    general_tools: [{
      type: 'end_call',
      name: 'end_call',
      description: 'End the call when order is complete'
    }]
  }),
});

if (!llmResponse.ok) {
  const errorText = await llmResponse.text();
  console.error('Retell LLM error:', errorText);
  throw new Error(`Retell LLM error: ${errorText}`);
}

const llmData = await llmResponse.json();
console.log('LLM created successfully:', llmData.llm_id);
```

---

## Checklist Before Asking for Help

- [ ] Verified `RETELL_API_KEY` exists in Supabase secrets
- [ ] Confirmed key starts with `key_`
- [ ] Tested key with curl command
- [ ] Checked function logs for specific error message
- [ ] Verified API key has correct permissions
- [ ] Confirmed using production key in production environment
- [ ] No hardcoded keys in code
- [ ] Request body matches Retell API specification

If all checkboxes are ✅ and still failing, there may be an issue with Retell's API.

---

## Summary

**The code is correct.** All API endpoints, headers, and request formats match the official Retell API specification. Focus on verifying your API key configuration.
