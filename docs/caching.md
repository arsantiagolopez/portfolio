# Caching

Multi-layer caching strategy to minimize video generation costs and improve response times.

## Overview

Two-tier caching system: exact match (hash-based) and semantic similarity (embedding-based). Only generates new videos when truly unique questions are asked.

## Technologies Used

- **Cloudflare KV** - Distributed key-value storage
- **Voyage AI** - Text embeddings for semantic search

## Caching Strategy

### Layer 1: Exact Match (Hash-Based)
- Normalize question (lowercase, trim, remove punctuation)
- Generate hash of normalized text
- Check KV cache for exact match
- **Cache hit:** Return video URL immediately
- **Cache miss:** Proceed to Layer 2

### Layer 2: Semantic Similarity (Embedding-Based)
- Generate embedding for user question
- Compare with cached embeddings using cosine similarity
- Threshold: 0.92 similarity = cache hit
- **Cache hit:** Return closest match video URL
- **Cache miss:** Generate new video + cache

### Example Matches
- "What is photosynthesis?" ↔ "Explain photosynthesis" → **0.94 similarity** ✅
- "Tell me about yourself" ↔ "Who are you?" → **0.96 similarity** ✅
- "What is photosynthesis?" ↔ "What is respiration?" → **0.78 similarity** ❌

## How It Works

### Cache Hit Rate Impact
- 70% cache hit rate = 70% fewer video generations
- Target 70%+ within first week of traffic
- Each cache hit saves ~$0.015 in Modal costs

### Embedding Strategy
- Only generate embeddings on cache miss
- Don't embed every question upfront
- Cache embeddings alongside video URLs
- Batch generation for multiple misses

### TTL Strategy
- **Videos:** No expiration (permanent)
- **Analytics events:** 30 days
- Popular questions reused over months

## Cache Invalidation

### When to Invalidate
- Avatar image changes
- Voice/video quality improvements
- Content updates (e.g., updated resume answers)

### How to Invalidate
- Delete specific keys via Cloudflare API
- Or add version prefix to keys: `v2:hash:abc123`

## Testing

### Test KV Read/Write
```bash
# Write
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_KV_ACCOUNT_ID/storage/kv/namespaces/$CLOUDFLARE_KV_NAMESPACE_ID_CACHE/values/test-key" \
  -H "Authorization: Bearer $CLOUDFLARE_KV_API_TOKEN" \
  -d "test value"

# Read
curl "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_KV_ACCOUNT_ID/storage/kv/namespaces/$CLOUDFLARE_KV_NAMESPACE_ID_CACHE/values/test-key" \
  -H "Authorization: Bearer $CLOUDFLARE_KV_API_TOKEN"
```

### Test Embedding Generation
```bash
curl -X POST https://api.voyageai.com/v1/embeddings \
  -H "Authorization: Bearer $VOYAGE_AI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"input": ["test question"], "model": "voyage-3.5-lite"}'
```

## Resources

- [Cloudflare KV Docs](https://developers.cloudflare.com/kv/)
- [Voyage AI Docs](https://docs.voyageai.com/)
- [Cosine Similarity Explained](https://en.wikipedia.org/wiki/Cosine_similarity)
