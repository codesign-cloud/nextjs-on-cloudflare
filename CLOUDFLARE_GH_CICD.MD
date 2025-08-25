# GitHub Actions CI/CD Pipeline for Cloudflare Workers

This guide provides step-by-step instructions for setting up a complete CI/CD pipeline using GitHub Actions to automatically build, test, and deploy your Next.js application to Cloudflare Workers.

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [GitHub Repository Setup](#github-repository-setup)
4. [Cloudflare Configuration](#cloudflare-configuration)
5. [GitHub Secrets Configuration](#github-secrets-configuration)
6. [GitHub Environments Setup](#github-environments-setup)
7. [Workflow Configuration](#workflow-configuration)
8. [Testing the Pipeline](#testing-the-pipeline)
9. [Advanced Configuration](#advanced-configuration)
10. [Troubleshooting](#troubleshooting)

## Overview

The CI/CD pipeline includes:
- **Continuous Integration**: Automated testing and linting on every push/PR
- **Staging Deployment**: Automatic deployment to staging environment on pull requests
- **Production Deployment**: Automatic deployment to production on main branch pushes
- **Multi-environment Support**: Separate staging and production environments
- **Manual Deployment**: Option to trigger deployments manually

## Prerequisites

Before setting up the pipeline, ensure you have:
- A GitHub repository for your project
- A Cloudflare account with Workers enabled
- Cloudflare API token with appropriate permissions
- Your Cloudflare Account ID
- Admin access to your GitHub repository

## GitHub Repository Setup

### Step 1: Push Your Code to GitHub

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub repository**:
   - Go to [GitHub](https://github.com)
   - Click "New repository"
   - Name your repository (e.g., `nextjs-cloudflare-app`)
   - Choose public or private
   - Click "Create repository"

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Verify GitHub Actions is Enabled

1. Go to your repository on GitHub
2. Click **Settings** tab
3. In the left sidebar, click **Actions** → **General**
4. Ensure "Allow all actions and reusable workflows" is selected
5. Click **Save**

## Cloudflare Configuration

### Step 1: Get Cloudflare Account ID

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. In the right sidebar, copy your **Account ID**
3. Save this value - you'll need it for GitHub secrets

### Step 2: Create API Token

1. Go to **My Profile** → **API Tokens**
2. Click **Create Token**
3. Use **Custom token** template
4. Configure permissions:
   ```
   Account - Cloudflare Workers:Edit
   Zone - Zone Settings:Read (if using custom domain)
   Zone - Zone:Read (if using custom domain)
   ```
5. Set **Account Resources** to your account
6. Set **Zone Resources** to your domain (if applicable)
7. Click **Continue to summary** → **Create Token**
8. **Copy the token immediately** - you won't see it again

### Step 3: Verify Token Permissions

Test your token locally:
```bash
export CLOUDFLARE_API_TOKEN="your-token-here"
npx wrangler whoami
```

## GitHub Secrets Configuration

### Step 1: Access Repository Secrets

1. Go to your GitHub repository
2. Click **Settings** tab
3. In left sidebar, click **Secrets and variables** → **Actions**

### Step 2: Add Required Secrets

Click **New repository secret** for each of the following:

1. **CLOUDFLARE_API_TOKEN**
   - Name: `CLOUDFLARE_API_TOKEN`
   - Secret: Your Cloudflare API token from previous step

2. **CLOUDFLARE_ACCOUNT_ID**
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Secret: Your Cloudflare Account ID

### Step 3: Add Optional Environment Variables

If your application uses environment variables, add them as secrets:

Examples:
- `DATABASE_URL`
- `NEXT_PUBLIC_API_URL`
- `SECRET_KEY`
- Any other application-specific secrets

## GitHub Environments Setup

### Step 1: Create Staging Environment

1. In your repository, go to **Settings** → **Environments**
2. Click **New environment**
3. Name: `staging`
4. Click **Configure environment**
5. Optional: Add **Required reviewers** if you want manual approval
6. Optional: Add **Deployment branches** rule to limit which branches can deploy
7. Click **Save protection rules**

### Step 2: Create Production Environment

1. Click **New environment**
2. Name: `production`
3. Click **Configure environment**
4. **Recommended**: Add **Required reviewers** for production deployments
5. Add **Deployment branches** rule:
   - Select "Selected branches"
   - Add pattern: `main`
6. Click **Save protection rules**

### Step 3: Environment-Specific Secrets (Optional)

For each environment, you can override secrets:
1. Click on the environment name
2. Click **Add secret**
3. Add environment-specific values (e.g., different database URLs)

## Workflow Configuration

The GitHub Actions workflow is already created at `.github/workflows/deploy.yml`. Here's what it does:

### Workflow Triggers
- **Push to main**: Triggers production deployment
- **Pull Request**: Triggers staging deployment
- **Manual dispatch**: Allows manual triggering

### Jobs Overview

1. **Test Job**:
   - Runs on every push/PR
   - Installs dependencies
   - Runs linting
   - Builds the application

2. **Deploy Staging Job**:
   - Runs only on pull requests
   - Deploys to staging environment
   - Uses staging configuration

3. **Deploy Production Job**:
   - Runs only on main branch pushes
   - Requires test job to pass
   - Deploys to production environment

## Testing the Pipeline

### Step 1: Test Pull Request Flow

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/test-deployment
   ```

2. **Make a small change** (e.g., update a component):
   ```bash
   # Edit src/app/page.tsx or any file
   git add .
   git commit -m "Test: Update homepage content"
   git push origin feature/test-deployment
   ```

3. **Create Pull Request**:
   - Go to GitHub repository
   - Click "Compare & pull request"
   - Add description
   - Click "Create pull request"

4. **Monitor the workflow**:
   - Go to **Actions** tab
   - Watch the "Test and Lint" and "Deploy to Staging" jobs
   - Staging deployment should create a preview environment

### Step 2: Test Production Deployment

1. **Merge the Pull Request**:
   - After staging tests pass, merge the PR
   - This triggers production deployment

2. **Monitor Production Deployment**:
   - Go to **Actions** tab
   - Watch the production deployment job
   - Verify deployment success

### Step 3: Manual Deployment

1. Go to **Actions** tab
2. Click **Deploy to Cloudflare Workers** workflow
3. Click **Run workflow**
4. Select branch and click **Run workflow**

## Advanced Configuration

### Custom Build Commands

If you need custom build steps, modify `.github/workflows/deploy.yml`:

```yaml
- name: Custom build step
  run: |
    npm run custom-build-command
    npm run optimize-assets
```

### Environment-Specific Builds

For different builds per environment:

```yaml
- name: Build for staging
  if: github.event_name == 'pull_request'
  run: npm run build:staging
  
- name: Build for production
  if: github.ref == 'refs/heads/main'
  run: npm run build:production
```

### Deployment Notifications

Add Slack/Discord notifications:

```yaml
- name: Notify Slack
  if: success()
  uses: 8398a7/action-slack@v3
  with:
    status: success
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### Caching Optimization

The workflow already includes npm caching. For additional optimization:

```yaml
- name: Cache .next folder
  uses: actions/cache@v4
  with:
    path: .next
    key: ${{ runner.os }}-nextjs-${{ hashFiles('package-lock.json') }}
```

## Monitoring and Notifications

### Step 1: Email Notifications

GitHub automatically sends email notifications for failed workflows to repository admins.

### Step 2: GitHub Status Checks

The workflow creates status checks that appear on pull requests:
- ✅ Test and Lint
- ✅ Deploy to Staging

### Step 3: Cloudflare Dashboard

Monitor deployments in Cloudflare:
1. Go to **Workers & Pages**
2. Click on your worker
3. Check **Deployments** tab for history
4. Monitor **Metrics** for performance

## Troubleshooting

### Common Issues

#### 1. Authentication Errors
**Problem**: `Error: Authentication failed`
**Solution**:
- Verify `CLOUDFLARE_API_TOKEN` secret is correct
- Check token permissions in Cloudflare dashboard
- Ensure token hasn't expired

#### 2. Build Failures
**Problem**: Build fails in CI but works locally
**Solution**:
- Check Node.js version matches between local and CI
- Verify all dependencies are in `package.json`
- Check for environment-specific issues

#### 3. Deployment Timeouts
**Problem**: Deployment takes too long or times out
**Solution**:
- Check bundle size (should be under 10MB for paid, 3MB for free)
- Optimize dependencies and assets
- Consider code splitting

#### 4. Environment Variables Not Working
**Problem**: App works locally but fails in deployment
**Solution**:
- Verify secrets are added to GitHub
- Check secret names match exactly
- Ensure staging/production environments have correct values

### Debugging Steps

1. **Check Workflow Logs**:
   - Go to Actions tab
   - Click on failed workflow
   - Expand failed steps to see detailed logs

2. **Local Testing**:
   ```bash
   # Test build locally
   npm run build
   
   # Test deployment locally
   npm run deploy
   ```

3. **Wrangler Debugging**:
   ```bash
   # Check wrangler configuration
   npx wrangler whoami
   
   # Test deployment manually
   npx wrangler deploy
   ```

## Security Best Practices

### 1. Secret Management
- Never commit secrets to repository
- Use GitHub secrets for sensitive data
- Rotate API tokens regularly
- Use environment-specific secrets when needed

### 2. Branch Protection
- Enable branch protection on main branch
- Require status checks to pass
- Require pull request reviews
- Restrict force pushes

### 3. Least Privilege Access
- Use minimal required permissions for API tokens
- Limit deployment environments to specific branches
- Use required reviewers for production deployments

## Workflow Customization

### Adding Tests

Add test steps to the workflow:

```yaml
- name: Run unit tests
  run: npm test

- name: Run integration tests
  run: npm run test:integration

- name: Run E2E tests
  run: npm run test:e2e
```

### Adding Security Scans

Add security scanning:

```yaml
- name: Run security audit
  run: npm audit --audit-level high

- name: Scan for vulnerabilities
  uses: securecodewarrior/github-action-add-sarif@v1
  with:
    sarif-file: security-scan-results.sarif
```

### Performance Monitoring

Add performance checks:

```yaml
- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v9
  with:
    configPath: './lighthouserc.json'
```

## Conclusion

Your CI/CD pipeline is now configured to:
- ✅ Automatically test code on every push
- ✅ Deploy staging environments for pull requests
- ✅ Deploy production on main branch merges
- ✅ Support manual deployments
- ✅ Provide deployment status and notifications

The pipeline ensures code quality, prevents broken deployments, and provides a smooth development workflow for your team.

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [OpenNext Cloudflare Documentation](https://opennext.js.org/cloudflare)