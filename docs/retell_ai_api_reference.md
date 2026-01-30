# Retell AI API Reference (Unofficial Compiled Notes)

> **Purpose:** A practical, “everything in one place” Markdown reference you can drop into your coding platform / agent framework.
>
> **Last updated:** 2026-01-24 (America/Chicago)

---

## 1) Quick Facts

- **Authentication:** Bearer API key in `Authorization` header.
- **Primary API host:** `api.retellai.com` (HTTP) and `wss://api.retellai.com/...` (WebSockets).
- **Content-Type:** `application/json` for most request bodies.
- **Versioning:** Some resources live under `/v2/...` (notably **Call** APIs), while many others live at the root (e.g., `/create-phone-number`).

---

## 2) Authentication

### Header
```http
Authorization: Bearer YOUR_RETELL_API_KEY
```

### Notes
- API keys authenticate **REST API** and are also used to help **secure webhooks**.
- Keep API keys server-side (don’t ship them in browser code).

---

## 3) Core Resource Model

Retell’s platform revolves around a few core resources:

- **Voice Agent** (Voice calls / voice interactions)
- **Chat Agent** (Chat/SMS experiences)
- **Call** (Phone calls + Web calls)
- **Chat Session** (Chat sessions, including outbound SMS)
- **Phone Number** (Retell-managed or custom/ported numbers, with inbound/outbound bindings)
- **Response Engines**
  - **Retell LLM Response Engine** (single/multi prompt)
  - **Conversation Flow Response Engine** (node-based flow)
- **Knowledge Base** (URLs/files/text used for retrieval)
- **Voice** (TTS voices; add/clone/search/list)
- **Testing Suite** (test case definitions, batch tests, test runs)
- **Account** (e.g., concurrency limits)

---

## 4) REST API Endpoint Index

Below is an endpoint inventory organized by the groups shown in Retell’s API reference navigation.

> **Legend:** `METHOD  /path` — short description

### 4.1 Call (V2)

- `POST   /v2/create-phone-call` — Create outbound phone call
- `POST   /v2/create-web-call` — Create a web call (returns an `access_token` for your frontend)
- `GET    /v2/get-call/{call_id}` — Retrieve details for a single call
- `POST   /v2/list-calls` — List calls (supports pagination)
- `PATCH  /v2/update-call/{call_id}` — Update call (e.g., metadata / dynamic vars)
- `DELETE /v2/delete-call/{call_id}` — Delete call

### 4.2 Chat (Chat Sessions)

- `POST   /create-chat` — Create a chat session
- `POST   /create-sms-chat` — Start an outbound SMS chat session
- `GET    /get-chat/{chat_id}` — Get a chat session
- `POST   /create-chat-completion` — Create a chat completion
- `GET    /list-chat` — List chats
- `PATCH  /update-chat/{chat_id}` — Update chat
- `PATCH  /end-chat/{chat_id}` — End chat

### 4.3 Phone Number

- `POST   /create-phone-number` — Buy a new phone number (and optionally bind agents)
- `GET    /get-phone-number/{phone_number}` — Get phone number details
- `GET    /list-phone-numbers` — List phone numbers
- `PATCH  /update-phone-number/{phone_number}` — Update bindings / webhook / country allowlists
- `DELETE /delete-phone-number/{phone_number}` — Delete a phone number

### 4.4 Voice Agent

- `POST   /create-agent` — Create a voice agent
- `GET    /get-agent/{agent_id}` — Get agent
- `GET    /list-agents` — List agents
- `PATCH  /update-agent/{agent_id}` — Update agent
- `DELETE /delete-agent/{agent_id}` — Delete agent
- `POST   /publish-agent/{agent_id}` — Publish latest draft and create new draft
- `GET    /get-agent-versions/{agent_id}` — Get all agent versions

### 4.5 Chat Agent

- `POST   /create-chat-agent` — Create a chat agent
- `GET    /get-chat-agent/{agent_id}` — Get chat agent
- `GET    /list-chat-agents` — List chat agents
- `PATCH  /update-chat-agent/{agent_id}` — Update chat agent
- `DELETE /delete-chat-agent/{agent_id}` — Delete chat agent
- `POST   /publish-chat-agent/{agent_id}` — Publish chat agent
- `GET    /get-chat-agent-versions/{agent_id}` — Get chat agent versions

### 4.6 Retell LLM Response Engine (single/multi prompt agent)

- `POST   /create-retell-llm` — Create Retell LLM
- `GET    /get-retell-llm/{llm_id}` — Get Retell LLM
- `GET    /list-retell-llms` — List Retell LLMs
- `PATCH  /update-retell-llm/{llm_id}` — Update Retell LLM
- `DELETE /delete-retell-llm/{llm_id}` — Delete Retell LLM

### 4.7 Conversation Flow Response Engine (conversation flow agent)

- `POST   /create-conversation-flow` — Create flow
- `GET    /get-conversation-flow/{conversation_flow_id}` — Get flow
- `GET    /list-conversation-flows` — List flows
- `PATCH  /update-conversation-flow/{conversation_flow_id}` — Update flow
- `DELETE /delete-conversation-flow/{conversation_flow_id}` — Delete flow

### 4.8 Conversation Flow Components

