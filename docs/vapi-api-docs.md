# VAPI API Reference

**Version:** 1.0
**Base URL:** `https://api.vapi.ai`

## Authentication

All endpoints require Bearer token authentication:
```
Authorization: Bearer YOUR_API_KEY
```

## Analytics

### `POST /analytics`

**Create Analytics Queries**

**Request Body:**

- **queries** *(required)*: array of `object`
  - This is the list of metric queries you want to perform.

**Responses:**

- `200`: 
- `201`: 

---

## Assistant

### `POST /assistant`

**Create Assistant**

**Request Body:**

- **transcriber**: `object`
  - These are the options for the assistant's transcriber.
- **model**: `object`
  - These are the options for the assistant's LLM.
- **voice**: `object`
  - These are the options for the assistant's voice.
- **firstMessage**: `string`
- **firstMessageInterruptionsEnabled**: `boolean`
- **firstMessageMode**: enum [`assistant-speaks-first`, `assistant-speaks-first-with-model-generated-message`, `assistant-waits-for-user`]
- **voicemailDetection**: `object`
- **clientMessages**: enum [`conversation-update`, `function-call`, `function-call-result`, `hang`, `language-changed`, `metadata`, `model-output`, `speech-update`, `status-update`, `transcript`]
- **serverMessages**: enum [`assistant.started`, `conversation-update`, `end-of-call-report`, `function-call`, `hang`, `language-changed`, `language-change-detected`, `model-output`, `phone-call-control`, `speech-update`]
- **maxDurationSeconds**: `number`
  - This is the maximum number of seconds that the call will last. When the call reaches this duration, it will be ended.

@default 600 (10 minutes)
- **backgroundSound**: `object`
  - This is the background sound in the call. Default for phone calls is 'office' and default for web calls is 'off'.
You can also provide a custom sound by providing a URL to an audio file.
- **modelOutputInMessagesEnabled**: `boolean`
  - This determines whether the model's output is used in conversation history rather than the transcription of assistant's speech.

Default `false` while in beta.

@default false
- **transportConfigurations**: array of `object`
- **observabilityPlan**: `object`
  - This is the plan for observability of assistant's calls.

Currently, only Langfuse is supported.
- **credentials**: array of `object`
- **hooks**: array of `object`
  - This is a set of actions that will be performed on certain events.
- **name**: `string`
  - This is the name of the assistant.

This is required when you want to transfer between assistants in a call.
- **voicemailMessage**: `string`
  - This is the message that the assistant will say if the call is forwarded to voicemail.

If unspecified, it will hang up.
- **endCallMessage**: `string`
  - This is the message that the assistant will say if it ends the call.

If unspecified, it will hang up without saying anything.
- **endCallPhrases**: array of `string`
  - This list contains phrases that, if spoken by the assistant, will trigger the call to be hung up. Case insensitive.
- **compliancePlan**: `object`
- **metadata**: `object`
  - This is for metadata you want to store on the assistant.
- **backgroundSpeechDenoisingPlan**: `object`
- **analysisPlan**: `object`
  - This is the plan for analysis of assistant's calls. Stored in `call.analysis`.
- **artifactPlan**: `object`
  - This is the plan for artifacts generated during assistant's calls. Stored in `call.artifact`.
- **startSpeakingPlan**: `object`
- **stopSpeakingPlan**: `object`
- **monitorPlan**: `object`
- **credentialIds**: array of `string`
  - These are the credentials that will be used for the assistant calls. By default, all the credentials are available for use in the call but you can provide a subset using this.
- **server**: `object`

**Responses:**

- `201`: 

---

### `GET /assistant`

**List Assistants**

**Parameters:**

- **limit** (query): `number`
- **createdAtGt** (query): `string`
- **createdAtLt** (query): `string`
- **createdAtGe** (query): `string`
- **createdAtLe** (query): `string`
- **updatedAtGt** (query): `string`
- **updatedAtLt** (query): `string`
- **updatedAtGe** (query): `string`
- **updatedAtLe** (query): `string`

**Responses:**

- `200`: 

---

### `GET /assistant/{id}`

**Get Assistant**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

### `PATCH /assistant/{id}`

**Update Assistant**

**Parameters:**

- **id** (path) *(required)*: `string`

**Request Body:**

- **transcriber**: `object`
  - These are the options for the assistant's transcriber.
- **model**: `object`
  - These are the options for the assistant's LLM.
- **voice**: `object`
  - These are the options for the assistant's voice.
- **firstMessage**: `string`
- **firstMessageInterruptionsEnabled**: `boolean`
- **firstMessageMode**: enum [`assistant-speaks-first`, `assistant-speaks-first-with-model-generated-message`, `assistant-waits-for-user`]
- **voicemailDetection**: `object`
- **clientMessages**: enum [`conversation-update`, `function-call`, `function-call-result`, `hang`, `language-changed`, `metadata`, `model-output`, `speech-update`, `status-update`, `transcript`]
- **serverMessages**: enum [`assistant.started`, `conversation-update`, `end-of-call-report`, `function-call`, `hang`, `language-changed`, `language-change-detected`, `model-output`, `phone-call-control`, `speech-update`]
- **maxDurationSeconds**: `number`
  - This is the maximum number of seconds that the call will last. When the call reaches this duration, it will be ended.

@default 600 (10 minutes)
- **backgroundSound**: `object`
  - This is the background sound in the call. Default for phone calls is 'office' and default for web calls is 'off'.
You can also provide a custom sound by providing a URL to an audio file.
- **modelOutputInMessagesEnabled**: `boolean`
  - This determines whether the model's output is used in conversation history rather than the transcription of assistant's speech.

Default `false` while in beta.

@default false
- **transportConfigurations**: array of `object`
- **observabilityPlan**: `object`
  - This is the plan for observability of assistant's calls.

Currently, only Langfuse is supported.
- **credentials**: array of `object`
- **hooks**: array of `object`
  - This is a set of actions that will be performed on certain events.
- **name**: `string`
  - This is the name of the assistant.

This is required when you want to transfer between assistants in a call.
- **voicemailMessage**: `string`
  - This is the message that the assistant will say if the call is forwarded to voicemail.

