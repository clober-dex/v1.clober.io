import { getAddress } from 'viem'

import { getBuiltGraphSDK } from '../.graphclient'
import { CHAIN_IDS } from '../constants/chain'
import { SUBGRAPH_URL } from '../constants/subgraph-url'
import { OpenOrder } from '../model/open-order'
import { formatDate } from '../utils/date'

const { getOpenOrders } = getBuiltGraphSDK()

export async function fetchOpenOrders(
  chainId: CHAIN_IDS,
  userAddress: `0x${string}`,
): Promise<OpenOrder[]> {
  const { openOrders } = await getOpenOrders(
    {
      userAddress: userAddress.toLowerCase(),
    },
    {
      url: SUBGRAPH_URL[chainId],
    },
  )
  return openOrders.map((openOrder) => ({
    baseSymbol: openOrder.market.baseToken.symbol,
    quoteSymbol: openOrder.market.quoteToken.symbol,
    isBid: openOrder.isBid,
    txHash: openOrder.txHash as `0x${string}`,
    timestamp: formatDate(new Date(Number(openOrder.createdAt) * 1000)),
    price: BigInt(openOrder.price),
    filledAmount: BigInt(openOrder.baseFilledAmount),
    amount: BigInt(openOrder.baseAmount),
    claimableAmount: BigInt(openOrder.baseClaimedAmount),
  }))
}