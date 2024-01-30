import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import dynamic from 'next/dynamic'

import {
  ChartingLibraryWidgetOptions,
  ResolutionString,
} from '../public/static/charting_library'

const defaultWidgetProps: Partial<ChartingLibraryWidgetOptions> = {
  symbol: 'AAPL',
  interval: '1D' as ResolutionString,
  library_path: '/static/charting_library/',
  locale: 'en',
  charts_storage_url: 'https://saveload.tradingview.com',
  charts_storage_api_version: '1.1',
  client_id: 'tradingview.com',
  user_id: 'public_user_id',
  fullscreen: false,
  autosize: true,
}

const TVChartContainer = dynamic(
  () => import('../components/chart').then((mod) => mod.Chart),
  { ssr: false },
)

export const ChartContainer = () => {
  const [isScriptReady, setIsScriptReady] = useState(false)

  useEffect(() => {
    console.log('ChartContainer')
  }, [])

  return (
    <>
      <Script
        src="/static/datafeeds/udf/dist/bundle.js"
        strategy="lazyOnload"
        onReady={() => {
          setIsScriptReady(true)
        }}
      />
      {isScriptReady ? <TVChartContainer {...defaultWidgetProps} /> : <></>}
    </>
  )
}