- `POST   /create-conversation-flow-component` — Create component
- `GET    /get-conversation-flow-component/{component_id}` — Get component
- `GET    /list-conversation-flow-components` — List components
- `PATCH  /update-conversation-flow-component/{component_id}` — Update component
- `DELETE /delete-conversation-flow-component/{component_id}` — Delete component

### 4.9 MCP Tool

- `GET    /get-mcp-tools?agent_id={agent_id}` — Get MCP tools available to an agent

### 4.10 Knowledge Base

- `POST   /create-knowledge-base` — Create KB
- `GET    /get-knowledge-base/{knowledge_base_id}` — Get KB
- `GET    /list-knowledge-bases` — List KBs
- `DELETE /delete-knowledge-base/{knowledge_base_id}` — Delete KB
- `POST   /add-knowledge-base-sources/{knowledge_base_id}` — Add sources (texts, urls, files)
- `DELETE /delete-knowledge-base-source/{knowledge_base_id}/source/{source_id}` — Remove one KB source

### 4.11 Voice

- `POST   /add-voice` — Add voice
- `POST   /clone-voice` — Clone voice
- `POST   /search-voice` — Search voices
- `GET    /get-voice/{voice_id}` — Get voice
- `GET    /list-voices` — List voices

### 4.12 Batch call

- `POST   /create-batch-call` — Create a batch call job

### 4.13 Testing Suite

**Test Case Definitions**
- `POST   /create-test-case-definition`
- `GET    /get-test-case-definition/{test_case_definition_id}`
- `GET    /list-test-case-definitions`
- `PUT    /update-test-case-definition/{test_case_definition_id}`
- `DELETE /delete-test-case-definition/{test_case_definition_id}`

**Batch Tests**
- `POST   /create-batch-test`
- `GET    /get-batch-test/{batch_test_id}`
- `GET    /list-batch-tests`

**Test Runs**
- `GET    /get-test-run/{test_run_id}`
- `GET    /list-test-runs`

### 4.14 Account

- `GET    /get-concurrency` — Retrieve concurrency limits

### 4.15 Custom Telephony

- `POST   /import-phone-number` — Import a number (custom telephony)
- `POST   /register-phone-call` — Register a phone call (custom telephony)
- `POST   /register-call` — **Deprecated** (older call registration endpoint)

---

## 5) Webhooks

### 5.1 Event types (voice calls)
- `call_started` — Triggered when a call begins (not fired if call never connects)
- `call_ended` — Triggered when call completes/transfers/errors; includes call fields except `call_analysis`
- `call_analyzed` — Triggered when analysis is ready; includes `call_analysis`

### 5.2 Delivery / retries
- Webhooks are sent as `POST` with JSON.
- Timeout: **10 seconds**
- Retry: up to **3 times** if no 2xx response
- Delivery is in order but **non-blocking** (a failed `call_started` delivery doesn’t prevent `call_ended`)

### 5.3 Verifying webhooks
- Requests include an `x-retell-signature` header.
- Verification uses the signature header + your Retell API key (SDKs provide helpers).
- There is also an allowlistable Retell IP (per docs): `100.20.5.228`

---

## 6) WebSockets (Custom LLM)

Retell supports a **Custom LLM** integration pattern via WebSocket, where Retell sends live transcript + events to your server and requests responses.

### 6.1 LLM WebSocket (Retell → Your server)
- Endpoint pattern: `{your-server-websocket-endpoint}/{call_id}`
- Message type: text frames containing JSON (stringified)
- Core `interaction_type` values include:
  - `update_only` (live transcript updates)
  - `response_required` / `reminder_required` (Retell requests content)
  - `ping_pong` (keepalive)
  - `call_details` (optional, if enabled by config)

### 6.2 Your server → Retell messages
- Core `response_type` values include:
  - `config` (optional)
  - `response` (required when requested)
  - `agent_interrupt` (optional)
  - plus tool call invocation / results events (when using tools)

---

## 7) SDKs

Retell publishes official SDKs for **Node.js** and **Python**.

### Python (retell-sdk)
```python
from retell import Retell

client = Retell(api_key="YOUR_RETELL_API_KEY")

agent = client.agent.create(
    response_engine={"type": "retell-llm", "llm_id": "llm_..."},
    voice_id="openai-Alloy",
)
print(agent.agent_id)
```

---

## 8) Implementation Notes for “Coding Agents” / Platform Builders

If you’re building an agent orchestration layer on top of Retell, you’ll usually want these abstractions:

1. **Resource clients** (thin wrappers around each API group)
2. **Event ingestion**
   - Webhook endpoint(s) for call lifecycle + analysis
   - Signature verification
3. **Conversation state store**
   - Map your internal `session_id` ↔ Retell `call_id` / `chat_id`
   - Store transcripts + tool calls
4. **Tool execution bus**
   - For LLM WebSocket mode, treat `tool_call` and `tool_result` as first-class events
5. **Observability**
   - Central log for webhook retries, call disconnect reasons, error codes, and call analysis

---

## 9) Sources / Canonical References (recommended to keep in your repo)

- Retell Docs: API reference + Webhooks + SDK pages (docs.retellai.com)
- Official SDK repositories (RetellAI org on GitHub)
- PyPI package: `retell-sdk` (Python)

