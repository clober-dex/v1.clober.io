import { getAddress } from 'viem'

import { getBuiltGraphSDK } from '../.graphclient'
import { CHAIN_IDS, findSupportChain } from '../constants/chain'
import { SUBGRAPH_URL } from '../constants/subgraph-url'
import { OpenOrder } from '../model/open-order'
import { Chain } from '../model/chain'

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
  const chain = findSupportChain(chainId) as Chain
  return openOrders.map((openOrder) => {
    const inputToken = openOrder.isBid
      ? openOrder.market.quoteToken
      : openOrder.market.baseToken
    const outputToken = openOrder.isBid
      ? openOrder.market.baseToken
      : openOrder.market.quoteToken
    return {
      nftId: BigInt(openOrder.nftId),
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
      txUrl: chain.blockExplorers
        ? `${chain.blockExplorers.default.url}/tx/${openOrder.txHash}`
        : '',
      price: BigInt(openOrder.price),
      baseFilledAmount: BigInt(openOrder.baseFilledAmount),
      quoteAmount:
        BigInt(openOrder.rawAmount) * BigInt(openOrder.market.quoteUnit),
      baseAmount: BigInt(openOrder.baseAmount),
      claimableAmount: BigInt(openOrder.claimableAmount),
    }
  })
}