If unspecified, it will hang up.
- **endCallMessage**: `string`
  - This is the message that the assistant will say if it ends the call.

If unspecified, it will hang up without saying anything.
- **endCallPhrases**: array of `string`
  - This list contains phrases that, if spoken by the assistant, will trigger the call to be hung up. Case insensitive.
- **compliancePlan**: `object`
- **metadata**: `object`
  - This is for metadata you want to store on the assistant.
- **backgroundSpeechDenoisingPlan**: `object`
- **analysisPlan**: `object`
  - This is the plan for analysis of assistant's calls. Stored in `call.analysis`.
- **artifactPlan**: `object`
  - This is the plan for artifacts generated during assistant's calls. Stored in `call.artifact`.
- **startSpeakingPlan**: `object`
- **stopSpeakingPlan**: `object`
- **monitorPlan**: `object`
- **credentialIds**: array of `string`
  - These are the credentials that will be used for the assistant calls. By default, all the credentials are available for use in the call but you can provide a subset using this.
- **server**: `object`

**Responses:**

- `200`: 

---

### `DELETE /assistant/{id}`

**Delete Assistant**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

## Call

### `POST /call`

**Create Call**

**Request Body:**

- **customers**: array of `object`
  - This is used to issue batch calls to multiple customers.

Only relevant for `outboundPhoneCall`. To call a single customer, use `customer` instead.
- **name**: `string`
  - This is the name of the call. This is just for your own reference.
- **schedulePlan**: `object`
  - This is the schedule plan of the call.
- **transport**: `object`
  - This is the transport of the call.
- **assistantId**: `string`
- **assistant**: `object`
- **assistantOverrides**: `object`
  - These are the overrides for the `assistant` or `assistantId`'s settings and template variables.
- **squadId**: `string`
- **squad**: `object`
- **squadOverrides**: `object`
  - These are the overrides for the `squad` or `squadId`'s member settings and template variables.
This will apply to all members of the squad.
- **workflowId**: `string`
- **workflow**: `object`
- **workflowOverrides**: `object`
  - These are the overrides for the `workflow` or `workflowId`'s settings and template variables.
- **phoneNumberId**: `string`
  - This is the phone number that will be used for the call. To use a transient number, use `phoneNumber` instead.

Only relevant for `outboundPhoneCall` and `inboundPhoneCall` type.
- **phoneNumber**: `object`
  - This is the phone number that will be used for the call. To use an existing number, use `phoneNumberId` instead.

Only relevant for `outboundPhoneCall` and `inboundPhoneCall` type.
- **customerId**: `string`
  - This is the customer that will be called. To call a transient customer , use `customer` instead.

Only relevant for `outboundPhoneCall` and `inboundPhoneCall` type.
- **customer**: `object`
  - This is the customer that will be called. To call an existing customer, use `customerId` instead.

Only relevant for `outboundPhoneCall` and `inboundPhoneCall` type.

**Responses:**

- `201`: 

---

### `GET /call`

**List Calls**

**Parameters:**

- **id** (query): `string`
- **assistantId** (query): `string`
- **phoneNumberId** (query): `string`
- **limit** (query): `number`
- **createdAtGt** (query): `string`
- **createdAtLt** (query): `string`
- **createdAtGe** (query): `string`
- **createdAtLe** (query): `string`
- **updatedAtGt** (query): `string`
- **updatedAtLt** (query): `string`
- **updatedAtGe** (query): `string`
- **updatedAtLe** (query): `string`

**Responses:**

- `200`: 

---

### `GET /call/{id}`

**Get Call**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

### `PATCH /call/{id}`

**Update Call**

**Parameters:**

- **id** (path) *(required)*: `string`

**Request Body:**

- **name**: `string`
  - This is the name of the call. This is just for your own reference.

**Responses:**

- `200`: 

---

### `DELETE /call/{id}`

**Delete Call**

**Request Body:**

- **ids**: array of `string`

**Responses:**

- `200`: 

---

## Campaign

### `POST /campaign`

**Create Campaign**

**Request Body:**

- **name** *(required)*: `string`
  - This is the name of the campaign. This is just for your own reference.
- **assistantId**: `string`
  - This is the assistant ID that will be used for the campaign calls. Note: Only one of assistantId, workflowId, or squadId can be used.
- **workflowId**: `string`
  - This is the workflow ID that will be used for the campaign calls. Note: Only one of assistantId, workflowId, or squadId can be used.
- **squadId**: `string`
  - This is the squad ID that will be used for the campaign calls. Note: Only one of assistantId, workflowId, or squadId can be used.
- **phoneNumberId**: `string`
  - This is the phone number ID that will be used for the campaign calls. Required if dialPlan is not provided. Note: phoneNumberId and dialPlan are mutually exclusive.
- **dialPlan**: array of `object`
- **schedulePlan**: `object`
- **customers**: array of `object`
  - These are the customers that will be called in the campaign. Required if dialPlan is not provided.

**Responses:**

- `201`: 

---

### `GET /campaign`

**List Campaigns**

**Parameters:**

- **id** (query): `string`
- **status** (query): `string`
- **page** (query): `number`
- **sortOrder** (query): `string`
- **limit** (query): `number`
- **createdAtGt** (query): `string`
- **createdAtLt** (query): `string`
- **createdAtGe** (query): `string`
- **createdAtLe** (query): `string`
- **updatedAtGt** (query): `string`
- **updatedAtLt** (query): `string`
- **updatedAtGe** (query): `string`
- **updatedAtLe** (query): `string`

**Responses:**

- `200`: 

---

### `GET /campaign/{id}`

**Get Campaign**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

### `PATCH /campaign/{id}`

**Update Campaign**

**Parameters:**

- **id** (path) *(required)*: `string`

**Request Body:**

- **name**: `string`
  - This is the name of the campaign. This is just for your own reference.
- **assistantId**: `string`
  - This is the assistant ID that will be used for the campaign calls.
Can only be updated if campaign is not in progress or has ended.
- **workflowId**: `string`
  - This is the workflow ID that will be used for the campaign calls.
