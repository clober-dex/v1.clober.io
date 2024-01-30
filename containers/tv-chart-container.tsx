import React, { useEffect, useRef, useState } from 'react'

import {
  ChartingLibraryWidgetOptions,
  CustomTimezones,
  IChartingLibraryWidget,
  LanguageCode,
  ResolutionString,
  widget,
} from '../public/static/charting_library'

export type ChartProps = {
  symbol: ChartingLibraryWidgetOptions['symbol']
} & React.HTMLAttributes<HTMLDivElement>

function getLanguageFromURL(): LanguageCode | null {
  const regex = new RegExp('[\\?&]lang=([^&#]*)')
  const results = regex.exec(location.search)
  return results === null
    ? null
    : (decodeURIComponent(results[1].replace(/\+/g, ' ')) as LanguageCode)
}

const supportedIntervals = [
  ['60', '1H'],
  ['1D', '1D'],
  ['1W', '1W'],
  ['1M', '1M'],
]

export const TvChartContainer = ({ symbol, ...props }: ChartProps) => {
  const [mounted, setMounted] = useState(false)
  const [interval, setInterval] = useState('1D' as ResolutionString)
  const [fullscreen, setFullscreen] = useState(false)

  const ref = useRef<any>()
  const refWidget = useRef<IChartingLibraryWidget>(null)

  useEffect(() => {
    // @ts-ignore
    refWidget.current = new widget({
      symbol,
      datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
        'https://demo_feed.tradingview.com',
        undefined,
        {
          maxResponseLength: 1000,
          expectedOrder: 'latestFirst',
        },
      ),
      interval,
      container: ref.current,
      library_path: '/static/charting_library/',
      locale: getLanguageFromURL() || 'en',
      disabled_features: [
        'header_widget',
        'header_symbol_search',
        'symbol_search_hot_key',
        'header_compare',
        'timeframes_toolbar',
        'create_volume_indicator_by_default',
      ],
      enabled_features: ['study_templates', 'hide_left_toolbar_by_default'],
      charts_storage_url: 'https://saveload.tradingview.com',
      charts_storage_api_version: '1.1',
      client_id: 'tradingview.com',
      user_id: 'public_user_id',
      theme: 'Dark',
      autosize: true,
      toolbar_bg: '#111827',
      loading_screen: {
        backgroundColor: '#111827',
        foregroundColor: '#111827',
      },
      overrides: {
        'mainSeriesProperties.priceAxisProperties.log': true,
      },
    })

    refWidget.current.onChartReady(() => {
      if (!refWidget.current) {
        return
      }
      refWidget.current.applyOverrides({
        'paneProperties.backgroundGradientStartColor': '#111827',
        'paneProperties.backgroundGradientEndColor': '#111827',
      })
      refWidget.current.activeChart().createStudy('Volume', false, false)
      setMounted(true)
    })

    return () => {
      if (refWidget.current) {
        refWidget.current.remove()
        setMounted(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (mounted && refWidget.current && refWidget.current.activeChart) {
      refWidget.current.activeChart().setSymbol(symbol || '')
      try {
        refWidget.current
          ?.activeChart()
          .getTimezoneApi()
          .setTimezone(
            Intl.DateTimeFormat().resolvedOptions().timeZone as CustomTimezones,
          )
      } catch (e) {
        console.error(e)
      }
    }
  }, [mounted, symbol])

  const onSetInterval = (key: ResolutionString) => {
    setInterval(key)
    refWidget.current?.activeChart().setResolution(key)
    // set local timezone in tradingview library using IChartWidgetApi.getTimezoneApi
    try {
      refWidget.current
        ?.activeChart()
        .getTimezoneApi()
        .setTimezone(
          Intl.DateTimeFormat().resolvedOptions().timeZone as CustomTimezones,
        )
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      {fullscreen && (
        <div className="flex flex-col rounded-2xl bg-gray-900 overflow-hidden min-h-[280px] w-full md:w-[480px] lg:w-[704px]" />
      )}
      <div
        className={`flex flex-col bg-gray-900 overflow-hidden ${
          fullscreen
            ? 'w-full fixed left-0 top-0 right-0 bottom-0 z-10'
            : 'rounded-2xl min-h-[280px] w-full md:w-[480px] lg:w-[704px]'
        }`}
        {...props}
      >
        <div className="absolute left-0 top-0 right-20 z-20 flex items-center justify-end gap-2 p-4">
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
