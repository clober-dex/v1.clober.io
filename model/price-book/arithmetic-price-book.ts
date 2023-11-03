import JSBI from 'jsbi'
import BigNumber from 'bignumber.js'

import { PriceBook } from './price-book'
import { Price } from './price'

export class ArithmeticPriceBook implements PriceBook {
  public readonly a: JSBI
  public readonly d: JSBI

  constructor(a: string, d: string | null) {
    if (!d) {
      throw `ArithmeticPriceBook: 'd' is missing`
    }
    this.a = JSBI.BigInt(a)
    this.d = JSBI.BigInt(d)
    this.indexToPrice = this.indexToPrice.bind(this)
    this.priceToIndex = this.priceToIndex.bind(this)
  }

  public strategy: 'arithmetic' | 'geometric' = 'arithmetic'

  public indexToPrice(priceIndex: number): Price {
    return {
      index: priceIndex,
      value: new BigNumber(
        JSBI.add(
          this.a,
          JSBI.multiply(this.d, JSBI.BigInt(priceIndex)),
        ).toString(),
      ),
    }
  }

  public priceToIndex(price: BigNumber.Value, roundingUp: boolean): Price {
    const priceBigInt = JSBI.BigInt(price)
    const indexBigInt = JSBI.divide(JSBI.subtract(priceBigInt, this.a), this.d)
    let index = parseInt(indexBigInt.toString(), 10)

    if (
      roundingUp &&
      JSBI.greaterThan(
        JSBI.remainder(JSBI.subtract(priceBigInt, this.a), this.d),
        JSBI.BigInt(0),
      )
    ) {
      index++
    }
    return { index, value: this.indexToPrice(index).value }
  }
}
