import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

import { ArithmeticPriceBook__factory } from '../typechain'
import { ArithmeticPriceBook } from '../model/price-book/arithmetic-price-book'

describe('ArithmeticPriceBook', () => {
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http('https://rpc.ankr.com/eth'),
  })
  const randomPriceIndices = Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 2 ** 16),
  )
  const arithmeticPriceBook = new ArithmeticPriceBook(
    100000000000000n,
    100000000000000n,
  )

  it('index to price', async () => {
    const actualPrices = (
      (await publicClient.multicall({
        contracts: randomPriceIndices.map((priceIndex) => ({
          address: '0x1c230Df6364af81d1585C3B3e6aC5aaD2daD9bD9',
          abi: ArithmeticPriceBook__factory.abi,
          functionName: 'indexToPrice',
          args: [priceIndex],
        })),
      })) as { result: bigint }[]
    ).map(({ result }) => result)
    const expectedPrices = randomPriceIndices.map(
      (priceIndex) => arithmeticPriceBook.indexToPrice(priceIndex).value,
    )
    expect(expectedPrices).toEqual(actualPrices)
  })

  it('price to index', async () => {
    const actualPrices = (
      (await publicClient.multicall({
        contracts: randomPriceIndices.map((priceIndex) => ({
          address: '0x1c230Df6364af81d1585C3B3e6aC5aaD2daD9bD9',
          abi: ArithmeticPriceBook__factory.abi,
          functionName: 'indexToPrice',
          args: [priceIndex],
        })),
      })) as { result: bigint }[]
    ).map(({ result }) => result)
    const expectedPriceIndices = actualPrices.map(
      (price) => arithmeticPriceBook.priceToIndex(price, false).index,
    )
    expect(expectedPriceIndices).toEqual(randomPriceIndices)
  })
})
