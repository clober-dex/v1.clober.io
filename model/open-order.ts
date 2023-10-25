export type OpenOrder = {
  baseSymbol: string
  quoteSymbol: string
  isBid: boolean
  txHash: `0x${string}`
  timestamp: string
  price: bigint
  filledAmount: bigint
  amount: bigint
  claimableAmount: bigint
}
