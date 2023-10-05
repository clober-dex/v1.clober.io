import React, { useState } from 'react'

import { Limit } from '../components/limit'

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
        {isLimit ? (
          <Limit />
        ) : (
          <div className="flex flex-col w-fit max-sm:w-full mb-4 sm:mb-6">
            {/*<div className="flex flex-col w-full lg:flex-row gap-4">*/}
            {/*  <Swap />*/}
            {/*  <PathViz />*/}
            {/*</div>*/}
            {/*{selectedChain && selectedChain.id === polygonZkEvm.id && (*/}
            {/*    <div className="flex flex-row-reverse sm:px-6 py-12 w-full">*/}
            {/*      {swapInput && swapInput.dexResults ? <CompareDex /> : <></>}*/}
            {/*    </div>*/}
            {/*)}*/}
          </div>
        )}
        {/*<img className="flex bg-gray-950" src={swapInput?.pathVizImage} />*/}
      </div>
    </div>
  )
}
