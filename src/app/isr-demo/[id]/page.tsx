import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ISR Demo - Next.js on Cloudflare',
  description: 'Demonstration of Next.js Incremental Static Regeneration capabilities',
}

// Enable ISR with 60 second revalidation
export const revalidate = 60

// Generate initial static pages for popular posts
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ]
}

async function getPost(id: string) {
  // Simulate fetching from a database or CMS
  const posts = {
    '1': {
      title: 'Introduction to ISR',
      content: 'Incremental Static Regeneration allows you to create or update static pages after you&apos;ve built your site.',
      author: 'Next.js Team',
      publishedAt: '2024-01-15T10:00:00Z',
      views: Math.floor(Math.random() * 1000) + 100
    },
    '2': {
      title: 'ISR on Cloudflare Workers',
      content: 'Learn how ISR works seamlessly with Cloudflare Workers using OpenNext for edge optimization.',
      author: 'Cloudflare Team',
      publishedAt: '2024-01-20T14:30:00Z',
      views: Math.floor(Math.random() * 800) + 200
    },
    '3': {
      title: 'Performance Benefits',
      content: 'ISR provides the benefits of static generation with the flexibility of server-side rendering.',
      author: 'Performance Team',
      publishedAt: '2024-01-25T09:15:00Z',
      views: Math.floor(Math.random() * 1200) + 300
    }
  }
  
  const post = posts[id as keyof typeof posts]
  if (!post) {
    throw new Error('Post not found')
  }
  
  return {
    ...post,
    id,
    lastRevalidated: new Date().toISOString(),
    cacheStatus: 'regenerated'
  }
}

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ISRPostPage({ params }: PageProps) {
  const { id } = await params
  const post = await getPost(id)
  
  return (
    <div className="px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <Link 
            href="/isr-demo" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to ISR Demo
          </Link>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-400">
                  ISR Information
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  This page is statically generated and revalidated every 60 seconds. The content updates automatically without rebuilding the entire site.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {post.author}
              </div>
              
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(post.publishedAt).toLocaleDateString()}
              </div>
              
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {post.views} views
              </div>
            </div>
          </header>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {post.content}
            </p>
          </div>
        </article>

        {/* ISR Technical Details */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            ISR Technical Details
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block">
                  Post ID
                </span>
                <span className="text-lg text-gray-900 dark:text-white font-mono">
                  {post.id}
                </span>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block">
                  Last Revalidated
                </span>
                <span className="text-lg text-gray-900 dark:text-white font-mono">
                  {post.lastRevalidated}
                </span>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block">
                  Revalidation Interval
                </span>
                <span className="text-lg text-gray-900 dark:text-white font-mono">
                  60 seconds
                </span>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                ISR Benefits
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Static performance with dynamic content
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Automatic background regeneration
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  No full site rebuilds required
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Edge caching compatibility
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}