# Retell AI API Reference

**Base URL:** `https://api.retellai.com`

## Authentication

All endpoints require Bearer token authentication:
```
Authorization: Bearer YOUR_RETELL_API_KEY
```

---

## Call (V2)

### `POST /v2/create-phone-call`

**Create Phone Call**

Create an outbound phone call.

**Request Body:**

- **from_number** *(required)*: `string` - The phone number to call from (must be a Retell number)
- **to_number** *(required)*: `string` - The phone number to call
- **agent_id** *(required)*: `string` - The agent to use for the call
- **metadata**: `object` - Custom metadata to attach to the call
- **retell_llm_dynamic_variables**: `object` - Dynamic variables for the LLM
- **drop_if_machine_detected**: `boolean` - Whether to drop call if answering machine detected

**Responses:**

- `201`: Call created successfully
- `400`: Bad request
- `401`: Unauthorized
- `422`: Validation error

---

### `POST /v2/create-web-call`

**Create Web Call**

Create a web-based call session.

**Request Body:**

- **agent_id** *(required)*: `string` - The agent to use for the call
- **metadata**: `object` - Custom metadata
- **retell_llm_dynamic_variables**: `object` - Dynamic variables for the LLM

**Responses:**

- `201`: Returns access_token and call_id for WebSocket connection
- `400`: Bad request
- `401`: Unauthorized

---

### `GET /v2/get-call/{call_id}`

**Get Call**

Retrieve details of a specific call.

**Parameters:**

- **call_id** (path) *(required)*: `string` - The call ID

**Responses:**

- `200`: Call details
- `404`: Call not found

---

### `POST /v2/list-call`

**List Calls**

List calls with optional filtering.

**Request Body:**

- **filter_criteria**: `object` - Filter options
  - **agent_id**: `string[]` - Filter by agent IDs
  - **call_type**: `string[]` - Filter by call type (inbound_phone_call, outbound_phone_call, web_call)
  - **call_status**: `string[]` - Filter by status
  - **start_timestamp**: `object` - Filter by start time range
  - **end_timestamp**: `object` - Filter by end time range
- **sort_order**: `string` - "ascending" or "descending"
- **limit**: `integer` - Max results (default 1000)
- **pagination_key**: `string` - For pagination

**Responses:**

- `200`: List of calls with pagination info

---

### `PATCH /v2/update-call/{call_id}`

**Update Call**

Update call metadata.

**Parameters:**

- **call_id** (path) *(required)*: `string`

**Request Body:**

- **metadata**: `object` - Updated metadata

---

### `DELETE /v2/delete-call/{call_id}`

**Delete Call**

Delete a call record.

**Parameters:**

- **call_id** (path) *(required)*: `string`

---

## Chat

### `POST /create-chat`

**Create Chat**

Create a new chat session.

**Request Body:**

- **chat_agent_id** *(required)*: `string` - The chat agent to use
- **metadata**: `object` - Custom metadata
- **retell_llm_dynamic_variables**: `object` - Dynamic variables

---

### `POST /create-sms-chat`

**Create Outbound SMS**

Create an outbound SMS chat session.

**Request Body:**

- **from_number** *(required)*: `string` - The phone number to send from
- **to_number** *(required)*: `string` - The phone number to send to
- **chat_agent_id** *(required)*: `string` - The chat agent to use

---

### `GET /get-chat/{chat_id}`

**Get Chat**

Retrieve chat details.

---

### `POST /create-chat-completion`

**Create Chat Completion**

Send a message and get a response in a chat.

**Request Body:**

- **chat_id** *(required)*: `string` - The chat ID
- **user_content** *(required)*: `string` - The user's message

---

### `GET /list-chat`

**List Chats**

List all chat sessions.

---

### `PATCH /update-chat/{chat_id}`

**Update Chat**

Update chat metadata.

---

### `PATCH /end-chat/{chat_id}`

**End Chat**

End an active chat session.

---

## Phone Number

### `POST /create-phone-number`

**Create Phone Number**

Purchase and configure a new phone number.

**Request Body:**

- **area_code**: `string` - Desired area code
- **inbound_agent_id**: `string` - Agent for inbound calls
- **outbound_agent_id**: `string` - Agent for outbound calls
- **nickname**: `string` - Friendly name for the number

