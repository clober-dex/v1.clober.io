import { createPublicClient, http } from 'viem'
import { arbitrum } from 'viem/chains'

import { GeometricPriceBook__factory } from '../typechain'
import { GeometricPriceBook } from '../model/price-book/geometric-price-book'

describe('GeometricPriceBook', () => {
  const publicClient = createPublicClient({
    chain: arbitrum,
    transport: http('https://rpc.ankr.com/arbitrum'),
  })
  const randomPriceIndices = Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 2 ** 10),
  )
  const geometricPriceBook = new GeometricPriceBook(
    '10000000000000',
    '1010000000000000000',
  )

  it('index to price', async () => {
    const actualPrices = (
      (await publicClient.multicall({
        contracts: randomPriceIndices.map((priceIndex) => ({
          address: '0xcA4C669093572c5a23DE04B848a7f706eCBdFAC2',
          abi: GeometricPriceBook__factory.abi,
          functionName: 'indexToPrice',
          args: [priceIndex],
        })),
      })) as { result: bigint }[]
    ).map(({ result }) => result)
    const expectedPrices = randomPriceIndices.map((priceIndex) =>
      BigInt(geometricPriceBook.indexToPrice(priceIndex).value.toFixed()),
    )
    expect(expectedPrices).toEqual(actualPrices)
  })

  it('price to index', async () => {
    const actualPrices = (
      (await publicClient.multicall({
        contracts: randomPriceIndices.map((priceIndex) => ({
          address: '0xcA4C669093572c5a23DE04B848a7f706eCBdFAC2',
          abi: GeometricPriceBook__factory.abi,
          functionName: 'indexToPrice',
          args: [priceIndex],
        })),
      })) as { result: bigint }[]
    ).map(({ result }) => result)
    const expectedPriceIndices = actualPrices.map(
      (price) => geometricPriceBook.priceToIndex(price.toString(), false).index,
    )
    expect(expectedPriceIndices).toEqual(randomPriceIndices)
  })
})