Can only be updated if campaign is not in progress or has ended.
- **squadId**: `string`
  - This is the squad ID that will be used for the campaign calls.
Can only be updated if campaign is not in progress or has ended.
- **phoneNumberId**: `string`
  - This is the phone number ID that will be used for the campaign calls.
Can only be updated if campaign is not in progress or has ended.
Note: `phoneNumberId` and `dialPlan` are mutually exclusive.
- **dialPlan**: array of `object`
- **schedulePlan**: `object`
  - This is the schedule plan for the campaign.
Can only be updated if campaign is not in progress or has ended.
- **status**: enum [`ended`]

**Responses:**

- `200`: 

---

### `DELETE /campaign/{id}`

**Delete Campaign**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

## Chat

### `GET /chat`

**List Chats**

**Parameters:**

- **id** (query): `string`
- **assistantId** (query): `string`
- **assistantIdAny** (query): `string`
- **squadId** (query): `string`
- **sessionId** (query): `string`
- **previousChatId** (query): `string`
- **page** (query): `number`
- **sortOrder** (query): `string`
- **limit** (query): `number`
- **createdAtGt** (query): `string`
- **createdAtLt** (query): `string`
- **createdAtGe** (query): `string`
- **createdAtLe** (query): `string`
- **updatedAtGt** (query): `string`
- **updatedAtLt** (query): `string`
- **updatedAtGe** (query): `string`
- **updatedAtLe** (query): `string`

**Responses:**

- `200`: 

---

### `POST /chat`

**Create Chat**

Creates a new chat with optional SMS delivery via transport field. Requires at least one of: assistantId/assistant, sessionId, or previousChatId. Note: sessionId and previousChatId are mutually exclusive. Transport field enables SMS delivery with two modes: (1) New conversation - provide transport.phoneNumberId and transport.customer to create a new session, (2) Existing conversation - provide sessionId to use existing session data. Cannot specify both sessionId and transport fields together. Th

**Request Body:**

- **assistantId**: `string`
  - This is the assistant that will be used for the chat. To use an existing assistant, use `assistantId` instead.
- **assistant**: `object`
  - This is the assistant that will be used for the chat. To use an existing assistant, use `assistantId` instead.
- **assistantOverrides**: `object`
- **squadId**: `string`
  - This is the squad that will be used for the chat. To use a transient squad, use `squad` instead.
- **squad**: `object`
  - This is the squad that will be used for the chat. To use an existing squad, use `squadId` instead.
- **name**: `string`
  - This is the name of the chat. This is just for your own reference.
- **sessionId**: `string`
  - This is the ID of the session that will be used for the chat.
Mutually exclusive with previousChatId.
- **input** *(required)*: `object`
  - This is the input text for the chat.
Can be a string or an array of chat messages.
This field is REQUIRED for chat creation.
- **stream**: `boolean`
  - This is a flag that determines whether the response should be streamed.
When true, the response will be sent as chunks of text.
- **previousChatId**: `string`
  - This is the ID of the chat that will be used as context for the new chat.
The messages from the previous chat will be used as context.
Mutually exclusive with sessionId.
- **transport**: `object`

**Responses:**

- `200`: Chat response - either non-streaming chat or streaming
- `201`: 

---

### `POST /chat/responses`

**Create Chat (OpenAI Compatible)**

**Request Body:**

- **assistantId**: `string`
  - This is the assistant that will be used for the chat. To use an existing assistant, use `assistantId` instead.
- **assistant**: `object`
  - This is the assistant that will be used for the chat. To use an existing assistant, use `assistantId` instead.
- **assistantOverrides**: `object`
- **squadId**: `string`
  - This is the squad that will be used for the chat. To use a transient squad, use `squad` instead.
- **squad**: `object`
  - This is the squad that will be used for the chat. To use an existing squad, use `squadId` instead.
- **name**: `string`
  - This is the name of the chat. This is just for your own reference.
- **sessionId**: `string`
  - This is the ID of the session that will be used for the chat.
Mutually exclusive with previousChatId.
- **input** *(required)*: `object`
  - This is the input text for the chat.
Can be a string or an array of chat messages.
This field is REQUIRED for chat creation.
- **stream**: `boolean`
  - Whether to stream the response or not.
- **previousChatId**: `string`
  - This is the ID of the chat that will be used as context for the new chat.
The messages from the previous chat will be used as context.
Mutually exclusive with sessionId.
- **transport**: `object`

**Responses:**

- `200`: OpenAI Responses API format - either non-streaming or streaming
- `201`: 

---

### `GET /chat/{id}`

**Get Chat**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

### `DELETE /chat/{id}`

**Delete Chat**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

## Eval

### `POST /eval`

**Create Eval**

**Request Body:**

- **messages** *(required)*: array of `object`
- **name**: `string`
  - This is the name of the eval.
It helps identify what the eval is checking for.
- **description**: `string`
  - This is the description of the eval.
This helps describe the eval and its purpose in detail. It will not be used to evaluate the flow of the conversation.
- **type** *(required)*: enum [`chat.mockConversation`]
  - This is the type of the eval.
Currently it is fixed to `chat.mockConversation`.

**Responses:**

- `201`: 

---

### `GET /eval`

**List Evals**

**Parameters:**

- **id** (query): `string`
- **page** (query): `number`
- **sortOrder** (query): `string`
- **limit** (query): `number`
- **createdAtGt** (query): `string`
- **createdAtLt** (query): `string`
- **createdAtGe** (query): `string`
- **createdAtLe** (query): `string`
- **updatedAtGt** (query): `string`
- **updatedAtLt** (query): `string`
- **updatedAtGe** (query): `string`
- **updatedAtLe** (query): `string`

**Responses:**

- `200`: 

---

### `POST /eval/run`

**Create Eval Run**

**Request Body:**

- **eval**: `object`
  - This is the transient eval that will be run
- **target** *(required)*: `object`
  - This is the target that will be run against the eval
- **type** *(required)*: enum [`eval`]
  - This is the type of the run.
Currently it is fixed to `eval`.
- **evalId**: `string`
  - This is the id of the eval that will be run.

