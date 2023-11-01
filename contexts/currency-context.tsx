import React, { useCallback } from 'react'
import { useAccount, useBalance, useQuery } from 'wagmi'
import { readContracts } from '@wagmi/core'
import { getAddress, isAddressEqual, zeroAddress } from 'viem'

import { Balances } from '../model/balances'
import { Currency } from '../model/currency'
import { IERC20__factory } from '../typechain'
import { fetchCurrencies } from '../apis/currency'
import { Prices } from '../model/prices'
import { fetchPrices } from '../apis/prices'
import { max } from '../utils/bigint'
import { WrappedEthers } from '../constants/weths'

import { useMarketContext } from './market-context'
import { useChainContext } from './chain-context'

type CurrencyContext = {
  currencies: Currency[]
  prices: Prices
  balances: Balances
}

const Context = React.createContext<CurrencyContext>({
  currencies: [],
  prices: {},
  balances: {},
})

export const isEthereum = (currency: Currency) => {
  return WrappedEthers.map((address) => getAddress(address)).includes(
    getAddress(currency.address),
  )
}

export const CurrencyProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { selectedChain } = useChainContext()
  const { address: userAddress } = useAccount()
  const { data: balance } = useBalance({ address: userAddress })
  const { markets } = useMarketContext()

  const { data: currencies } = useQuery(
    ['currencies', selectedChain],
    async () => fetchCurrencies(selectedChain),
  )

  const { data: prices } = useQuery(
    ['prices', selectedChain],
    async () => {
      return fetchPrices(selectedChain)
    },
    {
      refetchInterval: 10 * 1000,
      refetchOnWindowFocus: true,
    },
  )

  const { data: balances } = useQuery(
    ['balances', userAddress, balance, markets, currencies],
    async () => {
      if (!userAddress) {
        return {}
      }
      const uniqueCurrencies = [
        ...markets.map((market) => market.quoteToken),
        ...markets.map((market) => market.baseToken),
      ]
        .concat(
          currencies
            ? currencies.filter(
                (currency) => !isAddressEqual(currency.address, zeroAddress),
              )
            : [],
        )
        .filter(
          (currency, index, self) =>
            self.findIndex((c) => c.address === currency.address) === index,
        )
      const results = await readContracts({
        contracts: uniqueCurrencies.map((currency) => ({
          address: currency.address,
          abi: IERC20__factory.abi,
          functionName: 'balanceOf',
          args: [userAddress],
        })),
      })
      return results.reduce(
        (acc: {}, { result }, index: number) => {
          const currency = uniqueCurrencies[index]
          return {
            ...acc,
            [getAddress(currency.address)]: result ?? 0n,
          }
        },
        {
          [zeroAddress]: balance?.value ?? 0n,
        },
      )
    },
    {
      refetchInterval: 10 * 1000,
      refetchOnWindowFocus: true,
    },
  ) as { data: Balances }

  const calculateETHValue = useCallback(
    (currency: Currency, willPayAmount: bigint) => {
      if (!balance || !balances || !isEthereum(currency)) {
        return 0n
      }
      const wrappedETHBalance = balances[currency.address] - balance.value
      return max(willPayAmount - wrappedETHBalance, 0n)
    },
    [balance, balances],
  )

  return (
    <Context.Provider
      value={{
        currencies: currencies ?? [],
        prices: prices ?? {},
        balances: balances ?? {},
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useCurrencyContext = () =>
  React.useContext(Context) as CurrencyContext
