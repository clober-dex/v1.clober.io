import BigNumber from 'bignumber.js'

import { formatUnits } from './numbers'
import { getDecimalPlaces } from './bignumber'

export const PRICE_DECIMAL = 18

export const getPriceDecimals = (price: bigint, d: bigint, r: bigint) => {
  if (d > 0n) {
    return getDecimalPlaces(new BigNumber(formatUnits(d, PRICE_DECIMAL)), 1)
  } else if (r > 0n) {
    const priceNumber = new BigNumber(formatUnits(price, PRICE_DECIMAL))
    return getDecimalPlaces(
      new BigNumber(formatUnits(r, PRICE_DECIMAL))
        .multipliedBy(priceNumber)
        .minus(priceNumber),
      1,
    )
  } else {
    throw new Error('Unknown strategy')
  }
}
