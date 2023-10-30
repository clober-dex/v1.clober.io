import React, { useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'

import { Market } from '../model/market'
import { formatUnits } from '../utils/numbers'
import { Decimals } from '../model/decimals'
import { PRICE_DECIMAL } from '../utils/prices'
import { toPlacesString } from '../utils/bignumber'

import DecimalsSelector from './selector/decimals-selector'

export default function OrderBook({
  market,
  availableDecimalPlacesGroups,
  ...props
}: {
  market: Market
  availableDecimalPlacesGroups: Decimals[]
} & React.HTMLAttributes<HTMLDivElement>) {
  const [selectedDecimalPlaces, setSelectedDecimalPlaces] = useState<Decimals>(
    availableDecimalPlacesGroups[0],
  )

  const bids = useMemo(
    () =>
      Array.from(
        market.bids
          .map((x) => {
            return {
              price: formatUnits(x.price, PRICE_DECIMAL),
              size: new BigNumber(
                formatUnits(x.baseAmount, market.quoteToken.decimals),
              ),
            }
          })
          .reduce((prev, curr) => {
            const price = new BigNumber(curr.price)
            const key = new BigNumber(price).toFixed(
              selectedDecimalPlaces?.value ?? PRICE_DECIMAL,
              BigNumber.ROUND_FLOOR,
            )
            prev.set(
              key,
              prev.has(key)
                ? {
                    ...curr,
                    size: curr.size.plus(prev.get(key)?.size || 0),
                  }
                : curr,
            )
            return prev
          }, new Map<string, { price: string; size: BigNumber }>())
          .values(),
      ),
    [market, selectedDecimalPlaces],
  )

  const asks = useMemo(
    () =>
      Array.from(
        market.asks
          .map((x) => {
            return {
              price: formatUnits(x.price, PRICE_DECIMAL),
              size: new BigNumber(
                formatUnits(x.baseAmount, market.baseToken.decimals),
              ),
            }
          })
          .reduce((prev, curr) => {
            const price = new BigNumber(curr.price)
            const key = new BigNumber(price).toFixed(
              selectedDecimalPlaces?.value ?? PRICE_DECIMAL,
              BigNumber.ROUND_FLOOR,
            )
            prev.set(
              key,
              prev.has(key)
                ? {
                    ...curr,
                    size: curr.size.plus(prev.get(key)?.size || 0),
                  }
                : curr,
            )
            return prev
          }, new Map<string, { price: string; size: BigNumber }>())
          .values(),
      ),
    [market, selectedDecimalPlaces],
  )

  useEffect(() => {
    setSelectedDecimalPlaces(availableDecimalPlacesGroups[0])
  }, [availableDecimalPlacesGroups, setSelectedDecimalPlaces])

  const biggestDepth = BigNumber.max(
    BigNumber.max(...asks.map(({ size }) => size), 0),
    BigNumber.max(...bids.map(({ size }) => size), 0),
  )

  return (
    <div
      {...props}
      className="flex flex-col p-4 sm:p-6 bg-gray-900 rounded-lg sm:rounded-xl gap-6 w-full sm:w-[480px]"
    >
      <div className="flex items-center justify-between">
        <div className="text-sm sm:text-base text-white font-bold">
          {market.baseToken.symbol}/{market.quoteToken.symbol}
        </div>
        <div className="flex items-center gap-2">
          <DecimalsSelector
            availableDecimalPlacesGroups={availableDecimalPlacesGroups}
            value={selectedDecimalPlaces}
            onValueChange={setSelectedDecimalPlaces}
          />
        </div>
      </div>

      <div className="flex text-xs">
        <div className="flex flex-1 flex-col basis-0 overflow-auto">
          <div className="flex justify-between text-gray-500 gap-4 sm:gap-12 px-2 mb-1 sm:mb-3">
            <div>Amount</div>
            <div>Price</div>
          </div>
          {Array.from(
            market.bids
              .map((x) => {
                return {
                  price: formatUnits(x.price, PRICE_DECIMAL),
                  size: new BigNumber(
                    formatUnits(x.baseAmount, market.quoteToken.decimals),
                  ),
                }
              })
              .reduce((prev, curr) => {
                const price = new BigNumber(curr.price)
                const key = new BigNumber(price).toFixed(
                  selectedDecimalPlaces.value,
                )

                let newValue = curr
                if (prev.has(key)) {
                  const prevValue = prev.get(key)
                  newValue = {
                    ...newValue,
                    size: newValue.size.plus(prevValue?.size || 0),
                  }
                }
                newValue.price = key
                prev.set(key, newValue)
                return prev
              }, new Map<string, { price: string; size: BigNumber }>())
              .values(),
          ).map(({ price, size }, index) => {
            return (
              <div
                key={`bid-${index}`}
                className="px-2 flex items-center justify-between shrink-0 relative tabular-nums"
              >
                <div className="text-gray-200">{toPlacesString(size)}</div>
                <div className="text-green-500">{price}</div>
                <div
                  className="absolute h-full right-0 bg-[#45D87F26]"
                  style={{
                    width: `${new BigNumber(size)
                      .div(biggestDepth)
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
          {Array.from(
            market.asks
              .map((x) => {
                return {
                  price: formatUnits(x.price, PRICE_DECIMAL),
                  size: new BigNumber(
                    formatUnits(x.baseAmount, market.baseToken.decimals),
                  ),
                }
              })
              .reduce((prev, curr) => {
                const price = new BigNumber(curr.price)
                const key = new BigNumber(price).toFixed(
                  selectedDecimalPlaces.value,
                )

                let newValue = curr
                if (prev.has(key)) {
                  const prevValue = prev.get(key)
                  newValue = {
                    ...newValue,
                    size: newValue.size.plus(prevValue?.size || 0),
                  }
                }
                newValue.price = key
                prev.set(key, newValue)
                return prev
              }, new Map<string, { price: string; size: BigNumber }>())
              .values(),
          ).map(({ price, size }, index) => {
            return (
              <div
                key={`ask-${index}`}
                className="px-2 flex items-center justify-between shrink-0 relative tabular-nums"
              >
                <div className="text-red-500">{price}</div>
                <div className="text-gray-200">{toPlacesString(size)}</div>
                <div
                  className="absolute h-full left-0 bg-[#F94E5C26]"
                  style={{
                    width: `${new BigNumber(size)
                      .div(biggestDepth)
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
