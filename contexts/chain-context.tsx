import React, { useEffect } from 'react'
import { Chain, useNetwork } from 'wagmi'
import { mainnet } from '@wagmi/chains'

import { chainList } from '../pages/_app'

type ChainContext = {
  selectedChain: Chain
  setSelectedChain: (chain: Chain) => void
}

const Context = React.createContext<ChainContext>({
  selectedChain: mainnet,
  setSelectedChain: (_) => _,
})

export const ChainProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { chain } = useNetwork()
  const [selectedChain, setSelectedChain] = React.useState<Chain>(chainList[0])
  console.log('selectedChain', selectedChain.id)

  useEffect(() => {
    if (chain) {
      setSelectedChain(chain)
    }
  }, [chain])

  return (
    <Context.Provider value={{ selectedChain, setSelectedChain }}>
      {children}
    </Context.Provider>
  )
}

export const useChainContext = () => React.useContext(Context) as ChainContext
