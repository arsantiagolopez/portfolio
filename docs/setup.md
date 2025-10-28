# Infrastructure Setup Guide

Complete setup guide for all external services. For detailed documentation on each technology, see the [`docs/`](docs/) directory.

## Quick Links

- **[AI Chat](ai-chat.md)** - Claude API setup for text streaming
- **[Video Generation](video-generation.md)** - Modal setup for avatar videos
- **[Caching](caching.md)** - Cloudflare KV + Voyage AI embeddings
- **[Video Storage](video-storage.md)** - Cloudflare R2 with CDN
- **[Analytics](analytics.md)** - Usage tracking and recruiter detection
- **[Overview](chatbot-overview.md)** - Complete system architecture

## Setup Checklist

Follow these steps in order:

### 1. Anthropic Claude API ✅
- [ ] Create account at https://console.anthropic.com/
- [ ] Generate API key (Settings → API Keys)
- [ ] Add `ANTHROPIC_API_KEY` to `.env`

**Details:** [ai-chat.md](ai-chat.md)

### 2. Voyage AI Embeddings ⏭️
*(Can defer until semantic caching phase)*
- [ ] Create account at https://www.voyageai.com/
- [ ] Generate API key
- [ ] Add `VOYAGE_AI_API_KEY` to `.env`

**Details:** [caching.md](caching.md)

### 3. Modal Labs ✅
- [ ] Create Python virtual environment: `python3 -m venv .venv`
- [ ] Activate: `source .venv/bin/activate`
- [ ] Install Modal: `pip install modal`
- [ ] Authenticate: `modal setup`
- [ ] Extract tokens from `~/.modal.toml` or https://modal.com/settings/tokens
- [ ] Add `MODAL_TOKEN_ID` and `MODAL_TOKEN_SECRET` to `.env`

**Details:** [video-generation.md](video-generation.md)

### 4. Cloudflare R2 Storage ✅
- [ ] Create R2 bucket: `portfolio-avatar-videos`
- [ ] Generate R2 API token (Object Read & Write)
- [ ] Configure custom domain: `videos.yoursite.com`
- [ ] Set up CORS policy
- [ ] Add R2 credentials to `.env`:
  - `CLOUDFLARE_ACCOUNT_ID`
  - `CLOUDFLARE_R2_ACCESS_KEY_ID`
  - `CLOUDFLARE_R2_SECRET_ACCESS_KEY`
  - `CLOUDFLARE_R2_BUCKET_NAME`
  - `CLOUDFLARE_R2_PUBLIC_URL`

**Details:** [video-storage.md](video-storage.md)

### 5. Cloudflare KV Namespaces ✅
- [ ] Create KV namespace: `portfolio-chat-cache`
- [ ] Create KV namespace: `portfolio-chat-analytics`
- [ ] Generate KV API token (Workers KV Storage → Edit)
- [ ] Add KV credentials to `.env`:
  - `CLOUDFLARE_KV_ACCOUNT_ID`
  - `CLOUDFLARE_KV_API_TOKEN`
  - `CLOUDFLARE_KV_NAMESPACE_ID_CACHE`
  - `CLOUDFLARE_KV_NAMESPACE_ID_ANALYTICS`

**Details:** [caching.md](caching.md) and [analytics.md](analytics.md)

### 6. Vercel Environment Variables ✅
- [ ] Go to Vercel project → Settings → Environment Variables
- [ ] Add all variables from `.env`
- [ ] Make available in: Production, Preview, Development

### 7. Vercel Cron (Modal Warming) ⏭️
*(Configure after Modal deployment)*
- [ ] Create `vercel.json` with cron configuration
- [ ] Deploy to Vercel
- [ ] Verify cron runs every 5 minutes

**Details:** [video-generation.md](video-generation.md)

## Environment Variables Template

Copy `.env.example` to `.env` and fill in all values:

```bash
# AI Chat
ANTHROPIC_API_KEY=sk-ant-xxxxx

# Embeddings (for semantic caching)
VOYAGE_AI_API_KEY=pa-xxxxx

# Video Generation
MODAL_TOKEN_ID=xxxxx
MODAL_TOKEN_SECRET=xxxxx

# Video Storage
CLOUDFLARE_ACCOUNT_ID=xxxxx
CLOUDFLARE_R2_ACCESS_KEY_ID=xxxxx
CLOUDFLARE_R2_SECRET_ACCESS_KEY=xxxxx
CLOUDFLARE_R2_BUCKET_NAME=portfolio-avatar-videos
CLOUDFLARE_R2_PUBLIC_URL=https://videos.yoursite.com

# Caching & Analytics
CLOUDFLARE_KV_ACCOUNT_ID=xxxxx
CLOUDFLARE_KV_API_TOKEN=xxxxx
CLOUDFLARE_KV_NAMESPACE_ID_CACHE=xxxxx
CLOUDFLARE_KV_NAMESPACE_ID_ANALYTICS=xxxxx

# Admin Dashboard
ADMIN_SECRET=your-secure-random-string
```

## Testing Connections

After completing setup, test each service to verify configuration. See individual technology docs for specific test commands.

## Next Steps

Once infrastructure is set up:
1. ✅ Run all connection tests above
2. ✅ Verify all environment variables in Vercel
3. ⏭️ Deploy Modal ComfyUI workflow
4. ⏭️ Implement chat UI and API routes
5. ⏭️ Test end-to-end flow

## Need Help?

Check individual technology docs for:
- Detailed setup instructions
- Troubleshooting guides
- Testing commands
- Official documentation links
