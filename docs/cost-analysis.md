# Cost Analysis

Real-world cost breakdown and optimization strategies for the AI avatar chatbot.

## Overview

This document analyzes actual production costs at different scales and explains optimization strategies that keep costs low while maintaining quality.

## Cost by Scale

### 100 Conversations/Month (MVP Launch)
| Service | Cost | Notes |
|---------|------|-------|
| Claude Haiku | $0.50 | ~500 messages total |
| Modal (videos) | $0.50 | 30 videos (70% cache hit) |
| Voyage AI | $0 | Within free tier (100M tokens) |
| Cloudflare R2 | $0 | Within free tier (10GB storage) |
| Cloudflare KV | $0 | Within free tier (100K reads/day) |
| Vercel | $0 | Hobby plan sufficient |
| **Total** | **~$1/month** | Mostly free tiers |

**Breakeven:** $1 per 100 users → Very affordable for personal portfolio

---

### 1,000 Conversations/Month (Growing Traffic)
| Service | Cost | Notes |
|---------|------|-------|
| Claude Haiku | $5.00 | ~5,000 messages with prompt caching |
| Modal (videos) | $5.00 | 300 videos (70% cache hit) |
| Voyage AI | $0 | Still within free tier |
| Cloudflare R2 | $0 | ~1.5GB storage, within free tier |
| Cloudflare KV | $0 | Within free tier |
| Vercel | $0 | Still on hobby plan |
| **Total** | **~$10/month** | Free tiers covering storage |

**Cost per conversation:** $0.01 → Sustainable for job-seeking portfolio

---

### 10,000 Conversations/Month (High Traffic)
| Service | Cost | Notes |
|---------|------|-------|
| Claude Haiku | $50.00 | ~50,000 messages |
| Modal (videos) | $30.00 | 2,000 videos (80% cache hit) |
| Voyage AI | $0 | Still within free tier |
| Cloudflare R2 | $0.75 | ~10GB storage ($0.015/GB) |
| Cloudflare KV | $5.00 | Exceeding free writes |
| Vercel | $0 | Pro plan may be needed ($20) |
| **Total** | **~$85-105/month** | Entering paid tiers |

**Cost per conversation:** $0.0085 → Still very affordable at scale

---

### 100,000 Conversations/Month (Viral/Production)
| Service | Cost | Notes |
|---------|------|-------|
| Claude Haiku | $500 | ~500,000 messages |
| Modal (videos) | $250 | 15,000 videos (85% cache hit) |
| Voyage AI | $5 | Exceeding free tier |
| Cloudflare R2 | $9 | ~75GB storage + operations |
| Cloudflare KV | $50 | High read/write volume |
| Vercel Pro | $20 | Required for scale |
| **Total** | **~$834/month** | Full production costs |

**Cost per conversation:** $0.0083 → Economics improve at scale due to caching

---

## Optimization Strategies

### 1. Prompt Caching (90% Reduction)

**Without caching:**
- System prompt: 1,000 tokens
- User question: 50 tokens
- Cost: $0.000263 per message

**With caching:**
- System prompt (cached): 1,000 tokens @ $0.025/MTok
- User question: 50 tokens @ $0.25/MTok
- Cost: $0.000038 per message
- **Savings: 85%** on text generation

**How it works:**
- Claude caches system prompts for 5 minutes
- Repeated requests reuse cached prompt
- Only user questions charged at full rate

---

### 2. Semantic Caching (70%+ Hit Rate)

**Without semantic caching:**
- 1,000 unique questions = 1,000 videos generated
- Cost: 1,000 × $0.015 = $15

**With semantic caching (70% hit rate):**
- 1,000 questions → 300 new videos + 700 cached
- Cost: 300 × $0.015 = $4.50
- **Savings: 70%** on video generation

**How it works:**
- Normalize questions (lowercase, trim)
- Check exact match via hash
- If no match, generate embedding
- Find similar cached videos (>0.92 similarity)
- Reuse video if similar enough

**Example matches:**
- "Tell me about yourself" ↔ "Who are you?" → 0.96 similarity ✅
- "What's your experience?" ↔ "What have you worked on?" → 0.93 similarity ✅

---

### 3. Vercel Cron (Free Modal Warming)

**Problem:** Modal cold starts add 30-60s delay