---

### `GET /get-phone-number/{phone_number}`

**Get Phone Number**

Retrieve phone number details.

---

### `GET /list-phone-numbers`

**List Phone Numbers**

List all phone numbers in your account.

---

### `PATCH /update-phone-number/{phone_number}`

**Update Phone Number**

Update phone number configuration.

**Request Body:**

- **inbound_agent_id**: `string` - Agent for inbound calls
- **outbound_agent_id**: `string` - Agent for outbound calls
- **nickname**: `string` - Friendly name

---

### `DELETE /delete-phone-number/{phone_number}`

**Delete Phone Number**

Release a phone number.

---

## Voice Agent

### `POST /create-agent`

**Create Voice Agent**

Create a new voice agent.

**Request Body:**

- **response_engine** *(required)*: `object` - The response engine configuration
  - **type** *(required)*: `string` - "retell-llm" or "custom-llm" or "conversation-flow"
  - **llm_id**: `string` - LLM ID (for retell-llm type)
  - **url**: `string` - WebSocket URL (for custom-llm type)
- **voice_id** *(required)*: `string` - Voice ID (e.g., "11labs-Adrian", "openai-Alloy")
- **agent_name**: `string` - Name for the agent
- **voice_model**: `string` - Voice model (e.g., "eleven_turbo_v2", "eleven_flash_v2")
- **fallback_voice_ids**: `string[]` - Fallback voices for outages
- **voice_temperature**: `number` - Voice stability (0-2, default 1)
- **voice_speed**: `number` - Speech rate (0.5-2, default 1)
- **volume**: `number` - Agent volume (0-2, default 1)
- **responsiveness**: `number` - Response speed (0-1, default 1)
- **interruption_sensitivity**: `number` - How easy to interrupt (0-1, default 1)
- **enable_backchannel**: `boolean` - Enable "yeah", "uh-huh" responses
- **backchannel_frequency**: `number` - How often to backchannel (0-1)
- **backchannel_words**: `string[]` - Custom backchannel words
- **reminder_trigger_ms**: `number` - Time before reminder (default 10000)
- **reminder_max_count**: `integer` - Max reminders (default 1)
- **ambient_sound**: `string` - Background ambience ("coffee-shop", "convention-hall", "summer-outdoor", "mountain-outdoor", "static-noise", "call-center")
- **ambient_sound_volume**: `number` - Ambience volume (0-2)
- **language**: `string` - Language code (default "en-US", supports "multi" for multilingual)
- **webhook_url**: `string` - Webhook for call events
- **webhook_timeout_ms**: `integer` - Webhook timeout (default 10000)
- **boosted_keywords**: `string[]` - Words to boost in transcription
- **data_storage_setting**: `string` - "everything", "everything_except_pii", "basic_attributes_only"
- **pronunciation_dictionary**: `object[]` - Custom pronunciations
- **normalize_for_speech**: `boolean` - Normalize numbers/dates for speech
- **end_call_after_silence_ms**: `integer` - End call after silence (default 600000)
- **max_call_duration_ms**: `integer` - Max call length (default 3600000)
- **enable_voicemail_detection**: `boolean` - Detect voicemail
- **voicemail_message**: `string` - Message for voicemail
- **voicemail_detection_timeout_ms**: `integer` - Voicemail detection timeout
- **voicemail_option**: `object` - Voicemail action configuration
- **ivr_option**: `object` - IVR detection and action
- **post_call_analysis_data**: `object[]` - Custom data to extract post-call
- **post_call_analysis_model**: `string` - Model for analysis (default "gpt-4.1-mini")
- **begin_message_delay_ms**: `integer` - Delay before first message (0-5000)
- **ring_duration_ms**: `integer` - Ring duration (5000-90000, default 30000)
- **stt_mode**: `string` - "fast", "accurate", or "custom"
- **allow_user_dtmf**: `boolean` - Accept DTMF input (default true)
- **denoising_mode**: `string` - "noise-cancellation" or "noise-and-background-speech-cancellation"

**Response (201):**

