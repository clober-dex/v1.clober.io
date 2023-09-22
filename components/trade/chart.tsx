import React, { useRef, useState } from 'react'

import { ResolutionString } from '../../tv-chart-library/charting_library'

const supportedIntervals = [
  ['60', '1H'],
  ['1D', '1D'],
  ['1W', '1W'],
  ['1M', '1M'],
]
const interval = '1D' as ResolutionString

export const Chart = ({ ...props }) => {
  const [fullscreen, setFullscreen] = useState(false)
  const ref = useRef<any>()

  const onSetInterval = (key: ResolutionString) => {
    setInterval(key)
  }

  return (
    <>
      {fullscreen && (
        <div className="flex flex-col rounded-2xl bg-gray-900 overflow-hidden min-h-[280px] w-full  sm:w-[480px]" />
      )}
      <div
        className={`flex flex-col bg-gray-900 overflow-hidden ${
          fullscreen
            ? 'w-full fixed left-0 top-0 right-0 bottom-0 z-10'
            : 'rounded-2xl min-h-[280px] w-full sm:w-[480px]'
        }`}
        {...props}
      >
        <div className="left-0 top-0 right-20 z-20 flex items-center justify-end gap-2 p-4">
          {supportedIntervals.map(([key, label]) => (
            <button
              key={key}
              className={`px-2 py-1 rounded-2xl text-xs md:text-sm ${
                key === interval
                  ? 'bg-gray-700 text-white'
                  : 'bg-transparent text-gray-500 hover:bg-gray-800 hover:text-gray-200'
              }`}
              onClick={() => onSetInterval(key as ResolutionString)}
            >
              {label}
            </button>
          ))}
          <button
            className={`max-lg:hidden p-0 pl-2 bg-transparent`}
            onClick={() => setFullscreen((x) => !x)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="block w-4 h-4 stroke-gray-500 hover:stroke-gray-200"
            >
              <path
                d="M11 2H14V5"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
              <path
                d="M10 6L13 3"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
              <path
                d="M5 14H2V11"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
              <path
                d="M6 10L3 13"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col flex-1 [&>iframe]:flex-1" ref={ref} />
      </div>
    </>
  )
}
