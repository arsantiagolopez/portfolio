# AI Avatar Chatbot Overview

Interactive chatbot with AI-generated talking avatar videos.

## Feature Description

Users ask questions via chat interface and receive:
1. **Instant text response** - Streams in real-time (<500ms)
2. **Avatar video** - AI-generated talking head video (30-60s generation time)
3. **Smart caching** - Similar questions reuse cached videos

## Architecture

```
User Question
    ↓
Streaming Text Response (Claude Haiku) → Display immediately
    ↓
Check Cache (Cloudflare KV)
    ├─→ Exact match? → Return cached video URL
    ├─→ Similar question? → Return similar video URL
    └─→ No match → Generate new video
              ↓
        Modal (ComfyUI workflow)
              ↓
        Upload to R2 → Store video + thumbnail
              ↓
        Cache in KV → For future reuse
              ↓
        Display video in chat
```

## Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Text AI** | Anthropic Claude Haiku | Conversational responses |
| **Embeddings** | Voyage AI | Semantic similarity search |
| **Video Gen** | Modal + ComfyUI | Avatar video creation |
| **Storage** | Cloudflare R2 | Video hosting with CDN |
| **Caching** | Cloudflare KV | Question → Video mapping |
| **Analytics** | Cloudflare KV | Usage tracking |
| **Framework** | React Router 7 | Full-stack app |
| **Hosting** | Vercel | Serverless deployment |

## Cost Breakdown

### Expected Monthly Costs

**100 conversations:**
- Claude: $0.50
- Modal: $0.50 (70% cache)
- Voyage AI: $0 (free tier)
- R2: $0 (free tier)
- KV: $0 (free tier)
- **Total: ~$1/month**

**1,000 conversations:**
- Claude: $5
- Modal: $5 (70% cache)
- Voyage AI: $0 (free tier)
- R2: $0 (free tier)
- KV: $0 (free tier)
- **Total: ~$10/month**

**10,000 conversations:**
- Claude: $50
- Modal: $30 (80% cache)
- Voyage AI: $0 (free tier)
- R2: $0 (free tier)
- KV: $5
- **Total: ~$85/month**

## Cost Optimization Strategies

### 1. Aggressive Caching (Biggest Savings)
- **70% cache hit rate** = 70% fewer videos generated
- **Savings:** $10/month at 1,000 conversations
- Two-tier: exact match + semantic similarity

### 2. Prompt Caching (90% Reduction)
- Cache system prompts with Claude
- **Savings:** ~$1.25/month at 1,000 conversations

### 3. Free CDN (Zero Egress)
- Cloudflare R2 custom domain = free video delivery
- **Savings:** ~$4.50/month per 50GB served

### 4. Vercel Cron Warming (vs Modal Keep-Warm)
- Ping Modal every 5 minutes via free Vercel cron
- **Savings:** ~$50/month vs paid keep-warm

### 5. Generous Free Tiers
- Voyage AI: 100M tokens/month free
- R2: 10GB storage + 1M writes free
- KV: 100K reads + 1K writes daily free

## Setup Checklist

### Infrastructure
- [ ] Anthropic API key
- [ ] Voyage AI account
- [ ] Modal CLI installed + authenticated
- [ ] Cloudflare R2 bucket + custom domain
- [ ] Cloudflare KV namespaces (cache + analytics)
- [ ] All environment variables in Vercel

### Development
- [ ] npm packages installed
- [ ] Modal ComfyUI workflow deployed
- [ ] Chat UI route created
- [ ] Streaming text API route
- [ ] Cache check logic
- [ ] Video generation endpoint
- [ ] Video player component

### Optimization
- [ ] Vercel cron configured (Modal warming)
- [ ] Prompt caching enabled
- [ ] Semantic search implemented
- [ ] Analytics dashboard created

## Key Features

### User Experience
- **Instant text feedback** - No waiting for video
- **Autoplay priority** - Latest message video plays automatically
- **Manual replay** - Older videos available on click
- **Loading states** - Time-based progress messages
- **Graceful fallback** - Text-only if video fails

### Performance
- **Text streaming:** <500ms first token
- **Video (warm):** 30-45 seconds
- **Video (cold start):** 60-90 seconds
- **Cache hit:** Instant video delivery

### Analytics
- Questions asked
- Cache hit rate
- Top popular questions
- Recruiter detection
- Cost tracking

## Documentation

- [ai-chat.md](ai-chat.md) - Claude text responses setup
- [video-generation.md](video-generation.md) - Modal video generation
- [caching.md](caching.md) - Multi-tier caching strategy
- [video-storage.md](video-storage.md) - R2 storage with CDN
- [analytics.md](analytics.md) - Usage tracking

## Resources

- [Full Setup Guide](../INFRASTRUCTURE_SETUP.md)
- [Environment Variables](.env.example)
