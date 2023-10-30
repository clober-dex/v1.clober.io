import { arbitrum } from 'viem/chains'
import { arbitrumGoerli } from 'wagmi/chains'

import { Chain } from '../model/chain'

import { couponFinanceChain } from './dev-chain'

export const supportChains: Chain[] =
  process.env.BUILD === 'dev'
    ? [
        {
          ...couponFinanceChain,
          defaultGasPrice: 1000000n,
          icon: 'https://www.coupon.finance/favicon.svg',
        },
      ]
    : [{ ...arbitrumGoerli, defaultGasPrice: 1000000n }]

export enum CHAIN_IDS {
  ARBITRUM = 42161,
  COUPON_FINANCE_CHAIN = 7777,
}

export const CHAINS: {
  [chain in CHAIN_IDS]: Chain
} = {
  [CHAIN_IDS.ARBITRUM]: arbitrum,
  [CHAIN_IDS.COUPON_FINANCE_CHAIN]: couponFinanceChain,
}
