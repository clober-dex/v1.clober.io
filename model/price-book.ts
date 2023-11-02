interface PriceBook {
  strategy: 'arithmetic' | 'geometric'
  indexToPrice(priceIndex: bigint): bigint
  priceToIndex(price: bigint, roundingUp: boolean): bigint
}

export class ArithmeticPriceBook implements PriceBook {
  public readonly a: bigint
  public readonly d: bigint
  constructor(a: bigint, d: bigint | null) {
    if (!d) {
      throw `ArithmeticPriceBook: 'd' is missing`
    }
    this.a = a
    this.d = d
    this.indexToPrice = this.indexToPrice.bind(this)
    this.priceToIndex = this.priceToIndex.bind(this)
  }

  public strategy: 'arithmetic' | 'geometric' = 'arithmetic'

  public indexToPrice(priceIndex: bigint): bigint {
    return this.a + this.d * priceIndex
  }

  public priceToIndex(price: bigint, roundingUp: boolean): bigint {
    const index = (price - this.a) / this.d
    return roundingUp && (price - this.a) % this.d > 0n ? index + 1n : index
  }
}