**Responses:**

- `200`: 
- `201`: 

---

### `GET /eval/run`

**List Eval Runs**

**Parameters:**

- **id** (query): `string`
- **page** (query): `number`
- **sortOrder** (query): `string`
- **limit** (query): `number`
- **createdAtGt** (query): `string`
- **createdAtLt** (query): `string`
- **createdAtGe** (query): `string`
- **createdAtLe** (query): `string`
- **updatedAtGt** (query): `string`
- **updatedAtLt** (query): `string`
- **updatedAtGe** (query): `string`
- **updatedAtLe** (query): `string`

**Responses:**

- `200`: 

---

### `DELETE /eval/run/{id}`

**Delete Eval Run**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

### `GET /eval/run/{id}`

**Get Eval Run**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

### `PATCH /eval/{id}`

**Update Eval**

**Parameters:**

- **id** (path) *(required)*: `string`

**Request Body:**

- **messages**: array of `object`
- **name**: `string`
  - This is the name of the eval.
It helps identify what the eval is checking for.
- **description**: `string`
  - This is the description of the eval.
This helps describe the eval and its purpose in detail. It will not be used to evaluate the flow of the conversation.
- **type**: enum [`chat.mockConversation`]
  - This is the type of the eval.
Currently it is fixed to `chat.mockConversation`.

**Responses:**

- `200`: 

---

### `DELETE /eval/{id}`

**Delete Eval**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

### `GET /eval/{id}`

**Get Eval**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

## File

### `POST /file`

**Upload File**

**Responses:**

- `201`: File uploaded successfully
- `400`: Invalid file

---

### `GET /file`

**List Files**

**Responses:**

- `200`: 

---

### `GET /file/{id}`

**Get File**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

### `PATCH /file/{id}`

**Update File**

**Parameters:**

- **id** (path) *(required)*: `string`

**Request Body:**

- **name**: `string`
  - This is the name of the file. This is just for your own reference.

**Responses:**

- `200`: 

---

### `DELETE /file/{id}`

**Delete File**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

## Observability

### `GET /observability/scorecard`

**List Scorecards**

**Parameters:**

- **id** (query): `string`
- **page** (query): `number`
- **sortOrder** (query): `string`
- **limit** (query): `number`
- **createdAtGt** (query): `string`
- **createdAtLt** (query): `string`
- **createdAtGe** (query): `string`
- **createdAtLe** (query): `string`
- **updatedAtGt** (query): `string`
- **updatedAtLt** (query): `string`
- **updatedAtGe** (query): `string`
- **updatedAtLe** (query): `string`

**Responses:**

- `200`: 

---

### `POST /observability/scorecard`

**Create Scorecard**

**Request Body:**

- **name**: `string`
  - This is the name of the scorecard. It is only for user reference and will not be used for any evaluation.
- **description**: `string`
  - This is the description of the scorecard. It is only for user reference and will not be used for any evaluation.
- **metrics** *(required)*: array of `object`
  - These are the metrics that will be used to evaluate the scorecard.
Each metric will have a set of conditions and points that will be used to generate the score.
- **assistantIds**: array of `string`
  - These are the assistant IDs that this scorecard is linked to.
When linked to assistants, this scorecard will be available for evaluation during those assistants' calls.

**Responses:**

- `201`: 

---

### `GET /observability/scorecard/{id}`

**Get Scorecard**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

### `PATCH /observability/scorecard/{id}`

**Update Scorecard**

**Parameters:**

- **id** (path) *(required)*: `string`

**Request Body:**

- **name**: `string`
  - This is the name of the scorecard. It is only for user reference and will not be used for any evaluation.
- **description**: `string`
  - This is the description of the scorecard. It is only for user reference and will not be used for any evaluation.
- **metrics**: array of `object`
  - These are the metrics that will be used to evaluate the scorecard.
Each metric will have a set of conditions and points that will be used to generate the score.
- **assistantIds**: array of `string`
  - These are the assistant IDs that this scorecard is linked to.
When linked to assistants, this scorecard will be available for evaluation during those assistants' calls.

**Responses:**

- `200`: 

---

### `DELETE /observability/scorecard/{id}`

**Delete Scorecard**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

## Phone Number

### `POST /phone-number`

**Create Phone Number**

**Request Body:**

- **oneOf**:
  - Option 1: `object`
  - Option 2: `object`
  - Option 3: `object`
  - Option 4: `object`
  - Option 5: `object`

**Responses:**

- `201`: 

---

### `GET /phone-number`

**List Phone Numbers**

**Parameters:**

- **limit** (query): `number`
- **createdAtGt** (query): `string`
- **createdAtLt** (query): `string`
- **createdAtGe** (query): `string`
- **createdAtLe** (query): `string`
- **updatedAtGt** (query): `string`
- **updatedAtLt** (query): `string`
- **updatedAtGe** (query): `string`
- **updatedAtLe** (query): `string`

**Responses:**

- `200`: 

---

### `GET /phone-number/{id}`

**Get Phone Number**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

### `PATCH /phone-number/{id}`

**Update Phone Number**

**Parameters:**

- **id** (path) *(required)*: `string`

**Request Body:**

- **oneOf**:
  - Option 1: `object`
  - Option 2: `object`
  - Option 3: `object`
  - Option 4: `object`
  - Option 5: `object`

**Responses:**

- `200`: 

---

### `DELETE /phone-number/{id}`

**Delete Phone Number**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

## Provider

### `POST /provider/{provider}/{resourceName}`

**Create Provider Resource**

**Parameters:**

- **content-type** (header) *(required)*: `string`
- **provider** (path) *(required)*: `string`
- **resourceName** (path) *(required)*: `string`

**Responses:**

- `201`: Successfully created provider resource

---

### `GET /provider/{provider}/{resourceName}`

**List Provider Resources**

**Parameters:**

