import { getAddress } from 'viem'

import { getBuiltGraphSDK } from '../.graphclient'
import { CHAIN_IDS } from '../constants/chain'
import { SUBGRAPH_URL } from '../constants/subgraph-url'
import { OpenOrder } from '../model/open-order'

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
  return openOrders.map((openOrder) => {
    const inputToken = openOrder.isBid
      ? openOrder.market.quoteToken
      : openOrder.market.baseToken
    const outputToken = openOrder.isBid
      ? openOrder.market.baseToken
      : openOrder.market.quoteToken
    return {
      marketAddress: getAddress(openOrder.market.id),
      inputToken: {
        address: getAddress(inputToken.id),
        name: inputToken.name,
        symbol: inputToken.symbol,
        decimals: Number(inputToken.decimals),
      },
      outputToken: {
        address: getAddress(outputToken.id),
        name: outputToken.name,
        symbol: outputToken.symbol,
        decimals: Number(outputToken.decimals),
      },
      isBid: openOrder.isBid,
      priceIndex: Number(openOrder.priceIndex),
      orderIndex: BigInt(openOrder.orderIndex),
      txHash: openOrder.txHash as `0x${string}`,
      price: BigInt(openOrder.price),
      baseFilledAmount: BigInt(openOrder.baseFilledAmount),
      baseAmount: BigInt(openOrder.baseAmount),
      claimableAmount: BigInt(openOrder.claimableAmount),
    }
  })
}
