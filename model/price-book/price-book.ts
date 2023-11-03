import BigNumber from 'bignumber.js'

import { Price } from './price'

export interface PriceBook {
  strategy: 'arithmetic' | 'geometric'
  indexToPrice(priceIndex: number): Price
  priceToIndex(price: BigNumber.Value, roundingUp: boolean): Price
}

export const MAX_PRICE_INDEX = 2 ** 16 - 1
export const MIN_PRICE_INDEX = 0
