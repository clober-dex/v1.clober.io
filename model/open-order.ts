import { Currency } from './currency'

export type OpenOrder = {
  inputCurrency: Currency
  outputCurrency: Currency
  isBid: boolean
  txHash: `0x${string}`
  price: bigint
  filledAmount: bigint
  amount: bigint
  claimableAmount: bigint
}
