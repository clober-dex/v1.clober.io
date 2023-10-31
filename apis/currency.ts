import { polygonZkEvm } from 'wagmi/chains'
import { getAddress } from 'viem'

import { Currency } from '../model/currency'
import { Chain } from '../model/chain'

import { fetchCloberApi, fetchOdosApi } from './utils'

export async function fetchCurrencies(chain: Chain): Promise<Currency[]> {
  if (chain.id === polygonZkEvm.id) {
    // todo: remove this
    return (
      await fetchCloberApi<{
        result: Currency[]
      }>('tokens')
    ).result.map((currency) => ({
      address: getAddress(currency.address),
      name: currency.name,
      symbol: currency.symbol,
      decimals: currency.decimals,
    }))
  }
  return Object.entries(
    (
      await fetchOdosApi<{
        tokenMap: Currency[]
      }>(`info/tokens/${chain.id}`)
    ).tokenMap,
  ).map(([address, currency]) => ({
    address: getAddress(address),
    name: currency.name,
    symbol: currency.symbol,
    decimals: currency.decimals,
  }))
}
