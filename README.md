# Next.js 15+ SSR on Cloudflare Workers

A Next.js 15+ application demonstrating Server-Side Rendering (SSR) and API routes deployed on Cloudflare Workers using [OpenNext](https://opennext.js.org/cloudflare).

## Features

- ✅ **Next.js 15+** with App Router
- ✅ **Server-Side Rendering (SSR)** with real-time data
- ✅ **API Routes** with full Node.js runtime support
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS** for styling
- ✅ **Cloudflare Workers** deployment via OpenNext
- ✅ **Full Node.js API** compatibility (not Edge Runtime)

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── server-info/         # API route returning server metadata
│   │       └── route.ts
│   ├── ssr-demo/               # SSR demonstration page
│   │   ├── components/
│   │   │   └── ApiDataFetcher.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx              # Root layout component
│   └── page.tsx                # Home page
└── types/
    └── api.ts                  # TypeScript type definitions
```

## Getting Started

### Prerequisites

- **Node.js 20 or higher** (required for @opennextjs/cloudflare)
- **npm** or **yarn** package manager

### Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

### Pages

- **Home** (`/`) - Landing page with navigation
- **SSR Demo** (`/ssr-demo`) - Server-side rendering demonstration
- **API Endpoint** (`/api/server-info`) - Server information API

## API Reference

### Server Info Endpoint

**Endpoint:** `GET /api/server-info`

**Response:**
```json
{
  "success": true,
  "data": {
    "serverId": "uuid-string",
    "serverTime": "2024-01-01T00:00:00.000Z",
    "requestId": "uuid-string",
    "environment": "development",
    "timestamp": 1704067200000
  },
  "metadata": {
    "requestTime": "2024-01-01T00:00:00.000Z",
    "responseTime": "2024-01-01T00:00:00.000Z"
  }
}
```

## Deployment to Cloudflare Workers

### Using OpenNext

1. **Build and deploy:**
   ```bash
   npm run deploy
   ```

   This command uses `@opennextjs/cloudflare` to:
   - Build the Next.js application
   - Transform it for Cloudflare Workers
   - Deploy using Wrangler

2. **Manual deployment:**
   ```bash
   # Build the project
   npm run build
   
   # Deploy with OpenNext
   npx @opennextjs/cloudflare@latest
   
   # Or deploy with Wrangler
   npx wrangler deploy
   ```

### Configuration

The project is configured for OpenNext deployment:

- **`wrangler.toml`** - Cloudflare Workers configuration
- **`next.config.js`** - Next.js configuration optimized for OpenNext
- **Node.js Runtime** - Full Node.js API support (not Edge Runtime)

## Key Technical Features

### Server-Side Rendering (SSR)

The `/ssr-demo` page demonstrates:
- Server-side data generation
- No client-side loading states for initial data
- SEO-friendly content
- Fast initial page load

### API Routes

The `/api/server-info` endpoint showcases:
- Full Node.js runtime capabilities
- UUID generation using Node.js `crypto` module
- CORS headers for cross-origin requests
- Proper error handling and response formatting

### Client-Side Interactions

The `ApiDataFetcher` component provides:
- Real-time API data fetching
- Loading and error states
- Interactive user experience
- Type-safe API responses

## OpenNext Advantages

Compared to `@cloudflare/next-on-pages`:

- ✅ **Full Node.js Runtime** - Complete Node.js API compatibility
- ✅ **No API Restrictions** - Use any Node.js modules
- ✅ **Better Feature Support** - All Next.js 15 features supported
- ✅ **Simplified Configuration** - Less setup complexity

## Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run deploy   # Deploy to Cloudflare Workers
```

## Environment Variables

Set in `wrangler.toml` or Cloudflare dashboard:

```toml
[vars]
ENVIRONMENT = "production"
SERVER_ID = "your-server-id"
```

## Troubleshooting

### Common Issues

1. **Worker Size Limits:**
   - Free tier: 3 MiB compressed
   - Paid tier: 10 MiB compressed
   - Monitor bundle size during deployment

2. **Node.js Compatibility:**
   - OpenNext provides full Node.js runtime
   - No need for polyfills or edge-specific code

3. **CORS Issues:**
   - API routes include proper CORS headers
   - Test API endpoints independently

## Learn More

- [OpenNext Documentation](https://opennext.js.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [TypeScript](https://www.typescriptlang.org/)

## License

MIT