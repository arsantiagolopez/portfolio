# AI Chat

Real-time streaming chat responses using Claude API.

## Overview

The chat interface uses Claude Haiku for fast, cost-effective conversational AI with streaming support. Users receive instant text responses that stream in real-time.

## Technology Used

**Anthropic Claude API** with Haiku model

## How It Works

### Streaming Responses
- Text streams in real-time as Claude generates it
- User sees first tokens within 100-500ms
- Complete response typically 1-3 seconds
- Frontend displays text progressively using AI SDK

### Model Selection
- **Claude Haiku** chosen for speed and cost efficiency
- Sufficient quality for conversational portfolio Q&A
- Can upgrade to Sonnet if quality becomes priority

### Prompt Caching
- System prompts cached for 5 minutes
- Reduces input token costs by 90% on cached prompts
- Only user questions charged at full rate
- Automatic cost optimization

### Rate Limiting
- Free tier: 50 requests/minute
- Paid tier: 1,000 requests/minute
- Implements graceful degradation on 429 errors
- Shows countdown timer to users when rate limited

## Testing Connection

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-haiku-4",
    "max_tokens": 10,
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

## Resources

- [Claude API Docs](https://docs.claude.com/)
- [Streaming Guide](https://docs.claude.com/en/api/messages-streaming)
- [Prompt Caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)
