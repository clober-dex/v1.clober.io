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
  return openOrders.map((openOrder) => {
    const inputCurrency = openOrder.isBid
      ? openOrder.market.quoteToken
      : openOrder.market.baseToken
    const outputCurrency = openOrder.isBid
      ? openOrder.market.baseToken
      : openOrder.market.quoteToken
    return {
      inputCurrency: {
        address: getAddress(inputCurrency.id),
        name: inputCurrency.name,
        symbol: inputCurrency.symbol,
        decimals: Number(inputCurrency.decimals),
      },
      outputCurrency: {
        address: getAddress(outputCurrency.id),
        name: outputCurrency.name,
        symbol: outputCurrency.symbol,
        decimals: Number(outputCurrency.decimals),
      },
      isBid: openOrder.isBid,
      txHash: openOrder.txHash as `0x${string}`,
      timestamp: formatDate(new Date(Number(openOrder.createdAt) * 1000)),
      price: BigInt(openOrder.price),
      filledAmount: BigInt(openOrder.baseFilledAmount),
      amount: BigInt(openOrder.baseAmount),
      claimableAmount: BigInt(openOrder.baseClaimedAmount),
    }
  })
}
