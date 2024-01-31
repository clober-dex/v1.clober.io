import { createPublicClient, http } from 'viem'
import { arbitrum } from 'viem/chains'

import { GeometricPriceBook__factory } from '../typechain'
import { GeometricPriceBook } from '../model/price-book/geometric-price-book'
import { GEOMETRIC_PRICE_BOOK_ABI } from '../abis/core/geometric-price-book-abi'

describe('GeometricPriceBook', () => {
  const GEOMETRIC_PRICE_BOOK_ADDRESS =
    '0x8272Ef52C3792D08B2dB81EEb975cDf1E53a148B'
  const publicClient = createPublicClient({
    chain: arbitrum,
    transport: http('https://rpc.ankr.com/arbitrum'),
  })
  const randomPriceIndices = Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 2 ** 10),
  )
  const geometricPriceBook = new GeometricPriceBook(
    10000000000000n,
    1010000000000000000n,
  )

  it('index to price', async () => {
    const actualPrices = (
      (await publicClient.multicall({
        contracts: randomPriceIndices.map((priceIndex) => ({
          address: GEOMETRIC_PRICE_BOOK_ADDRESS,
          abi: GEOMETRIC_PRICE_BOOK_ABI,
          functionName: 'indexToPrice',
          args: [priceIndex],
        })),
      })) as { result: bigint }[]
    ).map(({ result }) => result)
    const expectedPrices = randomPriceIndices.map(
      (priceIndex) => geometricPriceBook.indexToPrice(priceIndex).value,
    )
    expect(expectedPrices).toEqual(actualPrices)
  })

  it('price to index', async () => {
    const actualPrices = (
      (await publicClient.multicall({
        contracts: randomPriceIndices.map((priceIndex) => ({
          address: GEOMETRIC_PRICE_BOOK_ADDRESS,
          abi: GEOMETRIC_PRICE_BOOK_ABI,
          functionName: 'indexToPrice',
          args: [priceIndex],
        })),
      })) as { result: bigint }[]
    ).map(({ result }) => result)
    const expectedPriceIndices = actualPrices.map(
      (price) => geometricPriceBook.priceToIndex(price, false).index,
    )
    expect(expectedPriceIndices).toEqual(randomPriceIndices)
  })

  it('maxPriceIndex & priceUpperBound', async () => {
    const maxPriceIndex = await publicClient.readContract({
      address: GEOMETRIC_PRICE_BOOK_ADDRESS,
      abi: GEOMETRIC_PRICE_BOOK_ABI,
      functionName: 'maxPriceIndex',
    })
    const priceUpperBound = await publicClient.readContract({
      address: GEOMETRIC_PRICE_BOOK_ADDRESS,
      abi: GEOMETRIC_PRICE_BOOK_ABI,
      functionName: 'priceUpperBound',
    })
    expect(geometricPriceBook.maxPriceIndex).toEqual(BigInt(maxPriceIndex))
    expect(geometricPriceBook.priceUpperBound).toEqual(priceUpperBound)
  })

  it('maxPriceIndex to price', async () => {
    const maxPriceIndex = await publicClient.readContract({
      address: GEOMETRIC_PRICE_BOOK_ADDRESS,
      abi: GEOMETRIC_PRICE_BOOK_ABI,
      functionName: 'maxPriceIndex',
    })
    const actualPrice = await publicClient.readContract({
      address: GEOMETRIC_PRICE_BOOK_ADDRESS,
      abi: GEOMETRIC_PRICE_BOOK_ABI,
      functionName: 'indexToPrice',
      args: [maxPriceIndex],
    })
    const expectedPrice = geometricPriceBook.indexToPrice(maxPriceIndex).value
    expect(expectedPrice).toEqual(actualPrice)
  })

  it('priceUpperBound to index', async () => {
    const priceUpperBound = await publicClient.readContract({
      address: GEOMETRIC_PRICE_BOOK_ADDRESS,
      abi: GEOMETRIC_PRICE_BOOK_ABI,
      functionName: 'priceUpperBound',
    })
    const [actualPriceIndex, actualPrice] = await publicClient.readContract({
      address: GEOMETRIC_PRICE_BOOK_ADDRESS,
      abi: GEOMETRIC_PRICE_BOOK_ABI,
      functionName: 'priceToIndex',
      args: [priceUpperBound - 1n, false],
    })
    const { index: expectedPriceIndex, value: expectedPrice } =
      geometricPriceBook.priceToIndex(priceUpperBound - 1n, false)
    expect(expectedPrice).toEqual(actualPrice)
    expect(expectedPriceIndex).toEqual(actualPriceIndex)
  })
})
