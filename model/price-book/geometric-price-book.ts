import JSBI from 'jsbi'

import { PriceBook } from './price-book'
import { CloberPrice } from './cloberPrice'

export class GeometricPriceBook implements PriceBook {
  private readonly MAX_UINT256 = JSBI.subtract(
    JSBI.exponentiate(JSBI.BigInt(2), JSBI.BigInt(256)),
    JSBI.BigInt(1),
  )

  public readonly _a: JSBI
  private readonly _r0: JSBI
  private readonly _r1: JSBI
  private readonly _r2: JSBI
  private readonly _r3: JSBI
  private readonly _r4: JSBI
  private readonly _r5: JSBI
  private readonly _r6: JSBI
  private readonly _r7: JSBI
  private readonly _r8: JSBI
  private readonly _r9: JSBI
  private readonly _r10: JSBI
  private readonly _r11: JSBI
  private readonly _r12: JSBI
  private readonly _r13: JSBI
  private readonly _r14: JSBI
  private readonly _r15: JSBI
  private readonly _r16: JSBI

  private readonly maxPriceIndex: JSBI
  private readonly priceUpperBound: JSBI

  constructor(a_: string, r_: string | null) {
    if (!r_) {
      throw `GeometricPriceBook: 'r' is missing`
    }
    const castedR = JSBI.BigInt(r_)
    this._a = JSBI.BigInt(a_)

    //_r0 = (castedR << 64) / 10**18
    this._r0 = JSBI.divide(
      JSBI.leftShift(castedR, JSBI.BigInt(64)),
      JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18)),
    )

    // when `r_` <= 1
    if (
      JSBI.lessThanOrEqual(
        JSBI.signedRightShift(
          JSBI.multiply(this._a, this._r0),
          JSBI.BigInt(64),
        ),
        this._a,
      )
    ) {
      throw `GeometricPriceBook: 'r' is invalid`
    }

    let maxIndex_ = JSBI.BigInt(0)
    let maxPrice_ = JSBI.leftShift(JSBI.BigInt(1), JSBI.BigInt(64))

    let r = JSBI.BigInt(0)

    if (JSBI.lessThan(this._r0, JSBI.divide(this.MAX_UINT256, this._r0))) {
      r = JSBI.signedRightShift(
        JSBI.multiply(this._r0, this._r0),
        JSBI.BigInt(64),
      )
      maxIndex_ = JSBI.bitwiseOr(maxIndex_, JSBI.BigInt('0x1'))
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r1 = r

    if (JSBI.lessThan(this._r1, JSBI.divide(this.MAX_UINT256, this._r1))) {
      r = JSBI.signedRightShift(
        JSBI.multiply(this._r1, this._r1),
        JSBI.BigInt(64),
      )
      maxIndex_ = JSBI.bitwiseOr(maxIndex_, JSBI.BigInt('0x2'))
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r2 = r

    if (JSBI.lessThan(this._r2, JSBI.divide(this.MAX_UINT256, this._r2))) {
      r = JSBI.signedRightShift(
        JSBI.multiply(this._r2, this._r2),
        JSBI.BigInt(64),
      )
      maxIndex_ = JSBI.bitwiseOr(maxIndex_, JSBI.BigInt('0x4'))
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r3 = r

    if (JSBI.lessThan(this._r3, JSBI.divide(this.MAX_UINT256, this._r3))) {
      r = JSBI.signedRightShift(
        JSBI.multiply(this._r3, this._r3),
        JSBI.BigInt(64),
      )
      maxIndex_ = JSBI.bitwiseOr(maxIndex_, JSBI.BigInt('0x8'))
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r4 = r

    if (JSBI.lessThan(this._r4, JSBI.divide(this.MAX_UINT256, this._r4))) {
      r = JSBI.signedRightShift(
        JSBI.multiply(this._r4, this._r4),
        JSBI.BigInt(64),
      )
      maxIndex_ = JSBI.bitwiseOr(maxIndex_, JSBI.BigInt('0x10'))
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r5 = r

    if (JSBI.lessThan(this._r5, JSBI.divide(this.MAX_UINT256, this._r5))) {
      r = JSBI.signedRightShift(
        JSBI.multiply(this._r5, this._r5),
        JSBI.BigInt(64),
      )
      maxIndex_ = JSBI.bitwiseOr(maxIndex_, JSBI.BigInt('0x20'))
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r6 = r

    if (JSBI.lessThan(this._r6, JSBI.divide(this.MAX_UINT256, this._r6))) {
      r = JSBI.signedRightShift(
        JSBI.multiply(this._r6, this._r6),
        JSBI.BigInt(64),
      )
      maxIndex_ = JSBI.bitwiseOr(maxIndex_, JSBI.BigInt('0x40'))
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r7 = r

    if (JSBI.lessThan(this._r7, JSBI.divide(this.MAX_UINT256, this._r7))) {
      r = JSBI.signedRightShift(
        JSBI.multiply(this._r7, this._r7),
        JSBI.BigInt(64),
      )
      maxIndex_ = JSBI.bitwiseOr(maxIndex_, JSBI.BigInt('0x80'))
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r8 = r

    if (JSBI.lessThan(this._r8, JSBI.divide(this.MAX_UINT256, this._r8))) {
      r = JSBI.signedRightShift(
        JSBI.multiply(this._r8, this._r8),
        JSBI.BigInt(64),
      )
      maxIndex_ = JSBI.bitwiseOr(maxIndex_, JSBI.BigInt('0x100'))
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r9 = r

    if (JSBI.lessThan(this._r9, JSBI.divide(this.MAX_UINT256, this._r9))) {
      r = JSBI.signedRightShift(
        JSBI.multiply(this._r9, this._r9),
        JSBI.BigInt(64),
      )
      maxIndex_ = JSBI.bitwiseOr(maxIndex_, JSBI.BigInt('0x200'))
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r10 = r

    if (JSBI.lessThan(this._r10, JSBI.divide(this.MAX_UINT256, this._r10))) {
      r = JSBI.signedRightShift(
        JSBI.multiply(this._r10, this._r10),
        JSBI.BigInt(64),
      )
      maxIndex_ = JSBI.bitwiseOr(maxIndex_, JSBI.BigInt('0x400'))
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r11 = r

    if (JSBI.lessThan(this._r11, JSBI.divide(this.MAX_UINT256, this._r11))) {
      r = JSBI.signedRightShift(
        JSBI.multiply(this._r11, this._r11),
        JSBI.BigInt(64),
      )
      maxIndex_ = JSBI.bitwiseOr(maxIndex_, JSBI.BigInt('0x800'))
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r12 = r

    if (JSBI.lessThan(this._r12, JSBI.divide(this.MAX_UINT256, this._r12))) {
      r = JSBI.signedRightShift(
        JSBI.multiply(this._r12, this._r12),
        JSBI.BigInt(64),
      )
      maxIndex_ = JSBI.bitwiseOr(maxIndex_, JSBI.BigInt('0x1000'))
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r13 = r

    if (JSBI.lessThan(this._r13, JSBI.divide(this.MAX_UINT256, this._r13))) {
      r = JSBI.signedRightShift(
        JSBI.multiply(this._r13, this._r13),
        JSBI.BigInt(64),
      )
      maxIndex_ = JSBI.bitwiseOr(maxIndex_, JSBI.BigInt('0x2000'))
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r14 = r

    if (JSBI.lessThan(this._r14, JSBI.divide(this.MAX_UINT256, this._r14))) {
      r = JSBI.signedRightShift(
        JSBI.multiply(this._r14, this._r14),
        JSBI.BigInt(64),
      )
      maxIndex_ = JSBI.bitwiseOr(maxIndex_, JSBI.BigInt('0x4000'))
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r15 = r

    if (JSBI.lessThan(this._r15, JSBI.divide(this.MAX_UINT256, this._r15))) {
      r = JSBI.signedRightShift(
        JSBI.multiply(this._r15, this._r15),
        JSBI.BigInt(64),
      )
      maxIndex_ = JSBI.bitwiseOr(maxIndex_, JSBI.BigInt('0x8000'))
      maxPrice_ = r
    } else {
      r = this.MAX_UINT256
    }
    this._r16 = r

    this.maxPriceIndex = maxIndex_
    this.priceUpperBound = JSBI.add(
      JSBI.multiply(JSBI.signedRightShift(maxPrice_, JSBI.BigInt(64)), this._a),
      JSBI.signedRightShift(
        JSBI.multiply(
          JSBI.bitwiseAnd(maxPrice_, JSBI.BigInt('0xffffffffffffffff')),
          this._a,
        ),
        JSBI.BigInt(64),
      ),
    )

    this.indexToPrice = this.indexToPrice.bind(this)
    this.priceToIndex = this.priceToIndex.bind(this)
  }

  public strategy: 'arithmetic' | 'geometric' = 'geometric'

  public indexToPrice(priceIndex: number): CloberPrice {
    if (JSBI.greaterThan(JSBI.BigInt(priceIndex), this.maxPriceIndex)) {
      throw `GeometricPriceBook: 'priceIndex' is invalid`
    }
    let price = this._a

    if (
      JSBI.notEqual(
        JSBI.bitwiseAnd(
          JSBI.BigInt(priceIndex),
          JSBI.bitwiseAnd(this.maxPriceIndex, JSBI.BigInt('0x8000')),
        ),
        JSBI.BigInt(0),
      )
    ) {
      price = this.mulShift(price, this._r15)
    }

    if (
      JSBI.notEqual(
        JSBI.bitwiseAnd(
          JSBI.BigInt(priceIndex),
          JSBI.bitwiseAnd(this.maxPriceIndex, JSBI.BigInt('0x4000')),
        ),
        JSBI.BigInt(0),
      )
    ) {
      price = this.mulShift(price, this._r14)
    }

    if (
      JSBI.notEqual(
        JSBI.bitwiseAnd(
          JSBI.BigInt(priceIndex),
          JSBI.bitwiseAnd(this.maxPriceIndex, JSBI.BigInt('0x2000')),
        ),
        JSBI.BigInt(0),
      )
    ) {
      price = this.mulShift(price, this._r13)
    }

    if (
      JSBI.notEqual(
        JSBI.bitwiseAnd(
          JSBI.BigInt(priceIndex),
          JSBI.bitwiseAnd(this.maxPriceIndex, JSBI.BigInt('0x1000')),
        ),
        JSBI.BigInt(0),
      )
    ) {
      price = this.mulShift(price, this._r12)
    }

    if (
      JSBI.notEqual(
        JSBI.bitwiseAnd(
          JSBI.BigInt(priceIndex),
          JSBI.bitwiseAnd(this.maxPriceIndex, JSBI.BigInt('0x800')),
        ),
        JSBI.BigInt(0),
      )
    ) {
      price = this.mulShift(price, this._r11)
    }

    if (
      JSBI.notEqual(
        JSBI.bitwiseAnd(
          JSBI.BigInt(priceIndex),
          JSBI.bitwiseAnd(this.maxPriceIndex, JSBI.BigInt('0x400')),
        ),
        JSBI.BigInt(0),
      )
    ) {
      price = this.mulShift(price, this._r10)
    }

    if (
      JSBI.notEqual(
        JSBI.bitwiseAnd(
          JSBI.BigInt(priceIndex),
          JSBI.bitwiseAnd(this.maxPriceIndex, JSBI.BigInt('0x200')),
        ),
        JSBI.BigInt(0),
      )
    ) {
      price = this.mulShift(price, this._r9)
    }

    if (
      JSBI.notEqual(
        JSBI.bitwiseAnd(
          JSBI.BigInt(priceIndex),
          JSBI.bitwiseAnd(this.maxPriceIndex, JSBI.BigInt('0x100')),
        ),
        JSBI.BigInt(0),
      )
    ) {
      price = this.mulShift(price, this._r8)
    }

    if (
      JSBI.notEqual(
        JSBI.bitwiseAnd(
          JSBI.BigInt(priceIndex),
          JSBI.bitwiseAnd(this.maxPriceIndex, JSBI.BigInt('0x80')),
        ),
        JSBI.BigInt(0),
      )
    ) {
      price = this.mulShift(price, this._r7)
    }

    if (
      JSBI.notEqual(
        JSBI.bitwiseAnd(
          JSBI.BigInt(priceIndex),
          JSBI.bitwiseAnd(this.maxPriceIndex, JSBI.BigInt('0x40')),
        ),
        JSBI.BigInt(0),
      )
    ) {
      price = this.mulShift(price, this._r6)
    }

    if (
      JSBI.notEqual(
        JSBI.bitwiseAnd(
          JSBI.BigInt(priceIndex),
          JSBI.bitwiseAnd(this.maxPriceIndex, JSBI.BigInt('0x20')),
        ),
        JSBI.BigInt(0),
      )
    ) {
      price = this.mulShift(price, this._r5)
    }

    if (
      JSBI.notEqual(
        JSBI.bitwiseAnd(
          JSBI.BigInt(priceIndex),
          JSBI.bitwiseAnd(this.maxPriceIndex, JSBI.BigInt('0x10')),
        ),
        JSBI.BigInt(0),
      )
    ) {
      price = this.mulShift(price, this._r4)
    }

    if (
      JSBI.notEqual(
        JSBI.bitwiseAnd(
          JSBI.BigInt(priceIndex),
          JSBI.bitwiseAnd(this.maxPriceIndex, JSBI.BigInt('0x8')),
        ),
        JSBI.BigInt(0),
      )
    ) {
      price = this.mulShift(price, this._r3)
    }

    if (
      JSBI.notEqual(
        JSBI.bitwiseAnd(
          JSBI.BigInt(priceIndex),
          JSBI.bitwiseAnd(this.maxPriceIndex, JSBI.BigInt('0x4')),
        ),
        JSBI.BigInt(0),
      )
    ) {
      price = this.mulShift(price, this._r2)
    }

    if (
      JSBI.notEqual(
        JSBI.bitwiseAnd(
          JSBI.BigInt(priceIndex),
          JSBI.bitwiseAnd(this.maxPriceIndex, JSBI.BigInt('0x2')),
        ),
        JSBI.BigInt(0),
      )
    ) {
      price = this.mulShift(price, this._r1)
    }

    if (
      JSBI.notEqual(
        JSBI.bitwiseAnd(
          JSBI.BigInt(priceIndex),
          JSBI.bitwiseAnd(this.maxPriceIndex, JSBI.BigInt('0x1')),
        ),
        JSBI.BigInt(0),
      )
    ) {
      price = this.mulShift(price, this._r0)
    }

    return {
      index: priceIndex,
      value: BigInt(price.toString()),
    }
  }

  public priceToIndex(price: bigint, roundingUp: boolean): CloberPrice {
    if (
      JSBI.lessThan(JSBI.BigInt(price.toString()), this._a) ||
      JSBI.greaterThanOrEqual(
        JSBI.BigInt(price.toString()),
        this.priceUpperBound,
      )
    ) {
      throw `GeometricPriceBook: 'price' is invalid`
    }
    let index = 0
    let _correctedPrice = this._a
    const shiftedPrice = JSBI.leftShift(
      JSBI.add(JSBI.BigInt(price.toString()), JSBI.BigInt(1)),
      JSBI.BigInt(64),
    )

    if (
      JSBI.greaterThan(this.maxPriceIndex, JSBI.BigInt('0x8000')) &&
      JSBI.greaterThan(shiftedPrice, JSBI.multiply(this._r15, _correctedPrice))
    ) {
      index |= 0x8000
      _correctedPrice = this.mulShift(_correctedPrice, this._r15)
    }
    if (
      JSBI.greaterThan(this.maxPriceIndex, JSBI.BigInt('0x4000')) &&
      JSBI.greaterThan(shiftedPrice, JSBI.multiply(this._r14, _correctedPrice))
    ) {
      index |= 0x4000
      _correctedPrice = this.mulShift(_correctedPrice, this._r14)
    }
    if (
      JSBI.greaterThan(this.maxPriceIndex, JSBI.BigInt('0x2000')) &&
      JSBI.greaterThan(shiftedPrice, JSBI.multiply(this._r13, _correctedPrice))
    ) {
      index |= 0x2000
      _correctedPrice = this.mulShift(_correctedPrice, this._r13)
    }
    if (
      JSBI.greaterThan(this.maxPriceIndex, JSBI.BigInt('0x1000')) &&
      JSBI.greaterThan(shiftedPrice, JSBI.multiply(this._r12, _correctedPrice))
    ) {
      index |= 0x1000
      _correctedPrice = this.mulShift(_correctedPrice, this._r12)
    }
    if (
      JSBI.greaterThan(this.maxPriceIndex, JSBI.BigInt('0x0800')) &&
      JSBI.greaterThan(shiftedPrice, JSBI.multiply(this._r11, _correctedPrice))
    ) {
      index |= 0x0800
      _correctedPrice = this.mulShift(_correctedPrice, this._r11)
    }
    if (
      JSBI.greaterThan(this.maxPriceIndex, JSBI.BigInt('0x0400')) &&
      JSBI.greaterThan(shiftedPrice, JSBI.multiply(this._r10, _correctedPrice))
    ) {
      index |= 0x0400
      _correctedPrice = this.mulShift(_correctedPrice, this._r10)
    }
    if (
      JSBI.greaterThan(this.maxPriceIndex, JSBI.BigInt('0x0200')) &&
      JSBI.greaterThan(shiftedPrice, JSBI.multiply(this._r9, _correctedPrice))
    ) {
      index |= 0x0200
      _correctedPrice = this.mulShift(_correctedPrice, this._r9)
    }
    if (
      JSBI.greaterThan(this.maxPriceIndex, JSBI.BigInt('0x0100')) &&
      JSBI.greaterThan(shiftedPrice, JSBI.multiply(this._r8, _correctedPrice))
    ) {
      index |= 0x0100
      _correctedPrice = this.mulShift(_correctedPrice, this._r8)
    }
    if (
      JSBI.greaterThan(this.maxPriceIndex, JSBI.BigInt('0x0080')) &&
      JSBI.greaterThan(shiftedPrice, JSBI.multiply(this._r7, _correctedPrice))
    ) {
      index |= 0x0080
      _correctedPrice = this.mulShift(_correctedPrice, this._r7)
    }
    if (
      JSBI.greaterThan(this.maxPriceIndex, JSBI.BigInt('0x0040')) &&
      JSBI.greaterThan(shiftedPrice, JSBI.multiply(this._r6, _correctedPrice))
    ) {
      index |= 0x0040
      _correctedPrice = this.mulShift(_correctedPrice, this._r6)
    }
    if (
      JSBI.greaterThan(this.maxPriceIndex, JSBI.BigInt('0x0020')) &&
      JSBI.greaterThan(shiftedPrice, JSBI.multiply(this._r5, _correctedPrice))
    ) {
      index |= 0x0020
      _correctedPrice = this.mulShift(_correctedPrice, this._r5)
    }
    if (
      JSBI.greaterThan(this.maxPriceIndex, JSBI.BigInt('0x0010')) &&
      JSBI.greaterThan(shiftedPrice, JSBI.multiply(this._r4, _correctedPrice))
    ) {
      index |= 0x0010
      _correctedPrice = this.mulShift(_correctedPrice, this._r4)
    }
    if (
      JSBI.greaterThan(this.maxPriceIndex, JSBI.BigInt('0x0008')) &&
      JSBI.greaterThan(shiftedPrice, JSBI.multiply(this._r3, _correctedPrice))
    ) {
      index |= 0x0008
      _correctedPrice = this.mulShift(_correctedPrice, this._r3)
    }
    if (
      JSBI.greaterThan(this.maxPriceIndex, JSBI.BigInt('0x0004')) &&
      JSBI.greaterThan(shiftedPrice, JSBI.multiply(this._r2, _correctedPrice))
    ) {
      index |= 0x0004
      _correctedPrice = this.mulShift(_correctedPrice, this._r2)
    }
    if (
      JSBI.greaterThan(this.maxPriceIndex, JSBI.BigInt('0x0002')) &&
      JSBI.greaterThan(shiftedPrice, JSBI.multiply(this._r1, _correctedPrice))
    ) {
      index |= 0x0002
      _correctedPrice = this.mulShift(_correctedPrice, this._r1)
    }
    if (
      JSBI.greaterThan(shiftedPrice, JSBI.multiply(this._r0, _correctedPrice))
    ) {
      index |= 0x0001
      _correctedPrice = this.mulShift(_correctedPrice, this._r0)
    }

    if (
      roundingUp &&
      JSBI.lessThan(_correctedPrice, JSBI.BigInt(price.toString()))
    ) {
      if (JSBI.greaterThanOrEqual(JSBI.BigInt(index), this.maxPriceIndex)) {
        throw `GeometricPriceBook: 'price' is invalid`
      }
      index += 1
      return { index, value: this.indexToPrice(index).value }
    } else {
      return { index, value: BigInt(_correctedPrice.toString()) }
    }
  }

  private mulShift(val: JSBI, mulBy: JSBI, shift = 64): JSBI {
    return JSBI.signedRightShift(JSBI.multiply(val, mulBy), JSBI.BigInt(shift))
  }
}
