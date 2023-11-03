import BigNumber from 'bignumber.js'

import { Market } from '../model/market'
import { Decimals } from '../model/decimals'

import { toPlacesString } from './bignumber'
import { PRICE_DECIMAL } from './prices'
import { formatUnits } from './bigint'

export function calculateOutputCurrencyAmount(
  isBid: boolean,
  inputCurrencyAmount: string,
  priceInput: string,
  outputCurrencyDecimals: number,
) {
  return toPlacesString(
    isBid
      ? new BigNumber(inputCurrencyAmount).div(priceInput)
      : new BigNumber(inputCurrencyAmount).times(priceInput),
    outputCurrencyDecimals,
  )
}

export function calculatePriceIndex(
  isBid: boolean,
  inputCurrencyAmount: string,
  outputCurrencyAmount: string,
  currentPriceInput: string,
) {
  const expectedPriceInput = isBid
    ? new BigNumber(inputCurrencyAmount).div(outputCurrencyAmount)
    : new BigNumber(inputCurrencyAmount).times(outputCurrencyAmount)
  return expectedPriceInput.isNaN() || !expectedPriceInput.isFinite()
    ? currentPriceInput
    : toPlacesString(expectedPriceInput, PRICE_DECIMAL)
}

export function parseDepth(
  isBid: boolean,
  market: Market,
  decimalPlaces: Decimals,
) {
  return Array.from(
    [...(isBid ? market.bids : market.asks).map((depth) => ({ ...depth }))]
      .sort((a, b) =>
        isBid
          ? Number(b.priceIndex) - Number(a.priceIndex)
          : Number(a.priceIndex) - Number(b.priceIndex),
      )
      .map((x) => {
        return {
          price: formatUnits(x.price, PRICE_DECIMAL),
          size: new BigNumber(
            formatUnits(
              x.baseAmount,
              isBid ? market.quoteToken.decimals : market.baseToken.decimals,
            ),
          ),
        }
      })
      .reduce((prev, curr) => {
        const price = new BigNumber(curr.price)
        const key = new BigNumber(price).toFixed(
          decimalPlaces.value,
          BigNumber.ROUND_FLOOR,
        )
        prev.set(
          key,
          prev.has(key)
            ? {
                price: key,
                size: curr.size.plus(prev.get(key)?.size || 0),
              }
            : {
                price: key,
                size: curr.size,
              },
        )
        return prev
      }, new Map<string, { price: string; size: BigNumber }>())
      .values(),
  ).map((x) => {
    return {
      price: x.price,
      size: toPlacesString(
        x.size,
        isBid ? market.quoteToken.decimals : market.baseToken.decimals,
      ),
    }
  })
}
