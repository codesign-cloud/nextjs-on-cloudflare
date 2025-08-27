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


------------------------

# Integrating Cloudflare Workers


1. ```npm install --save-dev wrangler@latest```


2. ```npm install @opennextjs/cloudflare@latest```


3. Create a `wrangler.jsonc` file [Doc Link](https://opennext.js.org/cloudflare/get-started#3-create-a-wrangler-configuration-file)


4. Add an `open-next.config.ts` file


5. Add a `.dev.vars` file with content `NEXTJS_ENV=development`

You can also add the following lines to `.gitignore`
````
# Cloudflare
cloudflare-env.d.ts
/wrangler.toml.backup
/wrangler.jsonc.backup
````

6. Update the package.json file

```````jsonc
// The build script must invoke the Next.js build command, it will be invoke by opennextjs-cloudflare build.
"build": "next build",

//npm run preview: Builds your app and serves it locally, allowing you to quickly preview your app running locally in the Workers runtime, via a single command.
"preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",

//npm run deploy: Builds your app, and then immediately deploys it to Cloudflare.
"deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",

//npm run upload: Builds your app, and then uploads a new version of it to Cloudflare.
"upload": "opennextjs-cloudflare build && opennextjs-cloudflare upload",

//cf-typegen: Generates a cloudflare-env.d.ts file at the root of your project containing the types for the env.
"cf-typegen": "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts",
```````


7. Add Static Asset Caching

Add a `public/_headers` file, with the following headers at the least:
`````
/_next/static/*
Cache-Control: public,max-age=31536000,immutable
`````


8. Add caching with Cloudflare R2


9. Remove any export const runtime = "edge"; if present (just verify)
10. Add .open-next to .gitignore
11. Remove static `@cloudflare/next-on-pages` (if necessary/just verify)
12. Develop locally (add `initOpenNextCloudflareForDev()` block in `next.config.js`)
13. Deploy to Cloudflare Workers (via `npm run deploy`; manual deploy via `npx wrangler deploy --config wrangler.jsonc`)

------------------------


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
