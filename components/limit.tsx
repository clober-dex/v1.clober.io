import { zeroAddress } from 'viem'
import React, { useState } from 'react'

import OrderBook from './trade/order-book'
import CurrencyAmountInput from './currency-amount-input'
import { ArrowDownSvg } from './svg/arrow-down-svg'
import NumberInput from './number-input'
import { SettingSvg } from './svg/setting-svg'
import LimitSetting from './trade/limit-setting'

export const Limit = () => {
  const [isBid, setIsBid] = useState(true)
  const [showOrderBook, setShowOrderBook] = useState(true)
  const [selectMode, setSelectMode] = useState<'none' | 'market' | 'settings'>(
    'none',
  )

  return (
    <div className="flex flex-col w-fit mb-4 sm:mb-6">
      <button
        onClick={() => setShowOrderBook(!showOrderBook)}
        className="rounded bg-blue-500 bg-opacity-20 text-blue-500 px-2 py-1 w-fit mb-3 text-xs sm:text-sm"
      >
        {showOrderBook ? 'View Chart' : 'View Order Book'}
      </button>
      <div className="flex flex-col w-full lg:flex-row gap-4">
        {showOrderBook ? <OrderBook /> : 'TVChartContainer'}
        <div className="flex flex-col rounded-2xl bg-gray-900 p-6 w-full sm:w-[480px]">
          {selectMode === 'settings' ? (
            <LimitSetting onBackClick={() => setSelectMode('none')} />
          ) : (
            <>
              <div className="flex rounded-lg border-solid border-[1.5px] border-gray-700 p-4 mb-3 sm:mb-4">
                <div className="flex flex-col flex-1 gap-2">
                  <div className="text-gray-500 text-xs sm:text-sm">
                    {isBid ? 'Buy' : 'Sell'} {'WETH'} at rate
                  </div>
                  <NumberInput
                    value={'1600'}
                    onValueChange={() => {}}
                    className="text-xl w-full sm:text-2xl bg-transparent placeholder-gray-500 text-white outline-none"
                  />
                </div>
                <button
                  className="text-xs sm:text-sm h-fit p-0 m-0 rounded-sm text-blue-500 bg-transparent"
                  onClick={() => {}}
                >
                  Set rate to market
                </button>
              </div>
              <div
                className={`flex ${
                  isBid ? 'flex-col' : 'flex-col-reverse'
                } relative gap-2 sm:gap-4 mb-3 sm:mb-4`}
              >
                <CurrencyAmountInput
                  currency={{
                    address: zeroAddress,
                    name: 'USDC',
                    symbol: 'USDC',
                    decimals: 6,
                  }}
                  value={'100'}
                  onValueChange={() => {}}
                  price={{ value: 1000000000000000000n, decimals: 18 }}
                  balance={1000000000n}
                />
                <CurrencyAmountInput
                  currency={{
                    address: zeroAddress,
                    name: 'WETH',
                    symbol: 'WETH',
                    decimals: 18,
                  }}
                  value={'1'}
                  onValueChange={() => {}}
                  price={{ value: 1600000000000000000000n, decimals: 18 }}
                  balance={1000000000000000000n}
                />
                <div className="absolute flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gray-900 p-1 sm:p-1.5">
                  <button
                    className="flex items-center justify-center p-0 bg-gray-700 w-full h-full rounded-full transform hover:rotate-180 transition duration-300"
                    onClick={() => setIsBid(!isBid)}
                  >
                    <ArrowDownSvg className="w-4 h-4 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>
              <div className="flex justify-end mb-3 sm:mb-4">
                <button
                  className="flex items-center gap-1 text-blue-500 bg-blue-500 hover:bg-opacity-30 bg-opacity-20 rounded px-2 text-xs sm:text-sm h-6 sm:h-7"
                  onClick={() => setSelectMode('settings')}
                >
                  <SettingSvg className="w-3 h-3 sm:w-4 sm:h-4" />
                  Setting
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {/*{userAddress ? (*/}
      {/*    <div className="flex w-full justify-center mt-6 sm:w-[1120px]">*/}
      {/*      <OrderList simplified={true} />*/}
      {/*    </div>*/}
      {/*) : (*/}
      {/*    <></>*/}
      {/*)}*/}
    </div>
  )
}
