import { getAddress, stringToHex, zeroAddress } from 'viem'
import qs from 'qs'
import BigNumber from 'bignumber.js'

import { Currency } from '../currency'
import { fetchApi } from '../../apis/utils'
import { Chain } from '../chain'
import { Prices } from '../prices'
import { PathViz } from '../pathviz'

import { Aggregator } from './index'

type SubRouteDto = {
  dex_id: string
  dex_type: string
  tokens: string[]
  pools: string[]
}

type SubRoute = {
  dexType: number
  tokens: string[]
  pools: string[]
  extraData: string
}

type RouteDto = {
  part: number
  sub_routes: SubRouteDto[]
}

type Route = {
  inputAmount: string
  subRoutes: SubRoute[]
}

type QuoteResultDto = {
  routes: RouteDto[]
  amount_in: number
  amount_out: number
  parts: number
  acc_gas_fee: number
}

const DexType = {
  Mock: 0,
  WrappedNative: 1,
  UniSwapV2: 2,
  Algebra: 3,
  UniSwapV3: 4,
  KokonutSwap: 5,
  MantisSwap: 6,
  Gmx: 7,
  Clober: 8,
  BalancerV2: 9,
}

export class CloberAggregator implements Aggregator {
  public readonly baseUrl = 'https://pathfinder.clober-api.com'
  public readonly contract: `0x${string}`
  public readonly chain: Chain
  private routes: Route[] | undefined

  constructor(contract: `0x${string}`, chain: Chain) {
    this.contract = contract
    this.chain = chain
  }

  public async currencies(): Promise<Currency[]> {
    return (
      await fetchApi<{
        result: Currency[]
      }>(this.baseUrl, 'tokens')
    ).result.map((currency) => ({
      address: getAddress(currency.address),
      name: currency.name,
      symbol: currency.symbol,
      decimals: currency.decimals,
    }))
  }

  public async prices(): Promise<Prices> {
    return (
      await fetchApi<{
        result: {
          address: string
          price: number
        }[]
      }>(this.baseUrl, 'tokens')
    ).result.reduce((acc, { address, price }) => {
      acc[getAddress(address)] = price
      return acc
    }, {} as Prices)
  }

  private buildExtraData(dexId: string): string {
    if (dexId === 'QUICKSWAP_V3') {
      return '0x000000000000000000000000f6ad3ccf71abb3e12becf6b3d2a74c963859adcd'
    } else if (dexId === 'DOVESWAP_V3') {
      return '0x00000000000000000000000095bf28c6502a0544c7adc154bc60d886d9a80a5c'
    } else {
      return stringToHex('', { size: 32 })
    }
  }

  private buildRoutes(bestResult: QuoteResultDto): Route[] {
    const parts = bestResult.parts
    const routes: Route[] = []
    bestResult.routes.forEach((routeDto) => {
      const inputAmount = new BigNumber(bestResult.amount_in)
        .multipliedBy(routeDto.part)
        .div(parts)
        .toFixed(0)
      const subRoutes: SubRoute[] = routeDto.sub_routes.map((subRoute) => {
        const dexType = DexType[subRoute.dex_type as keyof typeof DexType]
        return {
          dexType,
          tokens: subRoute.tokens,
          pools: subRoute.pools,
          extraData: this.buildExtraData(subRoute.dex_id),
        }
      })

      const route: Route = {
        inputAmount,
        subRoutes,
      }
      routes.push(route)
    })
    return routes
  }

  public async quote(
    inputCurrency: Currency,
    amountIn: bigint,
    outputCurrency: Currency,
  ): Promise<{
    amountOut: bigint
    gasLimit: bigint
    pathViz: PathViz | undefined
    aggregator: Aggregator
  }> {
    const { result } = await fetchApi<{
      result: QuoteResultDto
    }>(
      this.baseUrl,
      `quotes?${qs.stringify({
        tokenIn: getAddress(inputCurrency.address),
        tokenOut: getAddress(outputCurrency.address),
        amountIn,
        parts: 1,
        maxHops: 6,
        fastestMode: false,
        gasEffectiveMode: false,
      })}`,
    )
    this.routes = this.buildRoutes(result)
    return {
      amountOut: BigInt(result.amount_out),
      gasLimit: BigInt(result.acc_gas_fee),
      pathViz: undefined,
      aggregator: this,
    }
  }

  public async data(
    inputCurrency: Currency,
    amountIn: bigint,
    outputCurrency: Currency,
  ): Promise<{
    data: `0x${string}`
    gas: bigint
    value: bigint
    to: `0x${string}`
    nonce: number
    gasPrice: bigint
  }> {
    await this.quote(inputCurrency, amountIn, outputCurrency)
    if (!this.routes) {
      throw new Error('No routes')
    }

    return {
      data: zeroAddress,
      gas: BigInt(0),
      value: BigInt(0),
      to: zeroAddress,
      nonce: 0,
      gasPrice: BigInt(0),
    }
  }
}
