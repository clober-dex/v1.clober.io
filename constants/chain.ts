import { polygonZkEvm } from 'wagmi/chains'

import { Chain } from '../model/chain'

import { couponFinanceChain } from './dev-chain'

export const supportChains: Chain[] =
  process.env.BUILD === 'dev'
    ? [
        {
          ...couponFinanceChain,
          defaultGasPrice: 0n,
          icon: 'https://www.coupon.finance/favicon.svg',
        },
        {
          ...polygonZkEvm,
          defaultGasPrice: 1000000n,
        },
      ]
    : []

export enum CHAIN_IDS {
  ARBITRUM = 42161,
  POLYGON_ZKEVM = 1101,
  COUPON_FINANCE_CHAIN = 7777,
}
