import { arbitrum, polygon, polygonZkEvm } from 'viem/chains'

import { Chain } from '../model/chain'

import { couponFinanceChain } from './dev-chain'

export const supportChains: Chain[] =
  process.env.BUILD === 'dev'
    ? [
        {
          ...couponFinanceChain,
          defaultGasPrice: 0n,
          expireIn: 60,
          icon: 'https://www.coupon.finance/favicon.svg',
        },
        {
          ...polygonZkEvm,
          defaultGasPrice: 0n,
          expireIn: 240,
        },
        {
          ...polygon,
          defaultGasPrice: 0n,
          expireIn: 240,
        },
        {
          ...arbitrum,
          defaultGasPrice: 0n,
          expireIn: 240,
        },
      ]
    : [
        {
          ...polygonZkEvm,
          defaultGasPrice: 0n,
          expireIn: 240,
        },
        {
          ...polygon,
          defaultGasPrice: 0n,
          expireIn: 240,
        },
        {
          ...arbitrum,
          defaultGasPrice: 0n,
          expireIn: 240,
        },
      ]

export const findSupportChain = (chainId: number): Chain | undefined =>
  supportChains.find((chain) => chain.id === chainId)

export enum CHAIN_IDS {
  POLYGON = 137,
  ARBITRUM = 42161,
  POLYGON_ZKEVM = 1101,
  COUPON_FINANCE_CHAIN = 7777,
}
