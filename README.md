# Portfolio

Modern full-stack portfolio website showcasing projects, experience, and technical skills. Built with React Router 7, featuring advanced theming, server-side rendering, and integrated showcase projects.

## Overview

Personal portfolio designed for software engineers and hiring managers. Highlights technical projects, work experience, and includes interactive demos. One showcase feature is an AI-powered avatar chatbot that answers questions about my background.

## Features

- 🎨 **Modern Design System** - Scalable CSS architecture with OKLCH color space
- 🌓 **Advanced Dark Mode** - System preference detection with manual override
- 🚀 **SSR & Performance** - Server-side rendering with React 19
- ♿️ **Accessible** - Built on Radix UI primitives
- 📱 **Responsive** - Mobile-first design
- 🔒 **Type-Safe** - Strict TypeScript throughout

## Showcase Projects

### AI Avatar Chatbot
Interactive chatbot with AI-generated talking avatar videos. Answers questions about my experience and projects using Claude Haiku with smart caching to minimize costs.

**Features:**
- Real-time text streaming (<500ms response)
- AI-generated avatar videos (30-60s)
- Semantic caching (70%+ hit rate)
- Recruiter analytics tracking

**Tech:** Claude Haiku, Modal Labs, ComfyUI, LivePortrait, Cloudflare R2/KV

📖 [Full Documentation](docs/chatbot-overview.md) | [Cost Analysis](docs/cost-analysis.md) | [Setup Guide](docs/setup.md)

### External Projects
- Links to live projects, GitHub repositories, case studies
- Project descriptions, tech stacks, outcomes
- Screenshots, demos, and technical write-ups

## Tech Stack

### Core
- **React Router 7** - Full-stack React framework with SSR
- **React 19** - Latest React with concurrent features
- **TypeScript** - Strict type safety, no `any` types
- **Tailwind v4** - Utility-first CSS with CSS custom properties
- **shadcn/ui** - Accessible component library built on Radix UI
- **Vercel** - Edge deployment with cron jobs

### AI Avatar Chatbot Stack
- **Anthropic Claude Haiku** - Conversational AI
- **Modal Labs** - Serverless GPU compute
- **Voyage AI** - Text embeddings
- **Cloudflare R2** - Video storage with CDN
- **Cloudflare KV** - Caching layer

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Application runs at `http://localhost:5173`

### AI Chatbot Setup (Optional)

The AI avatar chatbot requires external services. See **[Setup Guide](docs/setup.md)** for:
- Anthropic API key
- Modal account + CLI (Python 3.8+)
- Cloudflare R2 bucket + custom domain
- Cloudflare KV instances
- Voyage AI account (optional)

## Documentation

### Design & Architecture
- **[Design System](docs/design-system.md)** - CSS architecture, theming, styling patterns

### AI Avatar Chatbot
- **[Chatbot Overview](docs/chatbot-overview.md)** - Architecture and flow
- **[Setup Guide](docs/setup.md)** - Infrastructure setup
- **[Cost Analysis](docs/cost-analysis.md)** - Cost breakdown and optimization

#### Technical Details
- **[AI Chat](docs/ai-chat.md)** - Claude streaming implementation
- **[Video Generation](docs/video-generation.md)** - Modal + ComfyUI pipeline
- **[Caching](docs/caching.md)** - Multi-tier caching strategy
- **[Video Storage](docs/video-storage.md)** - R2 + CDN setup
- **[Analytics](docs/analytics.md)** - Usage tracking + recruiter detection

## Project Structure

```
app/
├── components/        # React components
│   └── ui/           # shadcn/ui components
├── lib/              # Utilities and helpers
│   └── utils/        # Shared utility functions
├── routes/           # File-based routing
│   └── resources/    # API/resource routes
└── styles/           # Modular CSS organization
    ├── index.css     # Main entry point
    ├── colors.css    # Theme colors
    ├── fonts.css     # Typography
    ├── tokens.css    # Design tokens
    └── globals.css   # Global styles

docs/                 # Documentation
```

## Development

```bash
# Development server
pnpm dev

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Build for production
pnpm build
```

## Project Highlights

### Code Quality
- **Strict TypeScript** - No `any` types, proper type guards
- **Comprehensive docs** - Setup guides, cost analysis, technical details
- **Clean architecture** - Separation of concerns, modular design
- **Accessible components** - Built on Radix UI primitives

### AI Chatbot Optimizations
- **Cost efficient** - $1-10/month for 100-1,000 conversations
- **Smart caching** - 70% cache hit rate reduces video generation
- **Zero egress** - Cloudflare CDN eliminates bandwidth costs
- **Production ready** - Error handling, monitoring, rate limiting

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project to Vercel
3. Add environment variables (if using chatbot)
4. Deploy

### Other Platforms
React Router 7 supports any Node.js hosting. See [React Router deployment docs](https://reactrouter.com/start/deploying).

## License

MIT License - feel free to fork and customize for your own portfolio!

## Author

**Your Name**
- Website: [yoursite.com](https://yoursite.com)
- LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- GitHub: [@yourusername](https://github.com/yourusername)

---

Built with React Router 7 and modern web technologies
