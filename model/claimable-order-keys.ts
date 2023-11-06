type OrderKeyStruct = {
  isBid: boolean
  priceIndex: number
  orderIndex: bigint
}

export type ClaimableOrderKeys = {
  [marketAddress: `0x${string}`]: OrderKeyStruct[]
}
