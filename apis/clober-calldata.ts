// this file will be deleted after the migration

import qs from 'qs'
import { getAddress } from 'viem'
import BigNumber from 'bignumber.js'

import { CloberQuoteResultDto, CloberRoute } from '../model/clober-route'
import { Currency } from '../model/currency'
import { buildCloberRoutes } from '../utils/clober-route'

import { fetchCloberApi } from './utils'

export async function buildSwapCloberCallData({
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  gasEffectiveMode,
}: {
  inputCurrency: Currency
  outputCurrency: Currency
  inputCurrencyAmount: bigint
  gasEffectiveMode: boolean
}) {
  const { result } = await fetchCloberApi<{
    result: CloberQuoteResultDto
  }>(
    `quotes?${qs.stringify({
      tokenIn: getAddress(inputCurrency.address),
      tokenOut: getAddress(outputCurrency.address),
      amountIn: inputCurrencyAmount,
      parts: 1,
      maxHops: 5,
      fastestMode: false,
      gasEffectiveMode,
    })}`,
  )
  const routes: CloberRoute[] = buildCloberRoutes(result)
  return {
    routes,
    amountIn: new BigNumber(result.amount_in).toFixed(0),
    amountOut: new BigNumber(result.amount_out).toFixed(0),
    parts: result.parts,
    blockNumber: result.block_number,
    accGasFee: new BigNumber(result.acc_gas_fee).toFixed(0),
  }
}
