import React from 'react'
import { useAccount, useBalance, useQuery } from 'wagmi'
import { readContracts } from '@wagmi/core'
import { getAddress, zeroAddress } from 'viem'

import { Balances } from '../model/balances'
import { IERC20__factory } from '../typechain'

import { useMarketContext } from './market-context'

type LimitCurrencyContext = {
  balances: Balances
}

const Context = React.createContext<LimitCurrencyContext>({
  balances: {},
})

export const LimitCurrencyProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const { address: userAddress } = useAccount()
  const { data: balance } = useBalance({ address: userAddress })
  const { markets } = useMarketContext()

  const { data: balances } = useQuery(
    ['limit-balances', userAddress, balance, markets],
    async () => {
      if (!userAddress) {
        return {}
      }
      const uniqueCurrencies = [
        ...markets.map((market) => market.quoteToken),
        ...markets.map((market) => market.baseToken),
      ].filter(
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

  return (
    <Context.Provider
      value={{
        balances: balances ?? {},
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useLimitCurrencyContext = () =>
  React.useContext(Context) as LimitCurrencyContext
