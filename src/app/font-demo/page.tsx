import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next/Font Demo - Next.js on Cloudflare',
  description: 'Demonstration of Next.js font optimization capabilities',
}

export default function FontDemoPage() {
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
            Next/Font Optimization Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Demonstration of Next.js font optimization features and web font loading strategies
          </p>
        </div>

        {/* Font Examples */}
        <div className="space-y-8">
          {/* System Fonts */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              System Fonts (Fallback Strategy)
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Using system fonts provides the fastest loading experience and works reliably in all environments.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded">
                <h3 className="font-sans text-lg font-medium mb-2">Font Sans (Default)</h3>
                <p className="font-sans text-gray-700 dark:text-gray-300">
                  This is rendered using the default sans-serif font stack: system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, sans-serif
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded">
                <h3 className="font-serif text-lg font-medium mb-2">Font Serif</h3>
                <p className="font-serif text-gray-700 dark:text-gray-300">
                  This is rendered using the serif font stack: Georgia, Cambria, &quot;Times New Roman&quot;, Times, serif
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded">
                <h3 className="font-mono text-lg font-medium mb-2">Font Mono</h3>
                <p className="font-mono text-gray-700 dark:text-gray-300">
                  This is rendered using the monospace font stack: ui-monospace, SFMono-Regular, &quot;SF Mono&quot;, Consolas, &quot;Liberation Mono&quot;, Menlo, monospace
                </p>
              </div>
            </div>
          </div>

          {/* Font Loading Strategy */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Font Loading Strategy
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Production Benefits
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Zero layout shift with fallback fonts
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Optimal font loading performance
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Automatic font subsetting
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Self-hosted fonts for privacy
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Cloudflare Integration
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Works with OpenNext deployment
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Compatible with Workers runtime
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Edge-optimized font delivery
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    No external font dependencies
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Implementation Details */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Implementation Notes
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This demo uses system fonts as a fallback strategy that works reliably in all environments, 
                including Cloudflare Workers with network restrictions. In production, you can configure 
                Google Fonts or custom fonts with proper network access.
              </p>
              
              <div className="bg-white dark:bg-gray-800 rounded p-4 font-mono text-sm">
                <div className="text-gray-500 dark:text-gray-400 mb-2">{/* Example next/font configuration: */}</div>
                <div className="text-gray-800 dark:text-gray-200">
                  <div>import &#123; Inter &#125; from &apos;next/font/google&apos;</div>
                  <div className="mt-2">const inter = Inter(&#123;</div>
                  <div className="ml-4">subsets: [&apos;latin&apos;],</div>
                  <div className="ml-4">display: &apos;swap&apos;,</div>
                  <div className="ml-4">fallback: [&apos;system-ui&apos;, &apos;arial&apos;]</div>
                  <div>&#125;)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}