- **provider** (path) *(required)*: `string`
- **resourceName** (path) *(required)*: `string`
- **id** (query): `string`
- **resourceId** (query): `string`
- **page** (query): `number`
- **sortOrder** (query): `string`
- **limit** (query): `number`
- **createdAtGt** (query): `string`
- **createdAtLt** (query): `string`
- **createdAtGe** (query): `string`
- **createdAtLe** (query): `string`
- **updatedAtGt** (query): `string`
- **updatedAtLt** (query): `string`
- **updatedAtGe** (query): `string`
- **updatedAtLe** (query): `string`

**Responses:**

- `200`: List of provider resources

---

### `GET /provider/{provider}/{resourceName}/{id}`

**Get Provider Resource**

**Parameters:**

- **provider** (path) *(required)*: `string`
- **resourceName** (path) *(required)*: `string`
- **id** (path) *(required)*: `string`

**Responses:**

- `200`: Successfully retrieved provider resource
- `404`: Provider resource not found

---

### `DELETE /provider/{provider}/{resourceName}/{id}`

**Delete Provider Resource**

**Parameters:**

- **provider** (path) *(required)*: `string`
- **resourceName** (path) *(required)*: `string`
- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 
- `404`: Provider resource not found

---

### `PATCH /provider/{provider}/{resourceName}/{id}`

**Update Provider Resource**

**Parameters:**

- **provider** (path) *(required)*: `string`
- **resourceName** (path) *(required)*: `string`
- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 
- `404`: Provider resource not found

---

## Reporting

### `POST /reporting/insight`

**Create Insight**

**Request Body:**

- **oneOf**:
  - Option 1: `object`
  - Option 2: `object`
  - Option 3: `object`
  - Option 4: `object`

**Responses:**

- `201`: 

---

### `GET /reporting/insight`

**Get Insights**

**Parameters:**

- **id** (query): `string`
- **page** (query): `number`
- **sortOrder** (query): `string`
- **limit** (query): `number`
- **createdAtGt** (query): `string`
- **createdAtLt** (query): `string`
- **createdAtGe** (query): `string`
- **createdAtLe** (query): `string`
- **updatedAtGt** (query): `string`
- **updatedAtLt** (query): `string`
- **updatedAtGe** (query): `string`
- **updatedAtLe** (query): `string`

**Responses:**

- `200`: 

---

### `POST /reporting/insight/preview`

**Preview Insight**

**Request Body:**

- **oneOf**:
  - Option 1: `object`
  - Option 2: `object`
  - Option 3: `object`
  - Option 4: `object`

**Responses:**

- `200`: 
- `201`: 

---

### `PATCH /reporting/insight/{id}`

**Update Insight**

**Parameters:**

- **id** (path) *(required)*: `string`

**Request Body:**

- **oneOf**:
  - Option 1: `object`
  - Option 2: `object`
  - Option 3: `object`
  - Option 4: `object`

**Responses:**

- `200`: 

---

### `GET /reporting/insight/{id}`

**Get Insight**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

### `DELETE /reporting/insight/{id}`

**Delete Insight**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

### `POST /reporting/insight/{id}/run`

**Run Insight**

**Parameters:**

- **id** (path) *(required)*: `string`

**Request Body:**

- **formatPlan**: `object`
- **timeRangeOverride**: `object`

**Responses:**

- `200`: 
- `201`: 

---

## Session

### `POST /session`

**Create Session**

**Request Body:**

- **name**: `string`
  - This is a user-defined name for the session. Maximum length is 40 characters.
- **status**: enum [`active`, `completed`]
  - This is the current status of the session. Can be either 'active' or 'completed'.
- **expirationSeconds**: `number`
  - Session expiration time in seconds. Defaults to 24 hours (86400 seconds) if not set.
- **assistantId**: `string`
  - This is the ID of the assistant associated with this session. Use this when referencing an existing assistant.
- **assistant**: `object`
  - This is the assistant configuration for this session. Use this when creating a new assistant configuration.
If assistantId is provided, this will be ignored.
- **assistantOverrides**: `object`
- **squadId**: `string`
  - This is the squad ID associated with this session. Use this when referencing an existing squad.
- **squad**: `object`
  - This is the squad configuration for this session. Use this when creating a new squad configuration.
If squadId is provided, this will be ignored.
- **messages**: array of `object`
  - This is an array of chat messages in the session.
- **customer**: `object`
  - This is the customer information associated with this session.
- **customerId**: `string`
  - This is the customerId of the customer associated with this session.
- **phoneNumberId**: `string`
  - This is the ID of the phone number associated with this session.
- **phoneNumber**: `object`
  - This is the phone number configuration for this session.

**Responses:**

- `201`: 

---

### `GET /session`

**List Sessions**

**Parameters:**

- **id** (query): `string`
- **name** (query): `string`
- **assistantId** (query): `string`
- **assistantIdAny** (query): `string`
- **squadId** (query): `string`
- **workflowId** (query): `string`
- **numberE164CheckEnabled** (query): `boolean`
- **extension** (query): `string`
- **assistantOverrides** (query): `string`
- **number** (query): `string`
- **sipUri** (query): `string`
- **name** (query): `string`
- **email** (query): `string`
- **externalId** (query): `string`
- **customerNumberAny** (query): `string`
- **phoneNumberId** (query): `string`
- **phoneNumberIdAny** (query): `array`
- **page** (query): `number`
- **sortOrder** (query): `string`
- **limit** (query): `number`
- **createdAtGt** (query): `string`
- **createdAtLt** (query): `string`
- **createdAtGe** (query): `string`
- **createdAtLe** (query): `string`
- **updatedAtGt** (query): `string`
- **updatedAtLt** (query): `string`
- **updatedAtGe** (query): `string`
- **updatedAtLe** (query): `string`

**Responses:**

- `200`: 

---

### `GET /session/{id}`

**Get Session**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

### `PATCH /session/{id}`

**Update Session**

**Parameters:**

- **id** (path) *(required)*: `string`

**Request Body:**

- **name**: `string`
  - This is the new name for the session. Maximum length is 40 characters.
- **status**: enum [`active`, `completed`]
  - This is the new status for the session.
- **expirationSeconds**: `number`
  - Session expiration time in seconds. Defaults to 24 hours (86400 seconds) if not set.
- **messages**: array of `object`
  - This is the updated array of chat messages.

