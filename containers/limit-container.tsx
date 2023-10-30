import React, { useState } from 'react'
import { zeroAddress } from 'viem'

import { Currency } from '../model/currency'
import LimitSettingForm from '../components/form/limit-setting-form'
import { LimitForm } from '../components/form/limit-form'
import OrderBook from '../components/order-book'
import { Chart } from '../components/chart'
import OpenOrderList from '../components/open-order-list'
import { OpenOrder } from '../model/open-order'
import { useChainContext } from '../contexts/chain-context'
import { formatUnits } from '../utils/numbers'
import { useMarketContext } from '../contexts/market-context'

const availableDecimalPlacesGroups = [
  { label: '0.000001', value: 6 },
  { label: '0.00001', value: 5 },
  { label: '0.0001', value: 4 },
  { label: '0.001', value: 3 },
]

const asks = [
  {
    price: '1700.4332',
    size: '5.667',
  },
  {
    price: '1701.4332',
    size: '5.667',
  },
  {
    price: '1704.3332',
    size: '5.667',
  },
  {
    price: '1750.4332',
    size: '15.667',
  },
  {
    price: '1760.4332',
    size: '5.667',
  },
]

const bids = [
  {
    price: '1691.4332',
    size: '7.53458',
  },
  {
    price: '1690.4332',
    size: '15.2340',
  },
  {
    price: '1689.79',
    size: '13.7123',
  },
  {
    price: '1686.79',
    size: '13.7456',
  },
  {
    price: '1680.766',
    size: '3.7143',
  },
  {
    price: '1679.766',
    size: '31.7143',
  },
  {
    price: '1670.766',
    size: '16.0043',
  },
  {
    price: '1670.766',
    size: '6.0043',
  },
  {
    price: '1670.766',
    size: '6.0043',
  },
  {
    price: '1670.766',
    size: '36.0043',
  },
  {
    price: '1670.766',
    size: '6.0043',
  },
]

const openOrders = [
  {
    baseSymbol: 'WETH',
    quoteSymbol: 'USDC',
    isBid: true,
    txHash:
      '0x6d91975935196522e7da9911412a1c2c2e509b13f19f215f7aaef820f7125734',
    timestamp: 'Sep 22, 2023 8:34 PM',
    price: 1600000000000000000000n,
    filledAmount: 120000000000000000n,
    amount: 1000000000000000000n,
    claimableAmount: 700000000000000000n,
  },
  {
    baseSymbol: 'WETH',
    quoteSymbol: 'USDC',
    isBid: false,
    txHash:
      '0x6d91975935196522e7da9911412a1c2c2e509b13f19f215f7aaef820f7125734',
    timestamp: 'Sep 22, 2023 8:34 PM',
    price: 1600000000000000000000n,
    filledAmount: 1000000000000000000n,
    amount: 1230000000000000000n,
    claimableAmount: 500000000000000000n,
  },
] as OpenOrder[]

export const LimitContainer = () => {
  const { selectedChain } = useChainContext()
  const { markets, selectedMarket } = useMarketContext()

  const [isBid, setIsBid] = useState(true)
  // const [showOrderBook, setShowOrderBook] = useState(true)
  const showOrderBook = true
  const [selectMode, setSelectMode] = useState<'none' | 'settings'>('none')

  const [inputCurrency, setInputCurrency] = useState<Currency | undefined>(
    selectedMarket.quoteToken,
  )
  const [inputCurrencyAmount, setInputCurrencyAmount] = useState('')
  const [showInputCurrencySelect, setShowInputCurrencySelect] = useState(false)

  const [outputCurrency, setOutputCurrency] = useState<Currency | undefined>(
    selectedMarket.baseToken,
  )
  const [outputCurrencyAmount, setOutputCurrencyAmount] = useState('')
  const [showOutputCurrencySelect, setShowOutputCurrencySelect] =
    useState(false)
  const [claimBounty, setClaimBounty] = useState(
    formatUnits(
      selectedChain.defaultGasPrice ?? 0n,
      selectedChain.nativeCurrency.decimals,
    ),
  )

  return (
    <div className="flex flex-col w-fit mb-4 sm:mb-6">
      {/* TODO */}
      {/*<button*/}
      {/*  onClick={() => setShowOrderBook(!showOrderBook)}*/}
      {/*  className="rounded bg-blue-500 bg-opacity-20 text-blue-500 px-2 py-1 w-fit mb-3 text-xs sm:text-sm"*/}
      {/*>*/}
      {/*  {showOrderBook ? 'View Chart' : 'View Order Book'}*/}
      {/*</button>*/}
      <div className="flex flex-col w-full lg:flex-row gap-4">
        {showOrderBook ? (
          <OrderBook
            bids={bids}
            asks={asks}
            availableDecimalPlacesGroups={availableDecimalPlacesGroups}
          />
        ) : (
          <Chart />
        )}
        <div className="flex flex-col rounded-2xl bg-gray-900 p-6 w-[480px] lg:h-[480px]">
          {selectMode === 'settings' ? (
            <LimitSettingForm
              nativeCurrency={{
                address: zeroAddress,
                ...selectedChain.nativeCurrency,
              }}
              claimBounty={claimBounty}
              setClaimBounty={setClaimBounty}
              onBackClick={() => setSelectMode('none')}
            />
          ) : (
            <LimitForm
              markets={markets}
              selectedMarket={selectedMarket}
              isBid={isBid}
              setIsBid={setIsBid}
              setSelectMode={setSelectMode}
              showInputCurrencySelect={showInputCurrencySelect}
              setShowInputCurrencySelect={setShowInputCurrencySelect}
              inputCurrency={inputCurrency}
              setInputCurrency={setInputCurrency}
              inputCurrencyAmount={inputCurrencyAmount}
              setInputCurrencyAmount={setInputCurrencyAmount}
              showOutputCurrencySelect={showOutputCurrencySelect}
              setShowOutputCurrencySelect={setShowOutputCurrencySelect}
              outputCurrency={outputCurrency}
              setOutputCurrency={setOutputCurrency}
              outputCurrencyAmount={outputCurrencyAmount}
              setOutputCurrencyAmount={setOutputCurrencyAmount}
            />
          )}
        </div>
      </div>
      <div className="flex w-full justify-center mt-6">
        <OpenOrderList openOrders={openOrders} />
      </div>
    </div>
  )
}
