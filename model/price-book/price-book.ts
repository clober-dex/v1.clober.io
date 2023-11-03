import { CloberPrice } from './cloberPrice'

export interface PriceBook {
  strategy: 'arithmetic' | 'geometric'
  indexToPrice(priceIndex: number): CloberPrice
  priceToIndex(price: bigint, roundingUp: boolean): CloberPrice
}