- **agent_id**: `string` - Unique agent ID
- **version**: `integer` - Agent version
- **last_modification_timestamp**: `integer` - Last modified timestamp
- **is_published**: `boolean` - Publication status
- All request fields echoed back

---

### `GET /get-agent/{agent_id}`

**Get Voice Agent**

Retrieve agent configuration.

**Parameters:**

- **agent_id** (path) *(required)*: `string`

---

### `GET /list-agents`

**List Voice Agents**

List all voice agents.

---

### `PATCH /update-agent/{agent_id}`

**Update Voice Agent**

Update agent configuration.

**Parameters:**

- **agent_id** (path) *(required)*: `string`

**Request Body:** Same fields as Create Agent (all optional)

---

### `DELETE /delete-agent/{agent_id}`

**Delete Agent**

Delete a voice agent.

---

### `POST /publish-agent/{agent_id}`

**Publish Agent**

Publish an agent version.

---

### `GET /get-agent-versions/{agent_id}`

**Get Agent Versions**

List all versions of an agent.

---

## Chat Agent

### `POST /create-chat-agent`

**Create Chat Agent**

Create a new chat agent.

---

### `GET /get-chat-agent/{agent_id}`

**Get Chat Agent**

Retrieve chat agent details.

---

### `GET /list-chat-agents`

**List Chat Agents**

List all chat agents.

---

### `PATCH /update-chat-agent/{agent_id}`

**Update Chat Agent**

Update chat agent configuration.

---

### `DELETE /delete-chat-agent/{agent_id}`

**Delete Chat Agent**

Delete a chat agent.

---

### `POST /publish-chat-agent/{agent_id}`

**Publish Chat Agent**

Publish a chat agent version.

---

### `GET /get-chat-agent-versions/{agent_id}`

**Get Chat Agent Versions**

List versions of a chat agent.

---

## Retell LLM Response Engine

### `POST /create-retell-llm`

**Create Retell LLM**

Create a new Retell LLM response engine.

**Request Body:**

- **model**: `string` - LLM model (default "gpt-4.1")
- **s2s_model**: `string` - Speech-to-speech model (alternative to model)
- **general_prompt**: `string` - System prompt for the agent
- **general_tools**: `object[]` - Tools/functions available to the agent
- **states**: `object[]` - Multi-state configuration
- **starting_state**: `string` - Initial state name
- **begin_message**: `string` - First message the agent speaks
- **inbound_dynamic_variables_webhook_url**: `string` - Webhook for dynamic variables
- **knowledge_base_ids**: `string[]` - Knowledge base IDs to use

**Tool Types:**

- **end_call**: End the call
- **transfer_call**: Transfer to another number
- **check_availability_cal**: Check calendar availability
- **book_appointment_cal**: Book appointment via Cal.com
- **send_sms**: Send SMS
- **send_email**: Send email
- **custom**: Custom function (calls your webhook)

---

### `GET /get-retell-llm/{llm_id}`

**Get Retell LLM**

Retrieve LLM configuration.

---

### `GET /list-retell-llms`

**List Retell LLMs**

List all Retell LLM configurations.

---

### `PATCH /update-retell-llm/{llm_id}`

**Update Retell LLM**

Update LLM configuration.

---

### `DELETE /delete-retell-llm/{llm_id}`

**Delete Retell LLM**

Delete an LLM configuration.

---

## Conversation Flow Response Engine

### `POST /create-conversation-flow`

**Create Conversation Flow**

Create a new conversation flow.

---

### `GET /get-conversation-flow/{flow_id}`

**Get Conversation Flow**

Retrieve conversation flow details.

---

### `GET /list-conversation-flows`

**List Conversation Flows**

List all conversation flows.

---

### `PATCH /update-conversation-flow/{flow_id}`

**Update Conversation Flow**

Update a conversation flow.

---

### `DELETE /delete-conversation-flow/{flow_id}`

**Delete Conversation Flow**

Delete a conversation flow.

---

## Knowledge Base

### `POST /create-knowledge-base`

**Create Knowledge Base**

Create a new knowledge base.

**Request Body:**

- **knowledge_base_name** *(required)*: `string` - Name
- **enable_auto_refresh**: `boolean` - Auto-refresh from sources

---

### `GET /get-knowledge-base/{knowledge_base_id}`

