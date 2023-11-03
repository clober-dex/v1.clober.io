import { PriceBook } from './price-book'
import { CloberPrice } from './cloberPrice'

export class GeometricPriceBook implements PriceBook {
  private readonly MAX_UINT256 = 2n ** 256n - 1n

  public readonly _a: bigint
  private readonly _r0: bigint
  private readonly _r1: bigint
  private readonly _r2: bigint
  private readonly _r3: bigint
  private readonly _r4: bigint
  private readonly _r5: bigint
  private readonly _r6: bigint
  private readonly _r7: bigint
  private readonly _r8: bigint
  private readonly _r9: bigint
  private readonly _r10: bigint
  private readonly _r11: bigint
  private readonly _r12: bigint
  private readonly _r13: bigint
  private readonly _r14: bigint
  private readonly _r15: bigint
  private readonly _r16: bigint

  public readonly maxPriceIndex: bigint
  public readonly priceUpperBound: bigint

  constructor(a_: bigint, r_: bigint | null) {
    if (!r_) {
      throw `GeometricPriceBook: 'r' is missing`
    }
    this._a = a_
    this._r0 = (r_ << 64n) / 10n ** 18n
    if ((this._a * this._r0) >> 64n <= this._a) {
      throw `GeometricPriceBook: 'r' is invalid`
    }

    let maxIndex_ = 0n
    let maxPrice_ = 1n << 64n

    let r = 0n

    if (this._r0 < this.MAX_UINT256 / this._r0) {
      r = (this._r0 * this._r0) >> 64n
      maxIndex_ = maxIndex_ | 0x1n
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r1 = r

    if (this._r1 < this.MAX_UINT256 / this._r1) {
      r = (this._r1 * this._r1) >> 64n
      maxIndex_ = maxIndex_ | 0x2n
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r2 = r

    if (this._r2 < this.MAX_UINT256 / this._r2) {
      r = (this._r2 * this._r2) >> 64n
      maxIndex_ = maxIndex_ | 0x4n
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r3 = r

    if (this._r3 < this.MAX_UINT256 / this._r3) {
      r = (this._r3 * this._r3) >> 64n
      maxIndex_ = maxIndex_ | 0x8n
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r4 = r

    if (this._r4 < this.MAX_UINT256 / this._r4) {
      r = (this._r4 * this._r4) >> 64n
      maxIndex_ = maxIndex_ | 0x10n
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r5 = r

    if (this._r5 < this.MAX_UINT256 / this._r5) {
      r = (this._r5 * this._r5) >> 64n
      maxIndex_ = maxIndex_ | 0x20n
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r6 = r

    if (this._r6 < this.MAX_UINT256 / this._r6) {
      r = (this._r6 * this._r6) >> 64n
      maxIndex_ = maxIndex_ | 0x40n
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r7 = r

    if (this._r7 < this.MAX_UINT256 / this._r7) {
      r = (this._r7 * this._r7) >> 64n
      maxIndex_ = maxIndex_ | 0x80n
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r8 = r

    if (this._r8 < this.MAX_UINT256 / this._r8) {
      r = (this._r8 * this._r8) >> 64n
      maxIndex_ = maxIndex_ | 0x100n
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r9 = r

    if (this._r9 < this.MAX_UINT256 / this._r9) {
      r = (this._r9 * this._r9) >> 64n
      maxIndex_ = maxIndex_ | 0x200n
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r10 = r

    if (this._r10 < this.MAX_UINT256 / this._r10) {
      r = (this._r10 * this._r10) >> 64n
      maxIndex_ = maxIndex_ | 0x400n
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r11 = r

    if (this._r11 < this.MAX_UINT256 / this._r11) {
      r = (this._r11 * this._r11) >> 64n
      maxIndex_ = maxIndex_ | 0x800n
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r12 = r

    if (this._r12 < this.MAX_UINT256 / this._r12) {
      r = (this._r12 * this._r12) >> 64n
      maxIndex_ = maxIndex_ | 0x1000n
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r13 = r

    if (this._r13 < this.MAX_UINT256 / this._r13) {
      r = (this._r13 * this._r13) >> 64n
      maxIndex_ = maxIndex_ | 0x2000n
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r14 = r

    if (this._r14 < this.MAX_UINT256 / this._r14) {
      r = (this._r14 * this._r14) >> 64n
      maxIndex_ = maxIndex_ | 0x4000n
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r15 = r

    if (this._r15 < this.MAX_UINT256 / this._r15) {
      r = (this._r15 * this._r15) >> 64n
      maxIndex_ = maxIndex_ | 0x8000n
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r16 = r

    this.maxPriceIndex = maxIndex_
    this.priceUpperBound =
      (maxPrice_ >> 64n) * a_ +
      (((maxPrice_ & BigInt('0xffffffffffffffff')) * a_) >> 64n)

    this.indexToPrice = this.indexToPrice.bind(this)
    this.priceToIndex = this.priceToIndex.bind(this)
  }

  public strategy: 'arithmetic' | 'geometric' = 'geometric'

  public indexToPrice(priceIndex: number): CloberPrice {
    const priceIndexBigInt = BigInt(priceIndex)

    if (priceIndexBigInt > this.maxPriceIndex) {
      throw `GeometricPriceBook: 'priceIndex' is invalid`
    }
    let price = this._a

    if ((priceIndexBigInt & (this.maxPriceIndex & BigInt('0x8000'))) != 0n) {
      price = (price * this._r15) >> 64n
    }
    if ((priceIndexBigInt & (this.maxPriceIndex & BigInt('0x4000'))) != 0n) {
      price = (price * this._r14) >> 64n
    }
    if ((priceIndexBigInt & (this.maxPriceIndex & BigInt('0x2000'))) != 0n) {
      price = (price * this._r13) >> 64n
    }
    if ((priceIndexBigInt & (this.maxPriceIndex & BigInt('0x1000'))) != 0n) {
      price = (price * this._r12) >> 64n
    }
    if ((priceIndexBigInt & (this.maxPriceIndex & BigInt('0x800'))) != 0n) {
      price = (price * this._r11) >> 64n
    }
    if ((priceIndexBigInt & (this.maxPriceIndex & BigInt('0x400'))) != 0n) {
      price = (price * this._r10) >> 64n
    }
    if ((priceIndexBigInt & (this.maxPriceIndex & BigInt('0x200'))) != 0n) {
      price = (price * this._r9) >> 64n
    }
    if ((priceIndexBigInt & (this.maxPriceIndex & BigInt('0x100'))) != 0n) {
      price = (price * this._r8) >> 64n
    }
    if ((priceIndexBigInt & (this.maxPriceIndex & BigInt('0x80'))) != 0n) {
      price = (price * this._r7) >> 64n
    }
    if ((priceIndexBigInt & (this.maxPriceIndex & BigInt('0x40'))) != 0n) {
      price = (price * this._r6) >> 64n
    }
    if ((priceIndexBigInt & (this.maxPriceIndex & BigInt('0x20'))) != 0n) {
      price = (price * this._r5) >> 64n
    }
    if ((priceIndexBigInt & (this.maxPriceIndex & BigInt('0x10'))) != 0n) {
      price = (price * this._r4) >> 64n
    }
    if ((priceIndexBigInt & (this.maxPriceIndex & BigInt('0x8'))) != 0n) {
      price = (price * this._r3) >> 64n
    }
    if ((priceIndexBigInt & (this.maxPriceIndex & BigInt('0x4'))) != 0n) {
      price = (price * this._r2) >> 64n
    }
    if ((priceIndexBigInt & (this.maxPriceIndex & BigInt('0x2'))) != 0n) {
      price = (price * this._r1) >> 64n
    }
    if ((priceIndexBigInt & (this.maxPriceIndex & BigInt('0x1'))) != 0n) {
      price = (price * this._r0) >> 64n
    }

    return {
      index: priceIndex,
      value: price,
    }
  }

  public priceToIndex(price: bigint, roundingUp: boolean): CloberPrice {
    if (price < this._a || price >= this.priceUpperBound) {
      throw `GeometricPriceBook: 'price' is invalid`
    }
    let index = 0
    let _correctedPrice = this._a
    const shiftedPrice = (price + 1n) << 64n

    if (
      this.maxPriceIndex > BigInt('0x8000') &&
      shiftedPrice > this._r15 * _correctedPrice
    ) {
      index = index | 0x8000
      _correctedPrice = (_correctedPrice * this._r15) >> 64n
    }
    if (
      this.maxPriceIndex > BigInt('0x4000') &&
      shiftedPrice > this._r14 * _correctedPrice
    ) {
      index = index | 0x4000
      _correctedPrice = (_correctedPrice * this._r14) >> 64n
    }
    if (
      this.maxPriceIndex > BigInt('0x2000') &&
      shiftedPrice > this._r13 * _correctedPrice
    ) {
      index = index | 0x2000
      _correctedPrice = (_correctedPrice * this._r13) >> 64n
    }
    if (
      this.maxPriceIndex > BigInt('0x1000') &&
      shiftedPrice > this._r12 * _correctedPrice
    ) {
      index = index | 0x1000
      _correctedPrice = (_correctedPrice * this._r12) >> 64n
    }
    if (
      this.maxPriceIndex > BigInt('0x800') &&
      shiftedPrice > this._r11 * _correctedPrice
    ) {
      index = index | 0x0800
      _correctedPrice = (_correctedPrice * this._r11) >> 64n
    }
    if (
      this.maxPriceIndex > BigInt('0x400') &&
      shiftedPrice > this._r10 * _correctedPrice
    ) {
      index = index | 0x0400
      _correctedPrice = (_correctedPrice * this._r10) >> 64n
    }
    if (
      this.maxPriceIndex > BigInt('0x200') &&
      shiftedPrice > this._r9 * _correctedPrice
    ) {
      index = index | 0x0200
      _correctedPrice = (_correctedPrice * this._r9) >> 64n
    }
    if (
      this.maxPriceIndex > BigInt('0x100') &&
      shiftedPrice > this._r8 * _correctedPrice
    ) {
      index = index | 0x0100
      _correctedPrice = (_correctedPrice * this._r8) >> 64n
    }
    if (
      this.maxPriceIndex > BigInt('0x80') &&
      shiftedPrice > this._r7 * _correctedPrice
    ) {
      index = index | 0x0080
      _correctedPrice = (_correctedPrice * this._r7) >> 64n
    }
    if (
      this.maxPriceIndex > BigInt('0x40') &&
      shiftedPrice > this._r6 * _correctedPrice
    ) {
      index = index | 0x0040
      _correctedPrice = (_correctedPrice * this._r6) >> 64n
    }
    if (
      this.maxPriceIndex > BigInt('0x20') &&
      shiftedPrice > this._r5 * _correctedPrice
    ) {
      index = index | 0x0020
      _correctedPrice = (_correctedPrice * this._r5) >> 64n
    }
    if (
      this.maxPriceIndex > BigInt('0x10') &&
      shiftedPrice > this._r4 * _correctedPrice
    ) {
      index = index | 0x0010
      _correctedPrice = (_correctedPrice * this._r4) >> 64n
    }
    if (
      this.maxPriceIndex > BigInt('0x8') &&
      shiftedPrice > this._r3 * _correctedPrice
    ) {
      index = index | 0x0008
      _correctedPrice = (_correctedPrice * this._r3) >> 64n
    }
    if (
      this.maxPriceIndex > BigInt('0x4') &&
      shiftedPrice > this._r2 * _correctedPrice
    ) {
      index = index | 0x0004
      _correctedPrice = (_correctedPrice * this._r2) >> 64n
    }
    if (
      this.maxPriceIndex > BigInt('0x2') &&
      shiftedPrice > this._r1 * _correctedPrice
    ) {
      index = index | 0x0002
      _correctedPrice = (_correctedPrice * this._r1) >> 64n
    }
    if (shiftedPrice > this._r0 * _correctedPrice) {
      index = index | 0x0001
      _correctedPrice = (_correctedPrice * this._r0) >> 64n
    }

    if (roundingUp && _correctedPrice < price) {
      if (index >= this.maxPriceIndex) {
        throw `GeometricPriceBook: 'price' is invalid`
      }
      index += 1
      return { index, value: this.indexToPrice(index).value }
    } else {
      return { index, value: _correctedPrice }
    }
  }
}
