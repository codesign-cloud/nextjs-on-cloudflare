# Cloudflare Workers Deployment Guide (OpenNext)

This guide provides step-by-step instructions for deploying your Next.js application to Cloudflare Workers using OpenNext, enabling full Node.js SSR capabilities.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Cloudflare Account Setup](#cloudflare-account-setup)
3. [Project Configuration](#project-configuration)
4. [Local Development Setup](#local-development-setup)
5. [Building the Application](#building-the-application)
6. [Deployment](#deployment)
7. [Domain Configuration](#domain-configuration)
8. [Environment Variables](#environment-variables)
9. [Monitoring and Troubleshooting](#monitoring-and-troubleshooting)
10. [Common Issues](#common-issues)

## Prerequisites

Before starting, ensure you have:
- Node.js 18+ installed
- npm or yarn package manager
- A Cloudflare account (free tier works)
- Basic understanding of Next.js and Cloudflare Workers

## Cloudflare Account Setup

### Step 1: Create Cloudflare Account
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Sign up for a free account or log in to existing account
3. Verify your email address

### Step 2: Get API Token
1. Navigate to **My Profile** → **API Tokens**
2. Click **Create Token**
3. Use the **Custom token** template
4. Configure permissions:
   - **Zone:Zone:Read** (for all zones)
   - **Zone:Zone Settings:Edit** (for all zones)
   - **User:User Details:Read**
   - **Account:Cloudflare Workers:Edit** (for all accounts)
5. Add account and zone resources as needed
6. Click **Continue to summary** → **Create Token**
7. **Important**: Copy and save this token securely

### Step 3: Install Wrangler CLI
```bash
npm install -g wrangler
```

### Step 4: Authenticate Wrangler
```bash
wrangler login
```
This will open a browser window to authenticate with your Cloudflare account.

## Project Configuration

### Step 1: Verify package.json
Ensure your `package.json` includes the OpenNext Cloudflare package:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "deploy": "npx @opennextjs/cloudflare@latest"
  },
  "devDependencies": {
    "@opennextjs/cloudflare": "^0.2.0"
  }
}
```

### Step 2: Configure wrangler.toml
Verify your `wrangler.toml` configuration:

```toml
name = "nextjs-ssr-app"
compatibility_date = "2024-01-01"
node_compat = true

# Environment variables
[vars]
ENVIRONMENT = "production"

# Worker size limit: 10 MiB (Paid) / 3 MiB (Free)
# Monitor compressed size during deployment
```

### Step 3: Next.js Configuration
Ensure your `next.config.js` is properly configured:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable experimental features for Next.js 15
  },
  // OpenNext supports full Node.js runtime on Cloudflare Workers
  // No need for edge runtime restrictions
};

module.exports = nextConfig;
```

## Local Development Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Test Local Development
```bash
npm run dev
```
Verify your application runs correctly at `http://localhost:3000`

### Step 3: Test Build Process
```bash
npm run build
```
Ensure the build completes without errors.

## Building the Application

### Step 1: Build Next.js Application
```bash
npm run build
```

### Step 2: Verify Build Output
Check that the `.next` directory contains:
- Static assets
- Server-side rendered pages
- API routes

## Deployment

### Step 1: Deploy Using OpenNext
```bash
npm run deploy
```

This command will:
- Analyze your Next.js application
- Create a Cloudflare Worker-compatible bundle
- Upload the worker to Cloudflare
- Configure necessary routes and settings

### Step 2: Monitor Deployment
Watch the console output for:
- Build progress
- Upload status
- Deployment URL
- Any errors or warnings

### Step 3: Verify Deployment
After successful deployment, you'll see output similar to:
```
✅ Successfully deployed to Cloudflare Workers
🌍 Your application is available at: https://nextjs-ssr-app.your-subdomain.workers.dev
```

## Domain Configuration

### Step 1: Custom Domain (Optional)
1. In Cloudflare Dashboard, go to **Workers & Pages**
2. Click on your deployed worker (`nextjs-ssr-app`)
3. Go to **Settings** → **Triggers**
4. Click **Add Custom Domain**
5. Enter your domain (must be managed by Cloudflare)
6. Click **Add Custom Domain**

### Step 2: DNS Configuration
If using a custom domain:
1. Ensure your domain's DNS is managed by Cloudflare
2. The CNAME record will be automatically created
3. Wait for DNS propagation (usually 5-10 minutes)

## Environment Variables

### Step 1: Set Environment Variables in Cloudflare
1. In Cloudflare Dashboard, go to **Workers & Pages**
2. Click on your worker
3. Go to **Settings** → **Environment Variables**
4. Add variables for production:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_API_URL=https://your-api.com
   DATABASE_URL=your-database-connection-string
   ```

### Step 2: Update wrangler.toml (Alternative)
You can also add environment variables to `wrangler.toml`:
```toml
[vars]
ENVIRONMENT = "production"
API_BASE_URL = "https://api.example.com"
```

### Step 3: Secrets for Sensitive Data
For sensitive data like API keys:
```bash
wrangler secret put SECRET_API_KEY
```
Enter the secret value when prompted.

## Monitoring and Troubleshooting

### Step 1: View Logs
Monitor real-time logs:
```bash
wrangler tail
```

### Step 2: Cloudflare Dashboard Monitoring
1. Go to **Workers & Pages** → Your Worker
2. Check **Metrics** tab for:
   - Request volume
   - Error rates
   - Response times
   - CPU usage

### Step 3: Analytics
Enable analytics in the **Analytics** tab to track:
- Performance metrics
- Error tracking
- Usage patterns

## Common Issues

### Issue 1: Bundle Size Too Large
**Problem**: Worker exceeds size limits (3MB free, 10MB paid)
**Solution**:
- Enable tree shaking in `next.config.js`
- Remove unused dependencies
- Optimize images and assets
- Consider code splitting

### Issue 2: Build Failures
**Problem**: Build fails during deployment
**Solution**:
- Check Node.js compatibility
- Verify all dependencies are compatible with Workers
- Review build logs for specific errors

### Issue 3: Runtime Errors
**Problem**: Application runs locally but fails on Cloudflare
**Solution**:
- Check compatibility with Workers runtime
- Verify environment variables are set
- Review wrangler tail logs for specific errors

### Issue 4: API Routes Not Working
**Problem**: API routes return 404 errors
**Solution**:
- Ensure API routes are in `app/api/` directory (App Router)
- Verify route handlers export correct HTTP methods
- Check OpenNext configuration

### Issue 5: Static Assets Missing
**Problem**: CSS, images, or other assets not loading
**Solution**:
- Verify assets are in `public/` directory
- Check build output includes static assets
- Ensure correct asset paths in code

## Advanced Configuration

### Custom OpenNext Configuration
Create `open-next.config.ts` for advanced settings:
```typescript
import type { OpenNextConfig } from '@opennextjs/cloudflare';

const config: OpenNextConfig = {
  default: {
    // Custom configuration options
    experimental: {
      // Enable experimental features
    }
  }
};

export default config;
```

### Performance Optimization
1. **Enable Caching**:
   ```javascript
   // In your API routes
   export async function GET() {
     const response = new Response(data);
     response.headers.set('Cache-Control', 's-maxage=3600');
     return response;
   }
   ```

2. **Optimize Images**:
   - Use Next.js Image component
   - Enable image optimization in `next.config.js`

### Rollback Strategy
To rollback a deployment:
```bash
wrangler rollback
```

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to version control
2. **CORS**: Configure CORS properly for your API routes
3. **Authentication**: Implement proper authentication for protected routes
4. **Rate Limiting**: Consider implementing rate limiting for API endpoints

## Support and Resources

- [OpenNext Cloudflare Documentation](https://opennext.js.org/cloudflare)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)

---

**Note**: This deployment method uses OpenNext which provides full Node.js runtime support on Cloudflare Workers, allowing you to use all Next.js features including SSR, API routes, and middleware without the limitations of the Edge Runtime.