**Get Knowledge Base**

Retrieve knowledge base details.

---

### `GET /list-knowledge-bases`

**List Knowledge Bases**

List all knowledge bases.

---

### `DELETE /delete-knowledge-base/{knowledge_base_id}`

**Delete Knowledge Base**

Delete a knowledge base.

---

### `POST /add-knowledge-base-sources/{knowledge_base_id}`

**Add Knowledge Base Sources**

Add sources to a knowledge base.

**Request Body:**

- **sources** *(required)*: `object[]` - Array of sources
  - **type**: `string` - "url", "text", "document"
  - **url**: `string` - URL to scrape
  - **text_content**: `string` - Raw text
  - **file_name**: `string` - Document filename

---

### `DELETE /delete-knowledge-base-source/{knowledge_base_id}/{source_id}`

**Delete Knowledge Base Source**

Remove a source from knowledge base.

---

## Voice

### `POST /add-voice`

**Add Voice**

Add a custom voice.

---

### `POST /clone-voice`

**Clone Voice**

Clone a voice from audio samples.

---

### `POST /search-voice`

**Search Voice**

Search available voices.

---

### `GET /get-voice/{voice_id}`

**Get Voice**

Retrieve voice details.

---

### `GET /list-voices`

**List Voices**

List all available voices.

---

## Batch Call

### `POST /create-batch-call`

**Create Batch Call**

Create multiple outbound calls.

**Request Body:**

- **from_number** *(required)*: `string` - Phone number to call from
- **tasks** *(required)*: `object[]` - Array of call tasks
  - **to_number** *(required)*: `string` - Number to call
  - **retell_llm_dynamic_variables**: `object` - Dynamic variables

---

## Account

### `GET /get-concurrency`

**Get Concurrency**

Get current concurrency usage and limits.

**Response:**

- **current_concurrency**: `integer` - Active concurrent calls
- **concurrency_limit**: `integer` - Maximum allowed

---

## Custom Telephony

### `POST /import-phone-number`

**Import Phone Number**

Import a phone number from external telephony provider.

**Request Body:**

- **phone_number** *(required)*: `string` - Phone number to import
- **termination_uri** *(required)*: `string` - SIP termination URI
- **inbound_agent_id**: `string` - Agent for inbound calls
- **outbound_agent_id**: `string` - Agent for outbound calls

---

### `POST /register-phone-call`

**Register Phone Call**

Register a call from custom telephony integration.

**Request Body:**

- **agent_id** *(required)*: `string` - Agent ID
- **audio_encoding** *(required)*: `string` - "s16le", "mulaw"
- **audio_websocket_protocol** *(required)*: `string` - "twilio", "vonage", "telnyx", "web"
- **sample_rate** *(required)*: `integer` - Sample rate (8000, 16000, 24000, 48000)
- **from_number**: `string` - Caller number
- **to_number**: `string` - Called number

**Response:**

- **call_id**: `string` - Unique call ID
- **agent_id**: `string` - Agent ID
- **sample_rate**: `integer` - Confirmed sample rate

---

## Custom LLM WebSocket

### `wss://api.retellai.com/custom-llm-websocket/{call_id}`

**LLM WebSocket**

WebSocket connection for custom LLM integration.

**Message Types (from Retell):**

- **config**: Initial configuration with call details
- **response_required**: Request for LLM response
  - **interaction_type**: "reminder_required", "update_only", etc.
  - **transcript**: Array of conversation messages

**Message Types (to Retell):**

- **response**: LLM response
  - **response_id**: `integer` - Response ID from request
  - **content**: `string` - Response text
  - **content_complete**: `boolean` - Whether response is complete
  - **end_call**: `boolean` - Whether to end the call

---

## Common Response Schemas

### Call Object

```json
{
  "call_id": "string",
  "agent_id": "string",
  "call_type": "inbound_phone_call" | "outbound_phone_call" | "web_call",
  "call_status": "registered" | "ongoing" | "ended" | "error",
  "start_timestamp": 1234567890,
  "end_timestamp": 1234567890,
  "transcript": "string",
  "transcript_object": [
    {
      "role": "agent" | "user",
      "content": "string"
    }
  ],
  "recording_url": "string",
  "public_log_url": "string",
  "call_analysis": {
    "call_successful": true,
    "call_summary": "string",
    "custom_analysis_data": {}
  },
  "metadata": {},
  "from_number": "string",
  "to_number": "string"
}
```

