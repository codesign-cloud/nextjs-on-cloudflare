import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Environment Variables Demo - Next.js on Cloudflare',
  description: 'Demonstration of environment variable usage in Next.js on Cloudflare Workers',
}

// Server-side environment variables (only available on server)
function getServerEnvironmentData() {
  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    serverId: process.env.SERVER_ID || 'default-server',
    environment: process.env.ENVIRONMENT || 'development',
    timestamp: Date.now(),
    
    // Database and API configurations (example)
    databaseUrl: process.env.DATABASE_URL ? '[CONFIGURED]' : '[NOT SET]',
    apiKey: process.env.API_KEY ? '[CONFIGURED]' : '[NOT SET]',
    
    // Cloudflare specific
    cfRegion: process.env.CF_REGION || '[NOT SET]',
    cfRay: process.env.CF_RAY || '[NOT SET]',
    
    // Build-time variables
    nextVersion: process.env.npm_package_version || '[NOT SET]',
    buildId: process.env.BUILD_ID || '[NOT SET]'
  }
}

export default function EnvironmentDemoPage() {
  const serverEnv = getServerEnvironmentData()
  
  // Client-side accessible environment variables (NEXT_PUBLIC_ prefix)
  const clientEnv = {
    publicApiUrl: process.env.NEXT_PUBLIC_API_URL || '[NOT SET]',
    publicAppName: process.env.NEXT_PUBLIC_APP_NAME || 'Next.js on Cloudflare',
    publicVersion: process.env.NEXT_PUBLIC_VERSION || '1.0.0'
  }
  
  return (
    <div className="px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Environment Variables Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Demonstration of server-side and client-side environment variable usage
          </p>
        </div>

        {/* Server Environment Variables */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Server-Side Environment Variables
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              These variables are only accessible on the server and are not exposed to the client.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(serverEnv).map(([key, value]) => (
                <div key={key} className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </div>
                  <div className="font-mono text-sm text-gray-900 dark:text-white break-all">
                    {String(value)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Client Environment Variables */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Client-Side Environment Variables
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              These variables use the NEXT_PUBLIC_ prefix and are accessible on both server and client.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(clientEnv).map(([key, value]) => (
                <div key={key} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
                    NEXT_PUBLIC_{key.replace(/([A-Z])/g, '_$1').toUpperCase().replace('PUBLIC_', '')}
                  </div>
                  <div className="font-mono text-sm text-gray-900 dark:text-white break-all">
                    {String(value)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cloudflare Configuration */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Cloudflare Workers Configuration
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Environment variables in Cloudflare Workers can be configured in multiple ways.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-2">
                  wrangler.toml Configuration
                </h3>
                <pre className="text-sm text-yellow-700 dark:text-yellow-300 font-mono">
{`[vars]
ENVIRONMENT = "production"
SERVER_ID = "cloudflare-worker-1"
API_URL = "https://api.example.com"`}
                </pre>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
                <h3 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">
                  Cloudflare Dashboard
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Environment variables can also be set through the Cloudflare Workers dashboard under Settings → Variables.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
                <h3 className="font-semibold text-green-800 dark:text-green-400 mb-2">
                  Secrets Management
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Use <code className="bg-green-100 dark:bg-green-800 px-1 rounded">wrangler secret put SECRET_NAME</code> for sensitive data like API keys and database passwords.
                </p>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Environment Variables Best Practices
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Security Guidelines
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">⚠</span>
                    Never expose secrets in NEXT_PUBLIC_ variables
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Use wrangler secrets for sensitive data
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Validate environment variables at startup
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Use different values per environment
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Development Tips
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Use .env.local for local development
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Document required variables in README
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Provide sensible defaults when possible
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Test with different configurations
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded border">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Example Usage
              </h4>
              <pre className="text-sm text-gray-700 dark:text-gray-300 font-mono whitespace-pre-wrap">
{`// Server-side only
const dbUrl = process.env.DATABASE_URL
const apiKey = process.env.API_SECRET

// Client-side accessible
const publicApiUrl = process.env.NEXT_PUBLIC_API_URL
const appName = process.env.NEXT_PUBLIC_APP_NAME

// With validation
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required')
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}