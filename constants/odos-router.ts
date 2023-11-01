import { zeroAddress } from 'viem'

import { CHAIN_IDS } from './chain'

export const OdosRouter: {
  [chain in CHAIN_IDS]: `0x${string}`
} = {
  [CHAIN_IDS.ARBITRUM]: '0xa669e7A0d4b3e4Fa48af2dE86BD4CD7126Be4e13',
  [CHAIN_IDS.COUPON_FINANCE_CHAIN]: zeroAddress,
  [CHAIN_IDS.POLYGON_ZKEVM]: '0xD7B7F2BF1a72743851d91D07EE3789066255Fec3',
}
