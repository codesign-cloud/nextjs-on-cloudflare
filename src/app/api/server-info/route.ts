import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { ServerInfoResponse, ErrorResponse } from '@/types/api'

// Generate a persistent server ID for this instance
const SERVER_ID = randomUUID()

export async function GET(request: NextRequest): Promise<NextResponse<ServerInfoResponse | ErrorResponse>> {
  const requestTime = new Date().toISOString()
  
  try {
    // Generate unique request ID
    const requestId = randomUUID()
    
    // Get current timestamp
    const now = new Date()
    const serverTime = now.toISOString()
    const timestamp = now.getTime()
    
    // Determine environment
    const environment = process.env.NODE_ENV || 'development'
    
    // Prepare response data
    const responseData: ServerInfoResponse = {
      success: true,
      data: {
        serverId: SERVER_ID,
        serverTime,
        requestId,
        environment,
        timestamp,
      },
      metadata: {
        requestTime,
        responseTime: new Date().toISOString(),
      },
    }

    // Add CORS headers for cross-origin requests
    const response = NextResponse.json(responseData, { 
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Server-ID': SERVER_ID,
        'X-Request-ID': requestId,
      }
    })

    return response
  } catch (error) {
    console.error('Server info API error:', error)
    
    const errorResponse: ErrorResponse = {
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to retrieve server information',
        timestamp: new Date().toISOString(),
      },
    }

    return NextResponse.json(errorResponse, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    })
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}