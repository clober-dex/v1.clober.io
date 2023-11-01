import { getAddress } from 'viem'
import { polygonZkEvm } from 'wagmi/chains'
import qs from 'qs'

import { CHAIN_IDS } from '../constants/chain'
import { Currency } from '../model/currency'
import { PathViz } from '../model/pathviz'

import { fetchCloberApi, fetchOdosApi } from './utils'

export async function fetchQuotes({
  chainId,
  amountIn,
  inputCurrency,
  outputCurrency,
  slippageLimitPercent,
  userAddress,
  gasPrice,
  gasEffectiveMode, // Todo: remove this
}: {
  chainId: CHAIN_IDS
  amountIn: bigint
  inputCurrency: Currency
  outputCurrency: Currency
  slippageLimitPercent: number
  userAddress?: string
  gasPrice: bigint
  gasEffectiveMode: boolean
}): Promise<{
  amountOut: bigint
  pathViz: PathViz
  pathId?: string
  gasEstimateValue: number
}> {
  if (chainId === polygonZkEvm.id) {
    const { result } = await fetchCloberApi<{
      result: {
        acc_gas_fee: number
        amount_out: number
      }
    }>(
      `quotes?${qs.stringify({
        tokenIn: getAddress(inputCurrency.address),
        tokenOut: getAddress(outputCurrency.address),
        amountIn,
        parts: 1,
        maxHops: 5,
        fastestMode: false,
        gasEffectiveMode,
      })}`,
    )
    return {
      amountOut: BigInt(result.amount_out),
      pathViz: {} as PathViz,
      gasEstimateValue:
        ((result.acc_gas_fee * Number(gasPrice)) / Math.pow(10, 18)) * 1800, // this code will be removed
    }
  }
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
