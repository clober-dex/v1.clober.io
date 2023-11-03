import React, { useEffect } from 'react'
import { useQuery } from 'wagmi'
import { isAddressEqual } from 'viem'

import { Market } from '../../model/market'
import { fetchMarkets } from '../../apis/market'
import { useChainContext } from '../chain-context'

type MarketContext = {
  markets: Market[]
  selectedMarket?: Market
  setSelectedMarket: (market: Market) => void
}

const Context = React.createContext<MarketContext>({
  markets: [],
  selectedMarket: {} as Market,
  setSelectedMarket: (_) => _,
})

export const MarketProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { selectedChain } = useChainContext()

  const { data: markets } = useQuery(
    ['markets', selectedChain],
    async () => {
      return fetchMarkets(selectedChain.id)
    },
    {
      initialData: [],
      refetchInterval: 2000,
      refetchOnWindowFocus: true,
    },
  )
  // TODO: cache localstorage
  const [selectedMarket, setSelectedMarket] = React.useState<
    Market | undefined
  >(undefined)

  useEffect(() => {
    if (!selectedMarket) {
      setSelectedMarket(markets[0])
    } else if (
      selectedMarket &&
      !markets.find((market) =>
        isAddressEqual(market.address, selectedMarket.address),
      )
    ) {
      setSelectedMarket(markets[0])
    }
  }, [markets, selectedChain, selectedMarket])

  return (
    <Context.Provider value={{ markets, selectedMarket, setSelectedMarket }}>
      {children}
    </Context.Provider>
  )
}

export const useMarketContext = () => React.useContext(Context) as MarketContext
