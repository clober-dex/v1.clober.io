import { Chain as WagmiChain } from 'wagmi'

export type Chain = WagmiChain & {
  expireIn: number
  defaultGasPrice: bigint
  icon?: string
}

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

export const toChain = (chains: Chain[], chain: WagmiChain): Chain => {
  const selectedChain = chains.find((c) => c.id === chain.id)
  if (!selectedChain) {
    throw new Error(`Chain ${chain.id} not found`)
  }
  return selectedChain
}
