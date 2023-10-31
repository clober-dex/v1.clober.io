import { getAddress } from 'viem'
import { polygonZkEvm } from 'wagmi/chains'

import { Prices } from '../model/prices'
import { Chain } from '../model/chain'

import { fetchCloberApi, fetchOdosApi } from './utils'

export async function fetchPrices(chain: Chain): Promise<Prices> {
  if (chain.id === polygonZkEvm.id) {
    // todo: remove this
    return (
      await fetchCloberApi<{
        result: {
          address: string
          price: number
        }[]
      }>('tokens')
    ).result.reduce((acc, { address, price }) => {
      acc[getAddress(address)] = price
      return acc
    }, {} as Prices)
  }
  return Object.entries(
    (
      await fetchOdosApi<{
        tokenPrices: Prices
      }>(`pricing/token/${chain.id}`)
    ).tokenPrices,
  ).reduce((acc, [address, price]) => {
    acc[getAddress(address)] = price
    return acc
  }, {} as Prices)
}
