import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next/Image Demo - Next.js on Cloudflare',
  description: 'Demonstration of Next.js Image optimization capabilities',
}

export default function ImageDemoPage() {
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
            Next/Image Optimization Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Demonstration of Next.js Image component optimization features and performance benefits
          </p>
        </div>

        {/* Image Examples */}
        <div className="space-y-8">
          {/* Responsive Image */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Responsive Image with Placeholder
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              This image demonstrates responsive sizing and blur placeholder using data URIs.
            </p>
            
            <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
              <Image
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjMxMDY4Ii8+CjxwYXRoIGQ9Ik0zMDAgMTUwSDUwMFYyNTBIMzAwVjE1MFoiIGZpbGw9IndoaXRlIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMUIxRDI5IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiI+U2FtcGxlIEltYWdlPC90ZXh0Pgo8L3N2Zz4K"
                alt="Sample responsive image"
                width={800}
                height={400}
                className="w-full h-auto"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI0IiB2aWV3Qm94PSIwIDAgOCA0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI0IiBmaWxsPSIjRjMxMDY4Ii8+Cjwvc3ZnPgo="
                priority
              />
            </div>
            
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              <p><strong>Features:</strong> Responsive sizing, blur placeholder, priority loading</p>
            </div>
          </div>

          {/* Different Sizes */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Different Image Sizes and Aspect Ratios
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Demonstration of various image sizes and aspect ratios with Next/Image optimization.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              {/* Square Image */}
              <div className="text-center">
                <div className="relative w-full aspect-square mb-2 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <Image
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMTA5OEY3Ii8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iNzUiIGZpbGw9IndoaXRlIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTU1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMUIxRDI5IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCI+U3F1YXJlPC90ZXh0Pgo8L3N2Zz4K"
                    alt="Square image"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Square (1:1)</p>
              </div>

              {/* Portrait Image */}
              <div className="text-center">
                <div className="relative w-full aspect-[3/4] mb-2 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <Image
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMDA3MDU5Ii8+CjxyZWN0IHg9IjEwMCIgeT0iMTUwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0id2hpdGUiLz4KPHR4dCB4PSIxNTAiIHk9IjIwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzFCMUQyOSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiPlBvcnRyYWl0PC90ZXh0Pgo8L3N2Zz4K"
                    alt="Portrait image"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Portrait (3:4)</p>
              </div>

              {/* Landscape Image */}
              <div className="text-center">
                <div className="relative w-full aspect-[4/3] mb-2 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <Image
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkJCRjI0Ii8+CjxyZWN0IHg9IjE1MCIgeT0iMTAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0id2hpdGUiLz4KPHR4dCB4PSIyMDAiIHk9IjE1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzFCMUQyOSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiPkxhbmRzY2FwZTwvdGV4dD4KPC9zdmc+Cg=="
                    alt="Landscape image"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="text-sm text-gray-600 dark-text-gray-300">Landscape (4:3)</p>
              </div>
            </div>
          </div>

          {/* Lazy Loading Demo */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Lazy Loading and Performance
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              These images demonstrate lazy loading behavior - they only load when they come into view.
            </p>
            
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                    <Image
                      src={`data:image/svg+xml;base64,${btoa(`
                        <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="96" height="96" fill="#${i === 1 ? 'EF4444' : i === 2 ? '3B82F6' : '10B981'}"/>
                          <text x="48" y="52" text-anchor="middle" fill="white" font-family="sans-serif" font-size="14">${i}</text>
                        </svg>
                      `)}`}
                      alt={`Lazy loaded image ${i}`}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Lazy Loaded Image {i}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      This image loads when it comes into view, reducing initial page load time.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Next/Image Optimization Features
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Automatic Optimizations
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Automatic format selection (WebP, AVIF)
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Responsive image sizing
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Lazy loading by default
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Blur placeholder support
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Cloudflare Benefits
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Edge-optimized delivery
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Global CDN caching
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Automatic compression
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Performance monitoring
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded border">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Usage Example
              </h4>
              <pre className="text-sm text-gray-700 dark:text-gray-300 font-mono whitespace-pre-wrap">
{`import Image from 'next/image'

<Image
  src="/sample.jpg"
  alt="Description"
  width={800}
  height={400}
  placeholder="blur"
  priority // for above-the-fold images
  sizes="(max-width: 768px) 100vw, 50vw"
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}