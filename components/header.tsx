import React from 'react'
import Link from 'next/link'
import { useAccount } from 'wagmi'

import { useChainContext } from '../contexts/chain-context'
import { supportChains } from '../utils/chain'

import ChainSelector from './selector/chain-selector'
import { WalletSelector } from './selector/wallet-selector'

const Header = () => {
  const { selectedChain, setSelectedChain } = useChainContext()
  const { address, status } = useAccount()

  return (
    <div className="flex items-center justify-between h-12 md:h-16 py-0 px-4">
      <div className="flex items-center gap-4 md:gap-12">
        <Link
          className={`flex gap-2 items-center`}
          target="_blank"
          href="https://clober.io"
          rel="noreferrer"
        >
          <img className="h-5 md:h-7" src="/assets/logo.svg" alt="logo" />
        </Link>
      </div>
      <div className="flex gap-2 w-auto md:gap-4 ml-auto">
        <ChainSelector
          chain={selectedChain}
          setChain={setSelectedChain}
          chains={supportChains}
        />
        <WalletSelector address={address} status={status} />
      </div>
    </div>
  )
}

export default Header
