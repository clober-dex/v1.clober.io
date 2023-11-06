import React, { useMemo } from 'react'
import { useAccount, useQuery } from 'wagmi'
import { getAddress } from 'viem'

import { OpenOrder } from '../../model/open-order'
import { fetchOpenOrders } from '../../apis/open-orders'
import { useChainContext } from '../chain-context'
import { Balances } from '../../model/balances'
import { ClaimableOrderKeys } from '../../model/claimable-order-keys'

type OpenOrderContext = {
  openOrders: OpenOrder[]
  claimable: Balances
  claimableOrderKeys: ClaimableOrderKeys
}

const Context = React.createContext<OpenOrderContext>({
  openOrders: [],
  claimable: {},
  claimableOrderKeys: {},
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
  const claimableOrderKeys = useMemo(
    () =>
      openOrders
        .filter((openOrder) => openOrder.claimableAmount > 0n)
        .reduce((acc, openOrder) => {
          const marketAddress = getAddress(openOrder.marketAddress)
          acc[marketAddress] = [
            ...(acc[marketAddress] ?? []),
            {
              isBid: openOrder.isBid,
              priceIndex: openOrder.priceIndex,
              orderIndex: openOrder.orderIndex,
            },
          ]
          return acc
        }, {} as ClaimableOrderKeys),
    [openOrders],
  )

  return (
    <Context.Provider
      value={{
        openOrders,
        claimable,
        claimableOrderKeys,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useOpenOrderContext = () =>
  React.useContext(Context) as OpenOrderContext
