// this file will be deleted after the migration

type CloberSubRouteDto = {
  dex_id: string
  dex_type: string
  tokens: string[]
  pools: string[]
}

export type CloberSubRoute = {
  dexType: number
  tokens: string[]
  pools: string[]
  extraData: string
}

type CloberRouteDto = {
  part: number
  sub_routes: CloberSubRouteDto[]
}

export type CloberRoute = {
  inputAmount: string
  subRoutes: CloberSubRoute[]
}

export type CloberQuoteResultDto = {
  routes: CloberRouteDto[]
  amount_in: number
  amount_out: number
  parts: number
  runtime_graph_algorithm: number
  runtime: number
  block_number: number
  acc_gas_fee: number
}
