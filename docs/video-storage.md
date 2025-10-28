# Video Storage

Cloud storage for generated avatar videos with CDN delivery.

## Overview

Cloudflare R2 provides S3-compatible object storage with zero egress fees. Videos are served via custom domain with built-in CDN for fast global delivery.

## Technology Used

**Cloudflare R2** - S3-compatible object storage with free CDN

## How It Works

### S3-Compatible API
- Uses AWS SDK with R2 endpoints
- Standard S3 operations (put, get, list, delete)
- Region: always "auto"

### Custom Domain CDN
- Videos served via `videos.yoursite.com`
- Cloudflare CDN automatically caches globally
- Zero egress fees regardless of traffic
- Fast delivery worldwide

### Video Optimization
- **Resolution:** 720p (not 1080p)
- **Codec:** H.264 for good compression
- **Target size:** 3-5MB per 30-second video
- **Thumbnails:** JPEG, <100KB

### Free Tier Benefits
- 10GB storage free
- 1M writes/month free
- 10M reads/month free
- Unlimited egress (with custom domain)

## Video Structure

### Naming Convention

```
videos/
  ├── {videoId}.mp4           # Main video file
  └── {videoId}-thumb.jpg     # Thumbnail image
```

### Example URLs

- Video: `https://videos.yoursite.com/{videoId}.mp4`
- Thumbnail: `https://videos.yoursite.com/{videoId}-thumb.jpg`

## Testing

### Upload Test File

```bash
aws s3 cp test-video.mp4 s3://$CLOUDFLARE_R2_BUCKET_NAME/test.mp4 \
  --endpoint-url https://$CLOUDFLARE_ACCOUNT_ID.r2.cloudflarestorage.com \
  --region auto
```

### List Files

```bash
aws s3 ls s3://$CLOUDFLARE_R2_BUCKET_NAME \
  --endpoint-url https://$CLOUDFLARE_ACCOUNT_ID.r2.cloudflarestorage.com \
  --region auto
```

### Access via CDN

```bash
curl -I https://videos.yoursite.com/test.mp4
```

Should return `200 OK` with Cloudflare headers.

## Resources

- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)
- [S3 API Compatibility](https://developers.cloudflare.com/r2/api/s3/api/)
- [Custom Domains Guide](https://developers.cloudflare.com/r2/buckets/public-buckets/)
