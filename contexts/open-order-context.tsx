import React from 'react'
import { useAccount, useQuery } from 'wagmi'

import { OpenOrder } from '../model/open-order'
import { fetchOpenOrders } from '../apis/open-orders'

import { useChainContext } from './chain-context'

type OpenOrderContext = {
  openOrders: OpenOrder[]
}

const Context = React.createContext<OpenOrderContext>({
  openOrders: [],
})

export const OpenOrderProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const { address: userAddress } = useAccount()
  const { selectedChain } = useChainContext()

  const { data: openOrders } = useQuery(
    ['open-orders', selectedChain, userAddress],
    () => (userAddress ? fetchOpenOrders(selectedChain.id, userAddress) : []),
    {
      refetchOnWindowFocus: true,
      refetchInterval: 10 * 1000,
      initialData: [],
    },
  )

  return (
    <Context.Provider
      value={{
        openOrders,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useOpenOrderContext = () =>
  React.useContext(Context) as OpenOrderContext
