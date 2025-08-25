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

### Overview
Cloudflare Workers supports two primary domain configuration options:
1. **Default Workers Subdomain**: `your-app.your-subdomain.workers.dev` (free)
2. **Custom Domain**: Your own domain like `myapp.com` (requires domain managed by Cloudflare)

### Option 1: Using Default Workers Subdomain

Your application will be automatically available at:
- **Production**: `https://nextjs-ssr-app.your-subdomain.workers.dev`
- **Staging**: `https://nextjs-ssr-app-staging.your-subdomain.workers.dev`

No additional configuration needed for this option.

### Option 2: Custom Domain Setup

#### Prerequisites for Custom Domain
1. **Domain ownership**: You must own the domain you want to use
2. **Cloudflare DNS management**: Your domain's nameservers must point to Cloudflare
3. **Cloudflare zone**: Your domain must be added as a zone in your Cloudflare account

#### Step 1: Add Domain to Cloudflare

If your domain isn't already managed by Cloudflare:

1. **Login to Cloudflare Dashboard**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Click **"Add a Site"**

2. **Add Your Domain**
   - Enter your domain name (e.g., `myapp.com`)
   - Click **"Add Site"**
   - Select a plan (Free plan works for most use cases)

3. **Review DNS Records**
   - Cloudflare will scan and import existing DNS records
   - Review and verify all records are correct
   - Click **"Continue"**

4. **Update Nameservers**
   - Cloudflare will provide two nameservers
   - Update your domain's nameservers at your domain registrar
   - Wait for nameserver propagation (usually 24-48 hours)

5. **Verify Domain Status**
   - Return to Cloudflare Dashboard
   - Ensure domain status shows **"Active"**

#### Step 2: Configure Custom Domain in Cloudflare Workers

1. **Navigate to Workers & Pages**
   - Go to Cloudflare Dashboard
   - Click **"Workers & Pages"** in the left sidebar

2. **Select Your Worker**
   - Find and click on your deployed worker (e.g., `nextjs-ssr-app`)

3. **Access Triggers Settings**
   - Click on the **"Settings"** tab
   - Select **"Triggers"** from the submenu

4. **Add Custom Domain**
   - In the **"Custom Domains"** section, click **"Add Custom Domain"**
   - Enter your domain:
     - For production: `myapp.com`
     - For staging: `staging.myapp.com` (or `dev.myapp.com`)
   - Click **"Add Custom Domain"**

5. **SSL Certificate Generation**
   - Cloudflare will automatically generate and install SSL certificates
   - This process usually takes 5-15 minutes
   - You'll see a status indicator showing certificate generation progress

#### Step 3: Configure DNS Records (Automatic)

Cloudflare automatically creates the necessary DNS records:
- **CNAME record**: Points your domain to the Workers infrastructure
- **Example**: `myapp.com` → `nextjs-ssr-app.workers.dev`

You can verify this in:
1. **Cloudflare Dashboard** → **DNS** → **Records**
2. Look for CNAME records pointing to `*.workers.dev`

#### Step 4: Configure Staging Subdomain (Optional)

For staging environments:

1. **Add Staging Subdomain**
   - Follow the same process as production
   - Use a subdomain like `staging.myapp.com` or `dev.myapp.com`

2. **Deploy Staging Worker**
   - Ensure your staging worker (`nextjs-ssr-app-staging`) is deployed
   - Add the staging subdomain to the staging worker

#### Step 5: Update wrangler.toml for Custom Domain

Update your `wrangler.toml` to include route configuration:

```toml
name = "nextjs-ssr-app"
compatibility_date = "2024-01-01"
node_compat = true

# Production environment with custom domain
[[routes]]
pattern = "myapp.com/*"
custom_domain = true

[vars]
ENVIRONMENT = "production"

# Staging environment
[env.staging]
name = "nextjs-ssr-app-staging"

[[env.staging.routes]]
pattern = "staging.myapp.com/*"
custom_domain = true

[env.staging.vars]
ENVIRONMENT = "staging"
```

#### Step 6: Update GitHub Actions Variables

To enable dynamic URL notifications in your CI/CD pipeline:

1. **Go to GitHub Repository Settings**
   - Navigate to your repository on GitHub
   - Click **"Settings"** → **"Secrets and variables"** → **"Actions"**

2. **Add Repository Variables**
   - Click the **"Variables"** tab
   - Add the following variables:

   **For Custom Domain:**
   ```
   Name: CUSTOM_DOMAIN
   Value: myapp.com
   ```

   **OR For Cloudflare Subdomain:**
   ```
   Name: CLOUDFLARE_SUBDOMAIN
   Value: your-company-name
   ```

3. **Variable Priority**
   - `CUSTOM_DOMAIN` takes precedence over `CLOUDFLARE_SUBDOMAIN`
   - If both are set, `CUSTOM_DOMAIN` will be used
   - If neither is set, defaults to `your-subdomain.workers.dev`

#### Step 7: Verify Custom Domain Setup

1. **Test Domain Resolution**
   ```bash
   nslookup myapp.com
   # Should show Cloudflare IP addresses
   ```

2. **Test HTTPS Access**
   ```bash
   curl -I https://myapp.com
   # Should return successful response with SSL certificate
   ```

3. **Browser Test**
   - Open `https://myapp.com` in your browser
   - Verify SSL certificate is valid (green lock icon)
   - Confirm application loads correctly

4. **Test Staging Domain** (if configured)
   - Open `https://staging.myapp.com` in your browser
   - Verify staging environment is accessible

#### Troubleshooting Custom Domain Issues

**Issue: Domain not resolving**
- **Solution**: Check nameserver propagation, verify domain is "Active" in Cloudflare

**Issue: SSL certificate not generating**
- **Solution**: Ensure domain is properly added to Cloudflare zone, wait up to 24 hours

**Issue: 522 Connection timed out error**
- **Solution**: Verify Worker is deployed and responding, check Worker logs

**Issue: Custom domain not found in Workers dashboard**
- **Solution**: Ensure domain is in the same Cloudflare account as the Worker

#### Advanced Custom Domain Configuration

**Multiple Domains**
You can add multiple custom domains to the same Worker:
```toml
[[routes]]
pattern = "myapp.com/*"
custom_domain = true

[[routes]]
pattern = "www.myapp.com/*"
custom_domain = true

[[routes]]
pattern = "app.myapp.com/*"
custom_domain = true
```

**Redirect www to apex domain** (or vice versa)
Create a redirect rule in Cloudflare:
1. **Dashboard** → **Rules** → **Redirect Rules**
2. **Create rule**:
   - **When incoming requests match**: `hostname equals www.myapp.com`
   - **Then redirect to**: `https://myapp.com$1`
   - **Status code**: 301 (Permanent Redirect)

#### Custom Domain Best Practices

1. **Use HTTPS Only**: Always redirect HTTP to HTTPS
2. **Enable HSTS**: Set up HTTP Strict Transport Security
3. **Configure CAA Records**: Add DNS CAA records for additional security
4. **Monitor SSL Expiry**: Cloudflare auto-renews, but monitor for issues
5. **Test Regularly**: Set up monitoring to verify domain accessibility

### DNS Configuration (Legacy Method)

⚠️ **Note**: The manual DNS configuration method below is generally not needed when using Cloudflare's "Add Custom Domain" feature, which handles DNS automatically.

If using manual DNS configuration:
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