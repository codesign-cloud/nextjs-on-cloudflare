import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ISR Demo - Next.js on Cloudflare',
  description: 'Demonstration of Next.js Incremental Static Regeneration capabilities',
}

// Enable ISR with 30 second revalidation for the index page
export const revalidate = 30

async function getPosts() {
  // Simulate fetching posts list
  const posts = [
    {
      id: '1',
      title: 'Introduction to ISR',
      excerpt: 'Learn the basics of Incremental Static Regeneration and how it combines the best of static and dynamic.',
      author: 'Next.js Team',
      publishedAt: '2024-01-15T10:00:00Z',
      readTime: '5 min read'
    },
    {
      id: '2',
      title: 'ISR on Cloudflare Workers',
      excerpt: 'Discover how ISR works seamlessly with Cloudflare Workers using OpenNext for optimal edge performance.',
      author: 'Cloudflare Team',
      publishedAt: '2024-01-20T14:30:00Z',
      readTime: '7 min read'
    },
    {
      id: '3',
      title: 'Performance Benefits',
      excerpt: 'Explore the performance advantages of ISR and how it scales for high-traffic applications.',
      author: 'Performance Team',
      publishedAt: '2024-01-25T09:15:00Z',
      readTime: '6 min read'
    }
  ]
  
  return {
    posts,
    lastUpdated: new Date().toISOString(),
    totalPosts: posts.length
  }
}

export default async function ISRDemoPage() {
  const data = await getPosts()
  
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
            Incremental Static Regeneration (ISR) Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Demonstration of Next.js ISR with automatic revalidation and edge caching
          </p>
        </div>

        {/* ISR Status */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-green-800 dark:text-green-400">
                ISR Active
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                This page is statically generated and revalidated every 30 seconds. 
                Individual posts revalidate every 60 seconds.
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-mono">
                Last updated: {data.lastUpdated}
              </p>
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Sample Blog Posts ({data.totalPosts})
          </h2>
          
          <div className="grid gap-6">
            {data.posts.map((post) => (
              <Link
                key={post.id}
                href={`/isr-demo/${post.id}`}
                className="block bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
              >
                <article>
                  <header className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </header>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Read more
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* ISR Technical Details */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            How ISR Works
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Static Generation Benefits
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Lightning-fast page loads
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Excellent SEO performance
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Reduced server load
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Edge caching compatibility
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Dynamic Features
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  Content updates automatically
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  No manual rebuilds required
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  Background regeneration
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  Scalable to millions of pages
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded border">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Configuration Example
            </h4>
            <pre className="text-sm text-gray-700 dark:text-gray-300 font-mono">
{`// Enable ISR with revalidation
export const revalidate = 60 // seconds

// Generate static params for popular content
export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}