**Responses:**

- `200`: 

---

### `DELETE /session/{id}`

**Delete Session**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

## Squad

### `POST /squad`

**Create Squad**

**Request Body:**

- **name**: `string`
  - This is the name of the squad.
- **members** *(required)*: array of `object`
  - This is the list of assistants that make up the squad.

The call will start with the first assistant in the list.
- **membersOverrides**: `object`

**Responses:**

- `201`: 

---

### `GET /squad`

**List Squads**

**Parameters:**

- **limit** (query): `number`
- **createdAtGt** (query): `string`
- **createdAtLt** (query): `string`
- **createdAtGe** (query): `string`
- **createdAtLe** (query): `string`
- **updatedAtGt** (query): `string`
- **updatedAtLt** (query): `string`
- **updatedAtGe** (query): `string`
- **updatedAtLe** (query): `string`

**Responses:**

- `200`: 

---

### `GET /squad/{id}`

**Get Squad**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

### `PATCH /squad/{id}`

**Update Squad**

**Parameters:**

- **id** (path) *(required)*: `string`

**Request Body:**

- **name**: `string`
  - This is the name of the squad.
- **members** *(required)*: array of `object`
  - This is the list of assistants that make up the squad.

The call will start with the first assistant in the list.
- **membersOverrides**: `object`

**Responses:**

- `200`: 

---

### `DELETE /squad/{id}`

**Delete Squad**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

## Structured Output

### `GET /structured-output`

**List Structured Outputs**

**Parameters:**

- **id** (query): `string`
- **name** (query): `string`
- **page** (query): `number`
- **sortOrder** (query): `string`
- **limit** (query): `number`
- **createdAtGt** (query): `string`
- **createdAtLt** (query): `string`
- **createdAtGe** (query): `string`
- **createdAtLe** (query): `string`
- **updatedAtGt** (query): `string`
- **updatedAtLt** (query): `string`
- **updatedAtGe** (query): `string`
- **updatedAtLe** (query): `string`

**Responses:**

- `200`: 

---

### `POST /structured-output`

**Create Structured Output**

**Request Body:**

- **model**: `object`
- **compliancePlan**: `object`
  - Compliance configuration for this output. Only enable overrides if no sensitive data will be stored.
- **name** *(required)*: `string`
  - This is the name of the structured output.
- **schema** *(required)*: `object`
- **description**: `string`
  - This is the description of what the structured output extracts.

Use this to provide context about what data will be extracted and how it will be used.
- **assistantIds**: array of `string`
  - These are the assistant IDs that this structured output is linked to.

When linked to assistants, this structured output will be available for extraction during those assistant's calls.
- **workflowIds**: array of `string`
  - These are the workflow IDs that this structured output is linked to.

When linked to workflows, this structured output will be available for extraction during those workflow's execution.

**Responses:**

- `201`: 

---

### `POST /structured-output/run`

**Run Structured Output**

**Request Body:**

- **previewEnabled**: `boolean`
- **structuredOutputId**: `string`
- **structuredOutput**: `object`
- **callIds** *(required)*: array of `string`

**Responses:**

- `200`: 
- `201`: 

---

### `GET /structured-output/{id}`

**Get Structured Output**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

### `PATCH /structured-output/{id}`

**Update Structured Output**

**Parameters:**

- **id** (path) *(required)*: `string`
- **schemaOverride** (query) *(required)*: `string`

**Request Body:**

- **model**: `object`
- **compliancePlan**: `object`
  - Compliance configuration for this output. Only enable overrides if no sensitive data will be stored.
- **name**: `string`
  - This is the name of the structured output.
- **description**: `string`
  - This is the description of what the structured output extracts.

Use this to provide context about what data will be extracted and how it will be used.
- **assistantIds**: array of `string`
  - These are the assistant IDs that this structured output is linked to.

When linked to assistants, this structured output will be available for extraction during those assistant's calls.
- **workflowIds**: array of `string`
  - These are the workflow IDs that this structured output is linked to.

When linked to workflows, this structured output will be available for extraction during those workflow's execution.
- **schema**: `object`

**Responses:**

- `200`: 

---

### `DELETE /structured-output/{id}`

**Delete Structured Output**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

## Tool

### `POST /tool`

**Create Tool**

**Request Body:**

- **oneOf**:
  - Option 1: `object`
  - Option 2: `object`
  - Option 3: `object`
  - Option 4: `object`
  - Option 5: `object`

**Responses:**

- `201`: 

---

### `GET /tool`

**List Tools**

**Parameters:**

- **limit** (query): `number`
- **createdAtGt** (query): `string`
- **createdAtLt** (query): `string`
- **createdAtGe** (query): `string`
- **createdAtLe** (query): `string`
- **updatedAtGt** (query): `string`
- **updatedAtLt** (query): `string`
- **updatedAtGe** (query): `string`
- **updatedAtLe** (query): `string`

**Responses:**

- `200`: 

---

### `POST /tool/code/test`

**Test Code Tool Execution**

**Responses:**

- `200`: Code execution test result
- `201`: 

---

### `GET /tool/{id}`

**Get Tool**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

### `PATCH /tool/{id}`

**Update Tool**

**Parameters:**

- **id** (path) *(required)*: `string`

**Request Body:**

- **oneOf**:
  - Option 1: `object`
  - Option 2: `object`
  - Option 3: `object`
  - Option 4: `object`
  - Option 5: `object`

**Responses:**

- `200`: 

---

### `DELETE /tool/{id}`

**Delete Tool**

**Parameters:**

- **id** (path) *(required)*: `string`

**Responses:**

- `200`: 

---

## V2

### `GET /v2/phone-number`

**List Phone Numbers**

**Parameters:**

- **search** (query): `string`
- **page** (query): `number`
- **sortOrder** (query): `string`
- **limit** (query): `number`
- **createdAtGt** (query): `string`
- **createdAtLt** (query): `string`
- **createdAtGe** (query): `string`
- **createdAtLe** (query): `string`
- **updatedAtGt** (query): `string`
- **updatedAtLt** (query): `string`
- **updatedAtGe** (query): `string`
- **updatedAtLe** (query): `string`

