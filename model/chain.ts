import { Chain as WagmiChain } from 'wagmi'

export type Chain = WagmiChain & {
  defaultGasPrice?: bigint
}
