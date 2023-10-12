import { isAddressEqual } from 'viem'
import React, { useState } from 'react'
import Image from 'next/image'

import NumberInput from '../input/number-input'
import CurrencyAmountInput from '../input/currency-amount-input'
import CurrencySelect from '../selector/currency-select'
import { Currency } from '../../model/currency'

import OrderBook from './order-book'
import { Chart } from './chart'
import LimitSetting from './limit-setting'
import OpenOrderList from './open-order-list'

const currencies = [
  {
    address: '0x0000000000000000000000000000000000000001',
    name: 'USDC',
    symbol: 'USDC',
    decimals: 6,
  },
  {
    address: '0x0000000000000000000000000000000000000002',
    name: 'WBTC',
    symbol: 'WBTC',
    decimals: 8,
  },
  {
    address: '0x0000000000000000000000000000000000000003',
    name: 'WETH',
    symbol: 'WETH',
    decimals: 18,
  },
  {
    address: '0x0000000000000000000000000000000000000004',
    name: 'USDT',
    symbol: 'USDT',
    decimals: 6,
  },
  {
    address: '0x0000000000000000000000000000000000000005',
    name: 'DAI',
    symbol: 'DAI',
    decimals: 18,
  },
] as Currency[]

export const Limit = () => {
  const [isBid, setIsBid] = useState(true)
  const [showOrderBook, setShowOrderBook] = useState(true)
  const [selectMode, setSelectMode] = useState<'none' | 'market' | 'settings'>(
    'none',
  )

  const [inputCurrency, setInputCurrency] = useState<Currency | undefined>(
    undefined,
  )
  const [inputCurrencyAmount, setInputCurrencyAmount] = useState('')
  const [showInputCurrencySelect, setShowInputCurrencySelect] = useState(false)

  const [outputCurrency, setOutputCurrency] = useState<Currency | undefined>(
    undefined,
  )
  const [outputCurrencyAmount, setOutputCurrencyAmount] = useState('')
  const [showOutputCurrencySelect, setShowOutputCurrencySelect] =
    useState(false)

  return (
    <div className="flex flex-col w-fit mb-4 sm:mb-6">
      <button
        onClick={() => setShowOrderBook(!showOrderBook)}
        className="rounded bg-blue-500 bg-opacity-20 text-blue-500 px-2 py-1 w-fit mb-3 text-xs sm:text-sm"
      >
        {showOrderBook ? 'View Chart' : 'View Order Book'}
      </button>
      <div className="flex flex-col w-full lg:flex-row gap-4">
        {showOrderBook ? <OrderBook /> : <Chart />}
        <div className="flex flex-col rounded-2xl bg-gray-900 p-6 w-full sm:w-[480px]">
          {selectMode === 'settings' ? (
            <LimitSetting onBackClick={() => setSelectMode('none')} />
          ) : showInputCurrencySelect ? (
            <CurrencySelect
              currencies={currencies}
              onBack={() => setShowInputCurrencySelect(false)}
              onCurrencySelect={(inputCurrency) => {
                setInputCurrency(
                  currencies.find((currency) =>
                    isAddressEqual(currency.address, inputCurrency.address),
                  ),
                )
                setShowInputCurrencySelect(false)
              }}
            />
          ) : showOutputCurrencySelect ? (
            <CurrencySelect
              currencies={currencies}
              onBack={() => setShowOutputCurrencySelect(false)}
              onCurrencySelect={(outputCurrency) => {
                setOutputCurrency(
                  currencies.find((currency) =>
                    isAddressEqual(currency.address, outputCurrency.address),
                  ),
                )
                setShowOutputCurrencySelect(false)
              }}
            />
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
                  currency={inputCurrency}
                  value={inputCurrencyAmount}
                  onValueChange={setInputCurrencyAmount}
                  balance={0n}
                  onCurrencyClick={() => setShowInputCurrencySelect(true)}
                />
                <CurrencyAmountInput
                  currency={outputCurrency}
                  value={outputCurrencyAmount}
                  onValueChange={setOutputCurrencyAmount}
                  balance={0n}
                  onCurrencyClick={() => setShowOutputCurrencySelect(true)}
                />
                <div className="absolute flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gray-900 p-1 sm:p-1.5">
                  <button
                    className="flex items-center justify-center p-0 bg-gray-700 w-full h-full rounded-full transform hover:rotate-180 transition duration-300"
                    onClick={() => setIsBid(!isBid)}
                  >
                    <div className="w-4 h-4 sm:w-6 sm:h-6 relative">
                      <Image
                        src="/assets/arrow-down.svg"
                        alt="ArrowDown"
                        fill
                      />
                    </div>
                  </button>
                </div>
              </div>
              <div className="flex justify-end mb-3 sm:mb-4">
                <button
                  className="flex items-center gap-1 text-blue-500 bg-blue-500 hover:bg-opacity-30 bg-opacity-20 rounded px-2 text-xs sm:text-sm h-6 sm:h-7"
                  onClick={() => setSelectMode('settings')}
                >
                  <div className="w-3 h-3 sm:w-4 sm:h-4 relative">
                    <Image src="/assets/settings.svg" alt="settings" fill />
                  </div>
                  Setting
                </button>
              </div>
              <button
                className="flex items-center font-bold justify-center rounded-lg bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-800 disabled:text-gray-500 text-base sm:text-xl h-12 sm:h-16"
                disabled={false}
              >
                Connect wallet
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex w-full justify-center mt-6">
        <OpenOrderList />
      </div>
    </div>
  )
}
