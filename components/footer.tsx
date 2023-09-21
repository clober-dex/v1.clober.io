import React from 'react'

const Footer = () => {
  return (
    <div className="sm:flex bg-transparent">
      <div className="fixed bottom-0 left-0 right-0 flex h-8 justify-between items-center px-4 text-xs text-gray-500">
        <span>
          Support:{' '}
          <a
            href="mailto:official@clober.io"
            className="text-gray-500 hover:text-blue-500"
          >
            official@clober.io
          </a>
        </span>
        <span>
          Powered by Clober (v
          {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7)})
        </span>
      </div>
    </div>
  )
}

export default Footer
