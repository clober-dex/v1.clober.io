import React from 'react'
import Link from 'next/link'

import ChainSelector from './chain-selector'
import { WalletSelector } from './wallet-selector'

const Header = () => {
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
        <ChainSelector />
        <WalletSelector />
      </div>
    </div>
  )
}

export default Header