### Agent Object

```json
{
  "agent_id": "string",
  "agent_name": "string",
  "version": 0,
  "voice_id": "string",
  "response_engine": {
    "type": "retell-llm",
    "llm_id": "string"
  },
  "language": "en-US",
  "last_modification_timestamp": 1234567890
}
```

### Retell LLM Object

```json
{
  "llm_id": "string",
  "model": "gpt-4.1",
  "general_prompt": "string",
  "begin_message": "string",
  "general_tools": [],
  "states": [],
  "last_modification_timestamp": 1234567890
}
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid or missing API key |
| 404 | Not Found - Resource doesn't exist |
| 422 | Validation Error - Request validation failed |
| 429 | Rate Limit - Too many requests |
| 500 | Internal Server Error |

---

## Webhooks

Retell sends webhook events for call lifecycle events. Configure webhook URL at agent or account level.

**Event Types:**

- `call_started`: Call has started
- `call_ended`: Call has ended
- `call_analyzed`: Post-call analysis complete

**Webhook Payload:**

```json
{
  "event": "call_ended",
  "call": {
    "call_id": "string",
    "agent_id": "string",
    "call_type": "string",
    "call_status": "string",
    "transcript": "string",
    "call_analysis": {}
  }
}
```

**Signature Verification:**

Verify webhook authenticity using the `X-Retell-Signature` header. The signature is an HMAC-SHA256 of the request body using your secret key.

---

## SDK Examples

### Node.js/TypeScript

```javascript
import Retell from 'retell-sdk';

const client = new Retell({
  apiKey: 'YOUR_RETELL_API_KEY',
});

// Create an agent
const agent = await client.agent.create({
  response_engine: { 
    llm_id: 'llm_xxxxx', 
    type: 'retell-llm' 
  },
  voice_id: '11labs-Adrian',
});

// Create a phone call
const call = await client.call.createPhoneCall({
  from_number: '+14155551234',
  to_number: '+14155555678',
  agent_id: agent.agent_id,
});

// List calls
const calls = await client.call.list();
```

### Python

```python
from retell import Retell

client = Retell(api_key="YOUR_RETELL_API_KEY")

# Create an agent
agent = client.agent.create(
    response_engine={"llm_id": "llm_xxxxx", "type": "retell-llm"},
    voice_id="11labs-Adrian"
)

# Create a phone call
call = client.call.create_phone_call(
    from_number="+14155551234",
    to_number="+14155555678",
    agent_id=agent.agent_id
)
```

---

## Available Voices

### ElevenLabs Voices
- `11labs-Adrian`, `11labs-Brian`, `11labs-Chris`
- `11labs-Alice`, `11labs-Aria`, `11labs-Charlotte`
- And many more...

### OpenAI Voices
- `openai-Alloy`, `openai-Echo`, `openai-Fable`
- `openai-Onyx`, `openai-Nova`, `openai-Shimmer`

### Deepgram Voices
- `deepgram-Angus`, `deepgram-Arcas`, `deepgram-Athena`
- And more...

### Cartesia Voices
- Various high-quality voices

Use `GET /list-voices` to get the full list with previews.

---

## Supported Languages

- English: `en-US`, `en-GB`, `en-AU`, `en-IN`, `en-NZ`
- Spanish: `es-ES`, `es-419`
- French: `fr-FR`, `fr-CA`
- German: `de-DE`
- Portuguese: `pt-BR`, `pt-PT`
- Chinese: `zh-CN`, `yue-CN`
- Japanese: `ja-JP`
- Korean: `ko-KR`
- Italian: `it-IT`
- Dutch: `nl-NL`, `nl-BE`
- Polish: `pl-PL`
- Russian: `ru-RU`
- Turkish: `tr-TR`
- Vietnamese: `vi-VN`
- Hindi: `hi-IN`
- Arabic: `ar-SA`
- Hebrew: `he-IL`
- And 30+ more languages...
- Multilingual: `multi`
