export type OrderKeyStruct = {
  isBid: boolean
  priceIndex: number
  orderIndex: bigint
}

export type CancelParamsStruct = {
  market: `0x${string}`
  tokenIds: bigint[]
}

export type ClaimOrderParamsStruct = {
  market: `0x${string}`
  orderKeys: OrderKeyStruct[]
}

export type ClaimParamsList = ClaimOrderParamsStruct[]

export type CancelParamsList = CancelParamsStruct[]

export type ClaimParamsListMap = {
  [address in `0x${string}`]: ClaimParamsList
}
