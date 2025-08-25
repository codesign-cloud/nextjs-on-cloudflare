import Link from 'next/link'
import { ServerInfoData, SSRPageData } from '@/types/api'
import ApiDataFetcher from './components/ApiDataFetcher'

// Server-side function to fetch initial data
async function getServerData(): Promise<ServerInfoData> {
  // In a real application, this could be any server-side data source
  // For this demo, we'll simulate server data generation
  const serverId = process.env.SERVER_ID || `ssr-${Math.random().toString(36).substr(2, 9)}`
  const serverTime = new Date().toISOString()
  const requestId = `ssr-req-${Date.now()}`
  const environment = process.env.NODE_ENV || 'development'
  const timestamp = Date.now()

  return {
    serverId,
    serverTime,
    requestId,
    environment,
    timestamp,
  }
}

export default async function SSRDemoPage() {
  // This runs on the server during SSR
  const serverRenderTime = new Date().toISOString()
  const initialServerInfo = await getServerData()
  
  const pageData: SSRPageData = {
    serverRenderTime,
    initialServerInfo,
    pageMetadata: {
      title: 'SSR Demo - Server-Side Rendering',
      description: 'Demonstration of Next.js 15+ Server-Side Rendering with real-time data',
    },
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
            Server-Side Rendering Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            This page demonstrates Next.js 15+ SSR capabilities with server-generated data
          </p>
        </div>

        {/* SSR Data Display */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Server-Side Rendered Data
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block">
                  Server Render Time
                </span>
                <span className="text-lg text-gray-900 dark:text-white font-mono">
                  {pageData.serverRenderTime}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block">
                  Server ID
                </span>
                <span className="text-lg text-gray-900 dark:text-white font-mono">
                  {pageData.initialServerInfo.serverId}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block">
                  Request ID
                </span>
                <span className="text-lg text-gray-900 dark:text-white font-mono">
                  {pageData.initialServerInfo.requestId}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block">
                  Server Time
                </span>
                <span className="text-lg text-gray-900 dark:text-white font-mono">
                  {pageData.initialServerInfo.serverTime}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block">
                  Environment
                </span>
                <span className="text-lg text-gray-900 dark:text-white font-mono">
                  {pageData.initialServerInfo.environment}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block">
                  Timestamp
                </span>
                <span className="text-lg text-gray-900 dark:text-white font-mono">
                  {pageData.initialServerInfo.timestamp}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Client-Side API Interaction */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Client-Side API Interaction
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Click the button below to fetch fresh data from the API route in real-time
          </p>
          <ApiDataFetcher initialData={pageData.initialServerInfo} />
        </div>

        {/* Technical Information */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Technical Implementation Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Server-Side Features
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Data generated during SSR
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  No client-side loading state
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  SEO-friendly content
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Fast initial page load
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Client-Side Features
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  Real-time API data fetching
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  Interactive user experience
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  Loading and error states
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  Client-side hydration
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}