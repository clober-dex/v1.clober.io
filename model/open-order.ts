import { Currency } from './currency'

export type OpenOrder = {
  nftId: bigint
  marketAddress: `0x${string}`
  inputToken: Currency
  outputToken: Currency
  isBid: boolean
  priceIndex: number
  orderIndex: bigint
  txHash: `0x${string}`
  price: bigint
  baseFilledAmount: bigint
  quoteAmount: bigint
  baseAmount: bigint
  claimableAmount: bigint
}
