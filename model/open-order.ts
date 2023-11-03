import { Currency } from './currency'

export type OpenOrder = {
  inputToken: Currency
  outputToken: Currency
  isBid: boolean
  txHash: `0x${string}`
  price: bigint
  filledAmount: bigint
  amount: bigint
  claimableAmount: bigint
}
