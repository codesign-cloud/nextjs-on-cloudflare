import Link from 'next/link'
import { RouteConfig } from '@/types/api'

const routes: RouteConfig[] = [
  {
    path: '/ssr-demo',
    label: 'SSR Demo',
    description: 'Server-side rendering example with real-time data fetching',
    newWindow: false,
  },
  {
    path: '/isr-demo',
    label: 'ISR Demo',
    description: 'Incremental Static Regeneration with automatic revalidation',
    newWindow: false,
  },
  {
    path: '/image-demo',
    label: 'Next/Image Demo',
    description: 'Image optimization with responsive sizing and lazy loading',
    newWindow: false,
  },
  {
    path: '/font-demo',
    label: 'Next/Font Demo',
    description: 'Font optimization and loading strategies',
    newWindow: false,
  },
  {
    path: '/env-demo',
    label: 'Environment Variables',
    description: 'Server and client-side environment variable usage',
    newWindow: false,
  },
  {
    path: '/api/server-info',
    label: 'Server Info API',
    description: 'Direct API endpoint returning server ID and timestamp',
    newWindow: true,
  }
];

export default function HomePage() {
  return (
    <div className="px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Next.js 15+ SSR on Cloudflare Workers
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Powered by <code>OpenNext</code> for full <code>Node.js</code> runtime support
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Features Demonstrated
            </h2>
            <ul className="text-left text-gray-600 dark:text-gray-300 space-y-2">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Server-Side Rendering (SSR) with real-time data
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Incremental Static Regeneration (ISR)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Next/Image optimization and lazy loading
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Next/Font optimization and fallbacks
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Environment variables (server & client)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                API Routes with full Node.js runtime
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Cloudflare Workers deployment via OpenNext
              </li>
            </ul>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route) => (
            <div key={route.path} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {route.label}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {route.description}
                </p>
                <Link
                  href={route.path}
                  target={route.newWindow ? '_blank' : '_self'}
                  className="inline-flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200 text-sm"
                >
                  {route.path.startsWith('/api') ? 'View API' : 'View Demo'}
                  <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Details */}
        <div className="mt-12 bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Technical Implementation
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Core Features
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                <li>• Server-side rendering (SSR)</li>
                <li>• Incremental Static Regeneration</li>
                <li>• API routes with Node.js runtime</li>
                <li>• TypeScript support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Optimizations
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                <li>• Image optimization & lazy loading</li>
                <li>• Font optimization & fallbacks</li>
                <li>• Environment variable management</li>
                <li>• Edge caching compatibility</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Deployment
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                <li>• Cloudflare Workers runtime</li>
                <li>• OpenNext integration</li>
                <li>• Global edge deployment</li>
                <li>• Zero cold start performance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
