# Video Generation

AI-powered avatar video generation using ComfyUI workflow on Modal.

## Overview

Generates talking avatar videos from text responses using Chatterbox TTS (text-to-speech) and LivePortrait (audio-to-video). Videos are generated in the background while user reads text response.

## Technology Used

**Modal Labs** - Serverless GPU compute for ComfyUI workflows

## ComfyUI Workflow

### Components
1. **Chatterbox TTS** - Converts text to speech audio
2. **LivePortrait** - Animates static avatar image with audio
3. **Output** - 720p MP4 video + thumbnail image

### Avatar Image Requirements
- Format: PNG or JPG
- Resolution: 512x512 or 1024x1024
- Content: Single face, front-facing
- Background: Solid color preferred
- Lighting: Even, no harsh shadows

## Cold Start Optimization

### Problem
- First request after inactivity: 30-60s cold start
- Subsequent requests: 10-30s generation time

### Solution
- Vercel cron pings Modal every 5 minutes
- Keeps container warm during active hours
- Free strategy (no Modal "keep warm" charges)

### Warming Strategies
- **Vercel cron (used):** Free, pings every 5 minutes
- **Modal keep_warm:** Paid option, always warm
- **No warming:** Free but frequent cold starts

## Error Handling

If video generation fails:
1. User still sees text response immediately
2. Show error state: "Video generation failed"
3. Log error to monitoring
4. Don't block chat functionality

## Resources

- [Modal Documentation](https://modal.com/docs)
- [ComfyUI Workflows](https://github.com/comfyanonymous/ComfyUI)
- [LivePortrait Model](https://github.com/KwaiVGI/LivePortrait)
