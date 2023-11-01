import { getAddress } from 'viem'

import { CHAIN_IDS } from '../constants/chain'
import { Currency } from '../model/currency'
import { PathViz } from '../model/pathviz'

import { fetchOdosApi } from './utils'

export async function fetchQuotes({
  chainId,
  amountIn,
  inputCurrency,
  outputCurrency,
  slippageLimitPercent,
  userAddress,
  gasPrice,
}: {
  chainId: CHAIN_IDS
  amountIn: bigint
  inputCurrency: Currency
  outputCurrency: Currency
  slippageLimitPercent: number
  userAddress?: string
  gasPrice: bigint
}): Promise<{
  amountOut: bigint
  pathViz: PathViz
  pathId?: string
  gasEstimateValue: number
}> {
  const result: {
    outAmounts: string[]
    pathViz: PathViz
    pathId: string
    gasEstimateValue: number
  } = await fetchOdosApi('sor/quote/v2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      chainId,
      inputTokens: [
        {
          tokenAddress: getAddress(inputCurrency.address),
          amount: amountIn.toString(),
        },
      ],
      outputTokens: [
        {
          tokenAddress: getAddress(outputCurrency.address),
          proportion: 1,
        },
      ],
      gasPrice: Number(gasPrice) / 1000000000,
      userAddr: userAddress,
      slippageLimitPercent,
      sourceBlacklist: [],
      pathViz: true,
    }),
  })
  return {
    amountOut: BigInt(result.outAmounts[0]),
    pathViz: result.pathViz,
    pathId: result.pathId,
    gasEstimateValue: result.gasEstimateValue,
  }
}
