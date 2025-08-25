'use client'

import { useState } from 'react'
import { ServerInfoData, ServerInfoResponse, ApiDataFetcherProps, ApiDataFetcherState } from '@/types/api'

export default function ApiDataFetcher({ initialData }: ApiDataFetcherProps) {
  const [state, setState] = useState<ApiDataFetcherState>({
    data: initialData || null,
    loading: false,
    error: null,
  })

  const fetchServerInfo = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const response = await fetch('/api/server-info', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ServerInfoResponse = await response.json()
      
      if (result.success) {
        setState(prev => ({ 
          ...prev, 
          data: result.data, 
          loading: false,
          error: null 
        }))
      } else {
        throw new Error('API returned unsuccessful response')
      }
    } catch (error) {
      console.error('Failed to fetch server info:', error)
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }))
    }
  }

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleString()
  }

  const getTimeDifference = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    return `${(diff / 1000).toFixed(1)}s ago`
  }

  return (
    <div className="space-y-4">
      {/* Fetch Button */}
      <button
        onClick={fetchServerInfo}
        disabled={state.loading}
        className={`
          inline-flex items-center px-4 py-2 rounded-md font-medium transition-colors duration-200
          ${state.loading 
            ? 'bg-gray-400 cursor-not-allowed text-white' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
          }
        `}
      >
        {state.loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Fetching...
          </>
        ) : (
          <>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Fetch Fresh Data
          </>
        )}
      </button>

      {/* Error Display */}
      {state.error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-400">
                Error fetching data
              </h3>
              <div className="mt-1 text-sm text-red-700 dark:text-red-300">
                {state.error}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Data Display */}
      {state.data && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4">
          <h3 className="text-lg font-medium text-green-800 dark:text-green-400 mb-3">
            Latest API Response
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div>
                <span className="text-xs font-medium text-green-600 dark:text-green-400 block uppercase tracking-wide">
                  Server ID
                </span>
                <span className="text-sm text-green-800 dark:text-green-300 font-mono">
                  {state.data.serverId}
                </span>
              </div>
              <div>
                <span className="text-xs font-medium text-green-600 dark:text-green-400 block uppercase tracking-wide">
                  Request ID
                </span>
                <span className="text-sm text-green-800 dark:text-green-300 font-mono">
                  {state.data.requestId}
                </span>
              </div>
              <div>
                <span className="text-xs font-medium text-green-600 dark:text-green-400 block uppercase tracking-wide">
                  Environment
                </span>
                <span className="text-sm text-green-800 dark:text-green-300 font-mono">
                  {state.data.environment}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-xs font-medium text-green-600 dark:text-green-400 block uppercase tracking-wide">
                  Server Time
                </span>
                <span className="text-sm text-green-800 dark:text-green-300 font-mono">
                  {formatTime(state.data.serverTime)}
                </span>
              </div>
              <div>
                <span className="text-xs font-medium text-green-600 dark:text-green-400 block uppercase tracking-wide">
                  Timestamp
                </span>
                <span className="text-sm text-green-800 dark:text-green-300 font-mono">
                  {state.data.timestamp}
                </span>
              </div>
              <div>
                <span className="text-xs font-medium text-green-600 dark:text-green-400 block uppercase tracking-wide">
                  Fetched
                </span>
                <span className="text-sm text-green-800 dark:text-green-300 font-mono">
                  {getTimeDifference(state.data.timestamp)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Information about the API */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
        <h4 className="text-sm font-medium text-blue-800 dark:text-blue-400 mb-2">
          About the API Endpoint
        </h4>
        <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
          <li>• <strong>Endpoint:</strong> <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">/api/server-info</code></li>
          <li>• <strong>Method:</strong> GET</li>
          <li>• <strong>Runtime:</strong> Full Node.js (not Edge Runtime)</li>
          <li>• <strong>Response:</strong> JSON with server metadata</li>
          <li>• <strong>CORS:</strong> Enabled for cross-origin requests</li>
        </ul>
      </div>
    </div>
  )
}