# Configuration Guide

This document provides a comprehensive list of all environment variables, GitHub secrets, Cloudflare variables, and configuration settings that you need to set up for this Next.js on Cloudflare Workers project.

## Table of Contents
1. [Required Configuration](#required-configuration)
2. [Optional Configuration](#optional-configuration)
3. [Configuration Locations](#configuration-locations)
4. [Step-by-Step Setup Instructions](#step-by-step-setup-instructions)
5. [Environment-Specific Variables](#environment-specific-variables)
6. [Verification and Testing](#verification-and-testing)

---

## Required Configuration

### GitHub Secrets (Required)
These **MUST** be configured for CI/CD deployment to work:

| Variable Name | Description | Where to Get | Where to Add |
|---------------|-------------|--------------|--------------|
| `CLOUDFLARE_API_TOKEN` | API token for Cloudflare Workers deployment | Cloudflare Dashboard → My Profile → API Tokens | GitHub Repository → Settings → Secrets and variables → Actions → Secrets |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account identifier | Cloudflare Dashboard → Right sidebar | GitHub Repository → Settings → Secrets and variables → Actions → Secrets |

#### How to Get Required Values:

**CLOUDFLARE_API_TOKEN:**
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **My Profile** → **API Tokens**
3. Click **Create Token** → **Custom token**
4. Configure permissions:
   - **Account - Cloudflare Workers:Edit**
   - **Zone - Zone Settings:Read** (if using custom domain)
   - **Zone - Zone:Read** (if using custom domain)
5. Set **Account Resources** to your account
6. Set **Zone Resources** to your domain (if applicable)
7. Click **Continue to summary** → **Create Token**
8. **Copy the token immediately** (you won't see it again)

**CLOUDFLARE_ACCOUNT_ID:**
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Copy the **Account ID** from the right sidebar

### GitHub Environments (Required)
Create these environments in GitHub Repository → Settings → Environments:

| Environment Name | Description | Required Reviewers | Deployment Branches |
|------------------|-------------|--------------------|-------------------|
| `staging` | For pull request deployments | Optional | Any branch |
| `production` | For main branch deployments | **Recommended** | `main` only |

---

## Optional Configuration

### GitHub Repository Variables (Optional)
For dynamic deployment URLs in CI/CD notifications:

| Variable Name | Description | Example Value | Where to Add |
|---------------|-------------|---------------|--------------|
| `CUSTOM_DOMAIN` | Your custom domain (takes priority) | `myapp.com` | GitHub Repository → Settings → Secrets and variables → Actions → Variables |
| `CLOUDFLARE_WORKERS_SUBDOMAIN` | Your Cloudflare Workers subdomain | `my-company` | GitHub Repository → Settings → Secrets and variables → Actions → Variables |

**Variable Priority:**
- If `CUSTOM_DOMAIN` is set: Uses `https://myapp.com` and `https://staging.myapp.com`
- If only `CLOUDFLARE_WORKERS_SUBDOMAIN` is set: Uses `https://nextjs-ssr-app.my-company.workers.dev`
- If neither is set: Falls back to `https://nextjs-ssr-app.your-subdomain.workers.dev`

### Application Environment Variables (Optional)
Variables used by the Next.js application:

| Variable Name | Description | Default Value | Where to Set | Used In |
|---------------|-------------|---------------|--------------|---------|
| `NODE_ENV` | Runtime environment | `development` | Cloudflare Dashboard or wrangler.toml | API routes, SSR pages |
| `SERVER_ID` | Custom server identifier | Auto-generated UUID | wrangler.toml or Cloudflare Dashboard | SSR demo page |
| `ENVIRONMENT` | Application environment identifier | `production`/`staging` | wrangler.toml | All environments |

### Custom Environment Variables (Examples)
Add these if your application needs them:

| Variable Name | Description | Example | Where to Set | Sensitivity |
|---------------|-------------|---------|--------------|-------------|
| `DATABASE_URL` | Database connection string | `postgresql://user:pass@host:5432/db` | GitHub Secrets or Cloudflare Secrets | **Sensitive** |
| `NEXT_PUBLIC_API_URL` | Public API endpoint | `https://api.myapp.com` | wrangler.toml or Cloudflare Dashboard | Public |
| `SECRET_API_KEY` | Third-party service API key | `sk_live_...` | GitHub Secrets or Cloudflare Secrets | **Sensitive** |
| `JWT_SECRET` | JWT signing secret | Random secure string | GitHub Secrets or Cloudflare Secrets | **Sensitive** |
| `SMTP_PASSWORD` | Email service password | Password string | GitHub Secrets or Cloudflare Secrets | **Sensitive** |

---

## Configuration Locations

### 1. GitHub Repository Settings
**Path:** `Repository → Settings → Secrets and variables → Actions`

**Secrets Tab (Sensitive Data):**
- `CLOUDFLARE_API_TOKEN` ✅ **Required**
- `CLOUDFLARE_ACCOUNT_ID` ✅ **Required**
- `DATABASE_URL` (if needed)
- `SECRET_API_KEY` (if needed)
- `JWT_SECRET` (if needed)
- Any other sensitive application secrets

**Variables Tab (Non-Sensitive Data):**
- `CUSTOM_DOMAIN` (optional)
- `CLOUDFLARE_WORKERS_SUBDOMAIN` (optional)
- `NEXT_PUBLIC_API_URL` (if needed)

### 2. GitHub Environments
**Path:** `Repository → Settings → Environments`

**staging environment:**
- Optional reviewers
- Any deployment branch allowed
- Environment-specific secrets (if different from repository secrets)

**production environment:**
- **Recommended:** Required reviewers
- **Recommended:** Only `main` branch deployment
- Environment-specific secrets (if different from repository secrets)

### 3. wrangler.toml File
**File:** `wrangler.toml`

```toml
name = "nextjs-ssr-app"
compatibility_date = "2024-01-01"
node_compat = true

# Custom domain routes (uncomment and configure)
# [[routes]]
# pattern = "myapp.com/*"
# custom_domain = true

# Production environment variables
[vars]
ENVIRONMENT = "production"
SERVER_ID = "prod-server-001"  # Optional
NEXT_PUBLIC_API_URL = "https://api.myapp.com"  # Optional

# Staging environment
[env.staging]
name = "nextjs-ssr-app-staging"

# Custom staging domain (uncomment and configure)
# [[env.staging.routes]]
# pattern = "staging.myapp.com/*"
# custom_domain = true

[env.staging.vars]
ENVIRONMENT = "staging"
SERVER_ID = "staging-server-001"  # Optional
NEXT_PUBLIC_API_URL = "https://api-staging.myapp.com"  # Optional
```

### 4. Cloudflare Dashboard
**Path:** `Cloudflare Dashboard → Workers & Pages → Your Worker → Settings → Environment Variables`

**When to use:**
- Alternative to wrangler.toml for environment variables
- Runtime updates without redeployment
- Environment-specific overrides

**How to set:**
1. Go to **Workers & Pages**
2. Click on your worker (`nextjs-ssr-app`)
3. Navigate to **Settings** → **Environment Variables**
4. Click **Add variable** for each environment

### 5. Cloudflare Secrets (Via Wrangler CLI)
**For sensitive data that shouldn't be in wrangler.toml:**

```bash
# Set secrets via Wrangler CLI
wrangler secret put DATABASE_URL
wrangler secret put SECRET_API_KEY
wrangler secret put JWT_SECRET

# Set secrets for specific environments
wrangler secret put DATABASE_URL --env staging
wrangler secret put DATABASE_URL --env production
```

---

## Step-by-Step Setup Instructions

### Step 1: Cloudflare Configuration
1. **Create Cloudflare Account** (if not exists):
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Sign up for free account

2. **Get Account ID**:
   - Copy **Account ID** from dashboard sidebar
   - Save this value

3. **Create API Token**:
   - Go to **My Profile** → **API Tokens**
   - Click **Create Token** → **Custom token**
   - Add permissions: `Account - Cloudflare Workers:Edit`
   - For custom domains, also add: `Zone - Zone:Read`, `Zone - Zone Settings:Read`
   - **Copy token immediately**

### Step 2: GitHub Repository Setup
1. **Add Required Secrets**:
   - Go to `Repository → Settings → Secrets and variables → Actions`
   - Click **Secrets** tab → **New repository secret**
   - Add `CLOUDFLARE_API_TOKEN` with your API token
   - Add `CLOUDFLARE_ACCOUNT_ID` with your Account ID

2. **Add Optional Variables** (if needed):
   - Click **Variables** tab → **New repository variable**
   - Add `CUSTOM_DOMAIN` with your domain (e.g., `myapp.com`)
   - OR add `CLOUDFLARE_WORKERS_SUBDOMAIN` with your subdomain (e.g., `my-company`)

3. **Create Environments**:
   - Go to `Repository → Settings → Environments`
   - Create `staging` environment (optional reviewers)
   - Create `production` environment (recommended: required reviewers, main branch only)

### Step 3: Application Configuration
1. **Update wrangler.toml**:
   - Configure custom domains (if using)
   - Add application environment variables
   - Set environment-specific variables

2. **Add Application Secrets** (if needed):
   ```bash
   # For sensitive application data
   wrangler secret put DATABASE_URL
   wrangler secret put SECRET_API_KEY
   ```

### Step 4: Custom Domain Setup (Optional)
1. **Add Domain to Cloudflare** (if not already):
   - Cloudflare Dashboard → **Add a Site**
   - Follow DNS setup instructions

2. **Configure Custom Domain**:
   - Go to **Workers & Pages** → Your Worker
   - **Settings** → **Triggers** → **Add Custom Domain**
   - Add your domain (e.g., `myapp.com`)

3. **Update wrangler.toml**:
   ```toml
   [[routes]]
   pattern = "myapp.com/*"
   custom_domain = true
   ```

---

## Environment-Specific Variables

### Production Environment
```toml
[vars]
ENVIRONMENT = "production"
NODE_ENV = "production"
SERVER_ID = "prod-server-001"
NEXT_PUBLIC_API_URL = "https://api.myapp.com"
```

### Staging Environment
```toml
[env.staging.vars]
ENVIRONMENT = "staging"
NODE_ENV = "staging"
SERVER_ID = "staging-server-001"
NEXT_PUBLIC_API_URL = "https://api-staging.myapp.com"
```

### Local Development
Create `.env.local` file (add to `.gitignore`):
```bash
NODE_ENV=development
SERVER_ID=dev-server-001
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL=postgresql://localhost:5432/myapp_dev
SECRET_API_KEY=dev_key_here
```

---

## Verification and Testing

### 1. Verify GitHub Secrets
```bash
# In GitHub Actions logs, you should see:
# ✅ CLOUDFLARE_API_TOKEN is set
# ✅ CLOUDFLARE_ACCOUNT_ID is set
```

### 2. Test Wrangler Configuration
```bash
# Test authentication
npx wrangler whoami

# Test configuration
npx wrangler deploy --dry-run

# View environment variables
npx wrangler secret list
```

### 3. Test Deployment URLs
After setting up GitHub variables, check CI/CD notifications show correct URLs:
- **With CUSTOM_DOMAIN**: `https://myapp.com`
- **With CLOUDFLARE_WORKERS_SUBDOMAIN**: `https://nextjs-ssr-app.my-company.workers.dev`
- **Without either**: `https://nextjs-ssr-app.your-subdomain.workers.dev`

### 4. Test Application Environment Variables
Visit `/api/server-info` endpoint to verify:
- `environment` field shows correct value
- `serverId` uses custom `SERVER_ID` if set
- Other variables are accessible in your application

### 5. Test Custom Domain (If Configured)
```bash
# Test domain resolution
nslookup myapp.com

# Test HTTPS access
curl -I https://myapp.com

# Verify in browser
# - SSL certificate is valid (green lock)
# - Application loads correctly
```

---

## Troubleshooting Configuration Issues

### Common Issues

#### 1. GitHub Actions Authentication Fails
**Error**: `Error: Authentication failed`
**Check**:
- ✅ `CLOUDFLARE_API_TOKEN` secret exists
- ✅ Token has correct permissions
- ✅ Token hasn't expired
- ✅ Account ID is correct

#### 2. Environment Variables Not Working
**Error**: Variables undefined in application
**Check**:
- ✅ Variables are in `wrangler.toml` under correct environment
- ✅ Secrets are set via `wrangler secret put`
- ✅ Public variables start with `NEXT_PUBLIC_`

#### 3. Custom Domain Not Working
**Error**: Domain not accessible
**Check**:
- ✅ Domain is added to Cloudflare Workers
- ✅ Domain DNS is managed by Cloudflare
- ✅ Routes are configured in `wrangler.toml`
- ✅ SSL certificate is generated

#### 4. Deployment URLs Incorrect
**Error**: Wrong URLs in CI/CD notifications
**Check**:
- ✅ `CUSTOM_DOMAIN` or `CLOUDFLARE_WORKERS_SUBDOMAIN` variables are set correctly
- ✅ Variables are in **Variables** tab, not **Secrets** tab
- ✅ Variable names match exactly (case-sensitive)

### Getting Help

If you encounter issues:
1. Check the **Actions** tab for workflow logs
2. Review **Cloudflare Dashboard** → **Workers & Pages** → **Deployments**
3. Use `wrangler tail` to see runtime logs
4. Create an issue using the [deployment issue template](.github/ISSUE_TEMPLATE/deployment-issue.md)

---

## Security Best Practices

### Secret Management
- ✅ **Never commit secrets to repository**
- ✅ Use GitHub Secrets for sensitive data
- ✅ Use Wrangler secrets for runtime-sensitive data
- ✅ Rotate API tokens regularly
- ✅ Use environment-specific secrets when needed

### Access Control
- ✅ Enable branch protection on `main` branch
- ✅ Require reviewers for production deployments
- ✅ Use least-privilege permissions for API tokens
- ✅ Limit deployment environments to specific branches

### Monitoring
- ✅ Monitor failed deployments
- ✅ Set up notifications for deployment failures
- ✅ Regularly audit access permissions
- ✅ Monitor API token usage in Cloudflare Dashboard

---

*For detailed setup instructions, see [CLOUDFLARE_DEPLOY.MD](./CLOUDFLARE_DEPLOY.MD) and [CLOUDFLARE_GH_CICD.MD](./CLOUDFLARE_GH_CICD.MD)*