**Responses:**

- `200`: 

---

## Key Schemas

### CreateAssistantDTO

- **transcriber**: `object`
  - These are the options for the assistant's transcriber.
- **model**: `object`
  - These are the options for the assistant's LLM.
- **voice**: `object`
  - These are the options for the assistant's voice.
- **firstMessage**: `string`
- **firstMessageInterruptionsEnabled**: `boolean`
- **firstMessageMode**: enum [`assistant-speaks-first`, `assistant-speaks-first-with-model-generated-message`, `assistant-waits-for-user`]
- **voicemailDetection**: `object`
- **clientMessages**: enum [`conversation-update`, `function-call`, `function-call-result`, `hang`, `language-changed`, `metadata`, `model-output`, `speech-update`, `status-update`, `transcript`]
- **serverMessages**: enum [`assistant.started`, `conversation-update`, `end-of-call-report`, `function-call`, `hang`, `language-changed`, `language-change-detected`, `model-output`, `phone-call-control`, `speech-update`]
- **maxDurationSeconds**: `number`
  - This is the maximum number of seconds that the call will last. When the call reaches this duration, it will be ended.

@default 600 (10 minutes)
- **backgroundSound**: `object`
  - This is the background sound in the call. Default for phone calls is 'office' and default for web calls is 'off'.
You can also provide a custom sound by providing a URL to an audio file.
- **modelOutputInMessagesEnabled**: `boolean`
  - This determines whether the model's output is used in conversation history rather than the transcription of assistant's speech.

Default `false` while in beta.

@default false
- **transportConfigurations**: array of `object`
- **observabilityPlan**: `object`
  - This is the plan for observability of assistant's calls.

Currently, only Langfuse is supported.
- **credentials**: array of `object`
- **hooks**: array of `object`
  - This is a set of actions that will be performed on certain events.
- **name**: `string`
  - This is the name of the assistant.

This is required when you want to transfer between assistants in a call.
- **voicemailMessage**: `string`
  - This is the message that the assistant will say if the call is forwarded to voicemail.

If unspecified, it will hang up.
- **endCallMessage**: `string`
  - This is the message that the assistant will say if it ends the call.

If unspecified, it will hang up without saying anything.
- **endCallPhrases**: array of `string`
  - This list contains phrases that, if spoken by the assistant, will trigger the call to be hung up. Case insensitive.
- **compliancePlan**: `object`
- **metadata**: `object`
  - This is for metadata you want to store on the assistant.
- **backgroundSpeechDenoisingPlan**: `object`
- **analysisPlan**: `object`
  - This is the plan for analysis of assistant's calls. Stored in `call.analysis`.
- **artifactPlan**: `object`
  - This is the plan for artifacts generated during assistant's calls. Stored in `call.artifact`.
- **startSpeakingPlan**: `object`
- **stopSpeakingPlan**: `object`
- **monitorPlan**: `object`
- **credentialIds**: array of `string`
  - These are the credentials that will be used for the assistant calls. By default, all the credentials are available for use in the call but you can provide a subset using this.
- **server**: `object`


### Assistant

- **transcriber**: `object`
  - These are the options for the assistant's transcriber.
- **model**: `object`
  - These are the options for the assistant's LLM.
- **voice**: `object`
  - These are the options for the assistant's voice.
- **firstMessage**: `string`
- **firstMessageInterruptionsEnabled**: `boolean`
- **firstMessageMode**: enum [`assistant-speaks-first`, `assistant-speaks-first-with-model-generated-message`, `assistant-waits-for-user`]
- **voicemailDetection**: `object`
- **clientMessages**: enum [`conversation-update`, `function-call`, `function-call-result`, `hang`, `language-changed`, `metadata`, `model-output`, `speech-update`, `status-update`, `transcript`]
- **serverMessages**: enum [`assistant.started`, `conversation-update`, `end-of-call-report`, `function-call`, `hang`, `language-changed`, `language-change-detected`, `model-output`, `phone-call-control`, `speech-update`]
- **maxDurationSeconds**: `number`
  - This is the maximum number of seconds that the call will last. When the call reaches this duration, it will be ended.

@default 600 (10 minutes)
- **backgroundSound**: `object`
  - This is the background sound in the call. Default for phone calls is 'office' and default for web calls is 'off'.
You can also provide a custom sound by providing a URL to an audio file.
- **modelOutputInMessagesEnabled**: `boolean`
  - This determines whether the model's output is used in conversation history rather than the transcription of assistant's speech.

Default `false` while in beta.

@default false
- **transportConfigurations**: array of `object`
- **observabilityPlan**: `object`
  - This is the plan for observability of assistant's calls.

Currently, only Langfuse is supported.
- **credentials**: array of `object`
- **hooks**: array of `object`
  - This is a set of actions that will be performed on certain events.
- **name**: `string`
  - This is the name of the assistant.

This is required when you want to transfer between assistants in a call.
- **voicemailMessage**: `string`
  - This is the message that the assistant will say if the call is forwarded to voicemail.

If unspecified, it will hang up.
- **endCallMessage**: `string`
  - This is the message that the assistant will say if it ends the call.

If unspecified, it will hang up without saying anything.
- **endCallPhrases**: array of `string`
  - This list contains phrases that, if spoken by the assistant, will trigger the call to be hung up. Case insensitive.
- **compliancePlan**: `object`
- **metadata**: `object`
  - This is for metadata you want to store on the assistant.
- **backgroundSpeechDenoisingPlan**: `object`
- **analysisPlan**: `object`
  - This is the plan for analysis of assistant's calls. Stored in `call.analysis`.
- **artifactPlan**: `object`
  - This is the plan for artifacts generated during assistant's calls. Stored in `call.artifact`.
- **startSpeakingPlan**: `object`
- **stopSpeakingPlan**: `object`
- **monitorPlan**: `object`
- **credentialIds**: array of `string`
  - These are the credentials that will be used for the assistant calls. By default, all the credentials are available for use in the call but you can provide a subset using this.
- **server**: `object`


### CreateCallDTO