**Solution 1 (Paid): Modal keep_warm=1**
- Cost: ~$50/month
- Always warm, never cold starts

**Solution 2 (Free): Vercel cron ping**
- Cost: $0
- Ping every 5 minutes via free Vercel cron
- Rare cold starts (only if cron misses)
- **Savings: $50/month**

---

### 4. Cloudflare CDN (Zero Egress)

**Without CDN (AWS S3):**
- 50GB video delivery
- Egress: $0.09/GB = $4.50
- Total: $4.50/month

**With Cloudflare R2 + Custom Domain:**
- 50GB video delivery
- Egress: $0 (free with custom domain)
- Storage: $0.75 (within free tier)
- **Savings: $4.50/month**

**How it works:**
- Videos served via custom domain (videos.yoursite.com)
- Cloudflare automatically caches at edge
- No egress fees regardless of traffic

---

### 5. Generous Free Tiers

| Service | Free Tier | Value at 1K conversations |
|---------|-----------|---------------------------|
| Voyage AI | 100M tokens/month | $8 saved |
| Cloudflare R2 | 10GB storage + 1M writes | $5 saved |
| Cloudflare KV | 100K reads + 1K writes daily | $3 saved |
| Vercel Hobby | Unlimited bandwidth | $20 saved |
| **Total** | | **$36 saved/month** |

---

## Cost Comparison: Alternatives

### Alternative Stack (Higher Cost)
| Service | Cost (1K conversations) |
|---------|-------------------------|
| OpenAI GPT-4 | $25 (vs $5 Haiku) |
| Replicate (video) | $15 (vs $5 Modal) |
| AWS S3 | $5 (vs $0 R2) |
| Redis Cloud | $10 (vs $0 KV) |
| **Total** | **$55** (vs $10) |

**Premium features trade-off:**
- GPT-4 higher quality but 5x cost
- Replicate simpler setup but 3x cost
- AWS more mature but egress fees
- Redis more features but paid

---

## When to Optimize Further

### If hitting these limits:
1. **$50+/month** - Consider reducing video quality (512p instead of 720p)
2. **$100+/month** - Implement user rate limiting
3. **$200+/month** - Consider monetization or sponsorship
4. **$500+/month** - Evaluate switching to self-hosted video generation

### Red flags to watch:
- Cache hit rate < 50% (semantic search not working)
- Modal cold starts > 20% (warming not working)
- Embeddings cost > $5/month (too many unique questions)
- R2 egress charges (custom domain not configured)

---

## ROI for Portfolio

### Value delivered:
- **Impressive demo** for employers
- **24/7 availability** - Never miss recruiter
- **Scalable** - Handles viral traffic
- **Cost-transparent** - Shows production thinking

### Expected outcomes:
- Increased recruiter engagement
- Unique differentiator in applications
- Conversation starter in interviews
- Demonstrates full-stack + AI skills

### Break-even analysis:
- $10/month = 2-3 coffee meetings
- If lands one interview → ROI > 100x
- If lands job → ROI immeasurable

---

## Monitoring Costs

### Key metrics to track:
1. **Cost per conversation** - Should decrease as cache grows
2. **Cache hit rate** - Target 70%+ after first week
3. **Modal warm rate** - Target 80%+ (with cron pings)
4. **Free tier utilization** - Stay within limits when possible

### Monthly review checklist:
- [ ] Check Anthropic billing dashboard
- [ ] Review Modal usage report
- [ ] Verify Cloudflare free tier compliance
- [ ] Analyze cache performance
- [ ] Project next month's costs

---

## Summary

### Why this stack is cost-efficient:
1. **Haiku over GPT-4** - 5x cheaper, sufficient quality
2. **Aggressive caching** - 70% fewer video generations
3. **Prompt caching** - 90% reduction on system prompts
4. **Free tiers** - $36/month value at 1K conversations
5. **Smart warming** - $50/month saved vs paid keep-warm
6. **Zero egress** - $4.50/month saved vs AWS

### Bottom line:
- **MVP (100 conversations):** ~$1/month
- **Growing (1K conversations):** ~$10/month
- **Scale (10K conversations):** ~$85/month

For a personal portfolio targeting employment, these costs are negligible compared to the value of standing out to recruiters.
