import { arbitrum, mainnet } from '@wagmi/chains'
import { Chain as WagmiChain } from 'wagmi'

import { Chain } from '../model/chain'

export const supportChains: Chain[] = [
  { ...mainnet, defaultGasPrice: 1000000n },
  { ...arbitrum, defaultGasPrice: 1000000n },
]

export const toWagmiChain = (chain: Chain): WagmiChain => {
  return {
    id: chain.id,
    name: chain.name,
    network: chain.network,
    nativeCurrency: chain.nativeCurrency,
    rpcUrls: chain.rpcUrls,
    blockExplorers: chain.blockExplorers,
    contracts: chain.contracts,
  }
}
