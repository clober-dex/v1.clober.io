import React, { useMemo } from 'react'
import { useAccount, useQuery } from 'wagmi'
import { getAddress } from 'viem'

import { OpenOrder } from '../../model/open-order'
import { fetchOpenOrders } from '../../apis/open-orders'
import { useChainContext } from '../chain-context'
import { Balances } from '../../model/balances'

type OpenOrderContext = {
  openOrders: OpenOrder[]
  claimable: Balances
}

const Context = React.createContext<OpenOrderContext>({
  openOrders: [],
  claimable: {},
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
      refetchIntervalInBackground: true,
      refetchInterval: 10 * 1000,
      initialData: [],
    },
  )
  const claimable = useMemo(
    () =>
      openOrders.reduce((acc, openOrder) => {
        acc[getAddress(openOrder.inputToken.address)] =
          (acc[getAddress(openOrder.inputToken.address)] ?? 0n) +
          openOrder.claimableAmount
        return acc
      }, {} as Balances),
    [openOrders],
  )

  return (
    <Context.Provider
      value={{
        openOrders,
        claimable,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useOpenOrderContext = () =>
  React.useContext(Context) as OpenOrderContext
