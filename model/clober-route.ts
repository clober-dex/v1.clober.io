// this file will be deleted after the migration

export type CloberSubRoute = {
  dexType: number
  tokens: string[]
  pools: string[]
  extraData: string
}

export type CloberRoute = {
  inputAmount: string
  subRoutes: CloberSubRoute[]
}

export type CloberSwapInput = {
  routes: CloberRoute[]
  amountIn: string
  amountOut: string
  parts: number
  blockNumber: number
  accGasFee: string
}
