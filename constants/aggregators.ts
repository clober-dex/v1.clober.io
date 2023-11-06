import { arbitrum, polygonZkEvm } from '@wagmi/chains'

import { Aggregator } from '../model/aggregator'
import { CloberAggregator } from '../model/aggregator/clober'
import { OdosAggregator } from '../model/aggregator/odos'

import { CHAIN_IDS } from './chain'

export const AGGREGATORS: {
  [chain in CHAIN_IDS]: Aggregator[]
} = {
  [CHAIN_IDS.ARBITRUM]: [
    new OdosAggregator('0xa669e7A0d4b3e4Fa48af2dE86BD4CD7126Be4e13', arbitrum),
  ],
  [CHAIN_IDS.COUPON_FINANCE_CHAIN]: [],
  [CHAIN_IDS.POLYGON_ZKEVM]: [
    new CloberAggregator(
      '0xD7B7F2BF1a72743851d91D07EE3789066255Fec3',
      polygonZkEvm,
    ),
  ],
}
