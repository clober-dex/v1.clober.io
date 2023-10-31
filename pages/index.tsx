import React, { useState } from 'react'

import { LimitContainer } from '../containers/limit-container'
import { SwapContainer } from '../containers/swap-container'

export default function Home() {
  const [isLimit, setIsLimit] = useState(true)

  return (
    <div className="flex flex-1 relative justify-center bg-gray-950">
      <div className="flex w-full flex-col items-center gap-4 sm:gap-6 p-4 pb-0">
        <div className={`relative flex gap-4 mt-14`}>
          <button
            className="flex font-bold items-center justify-center text-base sm:text-2xl w-16 sm:w-[120px] bg-transparent text-gray-500 disabled:text-white border-0 rounded-none p-2 border-b-4 border-b-transparent border-t-4 border-t-transparent disabled:border-b-white"
            disabled={isLimit}
            onClick={() => setIsLimit(true)}
          >
            Limit
          </button>
          <button
            className="flex font-bold items-center justify-center text-base sm:text-2xl w-16 sm:w-[120px] bg-transparent text-gray-500 disabled:text-white border-0 rounded-none p-2 border-b-4 border-b-transparent border-t-4 border-t-transparent disabled:border-b-white"
            disabled={!isLimit}
            onClick={() => setIsLimit(false)}
          >
            Swap
          </button>
        </div>
        {isLimit ? <LimitContainer /> : <SwapContainer />}
      </div>
      <div className="absolute w-full h-[30%] bottom-0 bg-gradient-to-t from-blue-500 to-transparent opacity-[15%] pointer-events-none" />
    </div>
  )
}
