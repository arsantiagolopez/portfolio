# Analytics

Custom analytics tracking for chatbot usage and recruiter detection.

## Overview

Pre-aggregated analytics stored in Cloudflare KV to track question patterns, cache performance, and identify potential recruiter visits without expensive list operations.

## Technology Used

**Cloudflare KV** - Key-value storage for analytics data

## How It Works

### Pre-Aggregation Strategy
- Stats aggregated at write time, not read time
- Dashboard queries single key per day
- Avoids expensive list operations
- Scales efficiently to millions of events

### Free Tier Coverage
- 1,000 writes/day free (analytics updates)
- 100,000 reads/day free (dashboard queries)
- 1GB storage free
- Typical usage: $0/month for moderate traffic

## Data Structure

### Pre-Aggregated Stats
Stored with keys like `stats:daily:2025-10-27`:
```json
{
  "date": "2025-10-27",
  "questions": 45,
  "videosGenerated": 38,
  "videosCached": 7,
  "cacheHitRate": 0.156,
  "recruiters": 3,
  "topQuestions": [
    {"question": "Tell me about yourself", "count": 12},
    {"question": "What's your experience?", "count": 8}
  ]
}
```

### Individual Events (Optional)
Stored with TTL for deep analysis:
```json
{
  "type": "question_asked",
  "question": "What is photosynthesis?",
  "timestamp": 1698765432000,
  "referrer": "linkedin.com/jobs",
  "country": "US",
  "city": "San Francisco",
  "ttl": 2592000 // 30 days
}
```

## Tracked Events

### Core Metrics
- `question_asked` - Every user question
- `video_generated` - New video created
- `video_cached` - Video served from cache
- `video_autoplayed` - Latest message video played
- `rate_limit_hit` - Claude API 429 error

### Recruiter Signals
- Referrer from LinkedIn/Indeed/job boards
- Page visit sequence (about → projects → contact)
- Session duration > 2 minutes
- Corporate ISP/ASN detection
- Specific questions (e.g., "salary expectations")

## Recruiter Detection

### Scoring System
| Signal | Points |
|--------|--------|
| Referrer: linkedin.com/jobs, greenhouse.io, lever.co | 30 |
| Page sequence: /about + /projects + /contact | 30 |
| Session duration > 2 minutes | 15 |
| Corporate ISP/ASN | 15 |
| Direct traffic with high engagement | 5 |

**Flag as recruiter if total score ≥ 50 points**

### Detection Strategy
- Low false positives
- Captures genuine recruiter visits
- Updates `recruiters` count in daily stats

## Admin Dashboard

### Protected Endpoint
Access at: `/admin/analytics?secret=ADMIN_SECRET`

### Displayed Metrics
- Total questions asked (all time)
- Videos generated vs cached
- Cache hit rate over time
- Top 10 most popular questions
- Potential recruiter visits
- Daily/weekly trends chart
- Cost estimates based on usage

### Security
- Query parameter authentication
- No public access
- Add `ADMIN_SECRET` to environment variables

### TTL Strategy
- **Daily stats:** Permanent (tiny storage)
- **Individual events:** 30-day TTL (optional)
- Automatic cleanup via KV expiration

## Testing

### Write Test Event
```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_KV_ACCOUNT_ID/storage/kv/namespaces/$CLOUDFLARE_KV_NAMESPACE_ID_ANALYTICS/values/stats:daily:2025-10-27" \
  -H "Authorization: Bearer $CLOUDFLARE_KV_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"date":"2025-10-27","questions":10,"videosGenerated":7,"videosCached":3}'
```

### Read Stats
```bash
curl "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_KV_ACCOUNT_ID/storage/kv/namespaces/$CLOUDFLARE_KV_NAMESPACE_ID_ANALYTICS/values/stats:daily:2025-10-27" \
  -H "Authorization: Bearer $CLOUDFLARE_KV_API_TOKEN"
```

## Privacy Considerations

### What We Track
- Questions asked (for cache optimization)
- Referrer sources (for recruiter detection)
- Usage patterns (for cost optimization)

### What We Don't Track
- Personal information
- IP addresses (unless for ISP detection)
- Conversation content beyond questions
- User accounts (no authentication required)

## Resources

- [Cloudflare KV Docs](https://developers.cloudflare.com/kv/)
- [Analytics Best Practices](https://developers.cloudflare.com/workers/examples/)
