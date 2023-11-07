import { CHAIN_IDS } from './chain'

export const SUBGRAPH_URL: {
  [chain in CHAIN_IDS]: string
} = {
  [CHAIN_IDS.POLYGON]:
    'https://api.studio.thegraph.com/query/49804/core-v1-polygon-subgraph/v1',
  [CHAIN_IDS.ARBITRUM]:
    'https://api.studio.thegraph.com/query/49804/core-v1-arbitrum-subgraph/v1',
  [CHAIN_IDS.COUPON_FINANCE_CHAIN]:
    'https://dev-subgraph.coupon.finance/subgraphs/name/core-v1-subgraph',
  [CHAIN_IDS.POLYGON_ZKEVM]:
    'https://api.studio.thegraph.com/query/49804/core-v1-zkevm-subgraph/v1',
}
