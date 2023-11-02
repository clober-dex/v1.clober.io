import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

import { ArithmeticPriceBook__factory } from '../typechain'
import { ArithmeticPriceBook } from '../model/price-book'

describe('ArithmeticPriceBook', () => {
  it('index to price', async () => {
    const publicClient = createPublicClient({
      chain: mainnet,
      transport: http(),
    })

    const randomPriceIndices = Array.from({ length: 1000 }, () =>
      Math.floor(Math.random() * 2 ** 16),
    )

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

    const arithmeticPriceBook = new ArithmeticPriceBook(
      100000000000000n,
      100000000000000n,
    )
    const expectedPrices = randomPriceIndices.map((priceIndex) =>
      arithmeticPriceBook.indexToPrice(BigInt(priceIndex)),
    )
    expect(actualPrices).toEqual(expectedPrices)
  })

  it('price to index', async () => {
    const publicClient = createPublicClient({
      chain: mainnet,
      transport: http(),
    })

    const randomPriceIndices = Array.from({ length: 1000 }, () =>
      Math.floor(Math.random() * 2 ** 16),
    )

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

    const arithmeticPriceBook = new ArithmeticPriceBook(
      100000000000000n,
      100000000000000n,
    )
    const expectedPriceIndices = actualPrices.map((price) =>
      arithmeticPriceBook.priceToIndex(price, false),
    )
    expect(randomPriceIndices.map((x) => Number(x))).toEqual(
      expectedPriceIndices.map((x) => Number(x)),
    )
  })
})
