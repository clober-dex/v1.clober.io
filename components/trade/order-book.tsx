import React from 'react'
import BigNumber from 'bignumber.js'

import DecimalsSelector from './decimals-selector'

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

export default function OrderBook(props: React.HTMLAttributes<HTMLDivElement>) {
  const biggest = BigNumber.max(
    asks.reduce((acc, { size }) => BigNumber.max(acc, size), new BigNumber(0)),
    bids.reduce((acc, { size }) => BigNumber.max(acc, size), new BigNumber(0)),
  )

  return (
    <div
      {...props}
      className="flex flex-col p-4 sm:p-6 bg-gray-900 rounded-lg sm:rounded-xl gap-6 w-full sm:w-[480px]"
    >
      <div className="flex items-center justify-between">
        <div className="text-sm sm:text-base text-white font-bold">
          ETC-USDC
        </div>
        <div className="flex items-center gap-2">
          <DecimalsSelector
            availableDecimalPlacesGroups={availableDecimalPlacesGroups}
            value={availableDecimalPlacesGroups[0]}
          />
        </div>
      </div>

      <div className="flex text-xs">
        <div className="flex flex-1 flex-col basis-0 overflow-auto">
          <div className="flex justify-between text-gray-500 gap-4 sm:gap-12 px-2 mb-1 sm:mb-3">
            <div>Amount</div>
            <div>Price</div>
          </div>
          {bids.map(({ price, size }, index) => {
            return (
              <div
                key={`bid-${index}`}
                className="px-2 flex items-center justify-between shrink-0 relative tabular-nums"
              >
                <div className="text-gray-200">{size}</div>
                <div className="text-green-500">{price}</div>
                <div
                  className="absolute h-full right-0 bg-[#45D87F26]"
                  style={{
                    width: `${new BigNumber(size)
                      .div(biggest)
                      .multipliedBy(100)
                      .toNumber()}%`,
                  }}
                />
              </div>
            )
          })}
        </div>
        <div className="flex flex-1 flex-col basis-0 overflow-auto">
          <div className="flex justify-between text-gray-500 gap-4 sm:gap-12 px-2 mb-1 sm:mb-3">
            <div>Price</div>
            <div>Amount</div>
          </div>
          {asks.map(({ price, size }, index) => {
            return (
              <div
                key={`ask-${index}`}
                className="px-2 flex items-center justify-between shrink-0 relative tabular-nums"
              >
                <div className="text-red-500">{price}</div>
                <div className="text-gray-200">{size}</div>
                <div
                  className="absolute h-full left-0 bg-[#F94E5C26]"
                  style={{
                    width: `${new BigNumber(size)
                      .div(biggest)
                      .multipliedBy(100)
                      .toNumber()}%`,
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