- **customers**: array of `object`
  - This is used to issue batch calls to multiple customers.

Only relevant for `outboundPhoneCall`. To call a single customer, use `customer` instead.
- **name**: `string`
  - This is the name of the call. This is just for your own reference.
- **schedulePlan**: `object`
  - This is the schedule plan of the call.
- **transport**: `object`
  - This is the transport of the call.
- **assistantId**: `string`
- **assistant**: `object`
- **assistantOverrides**: `object`
  - These are the overrides for the `assistant` or `assistantId`'s settings and template variables.
- **squadId**: `string`
- **squad**: `object`
- **squadOverrides**: `object`
  - These are the overrides for the `squad` or `squadId`'s member settings and template variables.
This will apply to all members of the squad.
- **workflowId**: `string`
- **workflow**: `object`
- **workflowOverrides**: `object`
  - These are the overrides for the `workflow` or `workflowId`'s settings and template variables.
- **phoneNumberId**: `string`
  - This is the phone number that will be used for the call. To use a transient number, use `phoneNumber` instead.

Only relevant for `outboundPhoneCall` and `inboundPhoneCall` type.
- **phoneNumber**: `object`
  - This is the phone number that will be used for the call. To use an existing number, use `phoneNumberId` instead.

Only relevant for `outboundPhoneCall` and `inboundPhoneCall` type.
- **customerId**: `string`
  - This is the customer that will be called. To call a transient customer , use `customer` instead.

Only relevant for `outboundPhoneCall` and `inboundPhoneCall` type.
- **customer**: `object`
  - This is the customer that will be called. To call an existing customer, use `customerId` instead.

Only relevant for `outboundPhoneCall` and `inboundPhoneCall` type.


### Call

- **type**: enum [`inboundPhoneCall`, `outboundPhoneCall`, `webCall`, `vapi.websocketCall`]
  - This is the type of call.
- **costs**: array of `object`
  - These are the costs of individual components of the call in USD.
- **messages**: array of `object`
- **phoneCallProvider**: enum [`twilio`, `vonage`, `vapi`, `telnyx`]
  - This is the provider of the call.

Only relevant for `outboundPhoneCall` and `inboundPhoneCall` type.
- **phoneCallTransport**: enum [`sip`, `pstn`]
  - This is the transport of the phone call.

Only relevant for `outboundPhoneCall` and `inboundPhoneCall` type.
- **status**: enum [`scheduled`, `queued`, `ringing`, `in-progress`, `forwarding`, `ended`, `not-found`, `deletion-failed`]
  - This is the status of the call.
- **endedReason**: enum [`call-start-error-neither-assistant-nor-server-set`, `assistant-request-failed`, `assistant-request-returned-error`, `assistant-request-returned-unspeakable-error`, `assistant-request-returned-invalid-assistant`, `assistant-request-returned-no-assistant`, `assistant-request-returned-forwarding-phone-number`, `scheduled-call-deleted`, `call.start.error-vapifault-get-org`, `call.start.error-vapifault-get-subscription`]
  - This is the explanation for how the call ended.
- **endedMessage**: `string`
  - This is the message that adds more context to the ended reason. It can be used to provide potential error messages or warnings.
- **destination**: `object`
  - This is the destination where the call ended up being transferred to. If the call was not transferred, this will be empty.
- **id** *(required)*: `string`
  - This is the unique identifier for the call.
- **orgId** *(required)*: `string`
  - This is the unique identifier for the org that this call belongs to.
- **createdAt** *(required)*: `string`
  - This is the ISO 8601 date-time string of when the call was created.
- **updatedAt** *(required)*: `string`
  - This is the ISO 8601 date-time string of when the call was last updated.
- **startedAt**: `string`
  - This is the ISO 8601 date-time string of when the call was started.
- **endedAt**: `string`
  - This is the ISO 8601 date-time string of when the call was ended.
- **cost**: `number`
  - This is the cost of the call in USD.
- **costBreakdown**: `object`
  - This is the cost of the call in USD.
- **artifactPlan**: `object`
  - This is a copy of assistant artifact plan. This isn't actually stored on the call but rather just returned in POST /call/web to enable artifact creation client side.
- **analysis**: `object`
  - This is the analysis of the call. Configure in `assistant.analysisPlan`.
- **monitor**: `object`
  - This is to real-time monitor the call. Configure in `assistant.monitorPlan`.
- **artifact**: `object`
  - These are the artifacts created from the call. Configure in `assistant.artifactPlan`.
- **compliance**: `object`
  - This is the compliance of the call. Configure in `assistant.compliancePlan`.
- **phoneCallProviderId**: `string`
  - The ID of the call as provided by the phone number service. callSid in Twilio. conversationUuid in Vonage. callControlId in Telnyx.

Only relevant for `outboundPhoneCall` and `inboundPhoneCall` type.
- **campaignId**: `string`
  - This is the campaign ID that the call belongs to.
- **assistantId**: `string`
- **assistant**: `object`
- **assistantOverrides**: `object`
  - These are the overrides for the `assistant` or `assistantId`'s settings and template variables.
- **squadId**: `string`
- **squad**: `object`
- **squadOverrides**: `object`
  - These are the overrides for the `squad` or `squadId`'s member settings and template variables.
This will apply to all members of the squad.


### CreateSquadDTO

- **name**: `string`
  - This is the name of the squad.
- **members** *(required)*: array of `object`
  - This is the list of assistants that make up the squad.

The call will start with the first assistant in the list.
- **membersOverrides**: `object`


### Squad

- **name**: `string`
  - This is the name of the squad.
- **members** *(required)*: array of `object`
  - This is the list of assistants that make up the squad.

The call will start with the first assistant in the list.
- **membersOverrides**: `object`
- **id** *(required)*: `string`
  - This is the unique identifier for the squad.
- **orgId** *(required)*: `string`
  - This is the unique identifier for the org that this squad belongs to.
- **createdAt** *(required)*: `string`
  - This is the ISO 8601 date-time string of when the squad was created.
- **updatedAt** *(required)*: `string`
  - This is the ISO 8601 date-time string of when the squad was last updated.

