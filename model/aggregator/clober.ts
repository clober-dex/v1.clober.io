import {
  encodeFunctionData,
  getAddress,
  isAddressEqual,
  stringToHex,
  zeroAddress,
} from 'viem'
import qs from 'qs'
import BigNumber from 'bignumber.js'
import { Chain } from 'wagmi'

import { Currency } from '../currency'
import { fetchApi } from '../../apis/utils'
import { Prices } from '../prices'
import { PathViz } from '../pathviz'

import { Aggregator } from './index'

type SubRouteDto = {
  dex_id: string
  dex_type: string
  tokens: []
  pools: string[]
}

type SubRoute = {
  dexType: bigint
  tokens: `0x${string}`[]
  pools: `0x${string}`[]
  extraData: `0x${string}`
}

type RouteDto = {
  part: number
  sub_routes: SubRouteDto[]
}

type Route = {
  inputAmount: bigint
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

const abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'inputAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'dexType',
                type: 'uint256',
              },
              {
                internalType: 'address[]',
                name: 'tokens',
                type: 'address[]',
              },
              {
                internalType: 'address[]',
                name: 'pools',
                type: 'address[]',
              },
              {
                internalType: 'bytes',
                name: 'extraData',
                type: 'bytes',
              },
            ],
            internalType: 'struct IAggregator.SubRoute[]',
            name: 'subRoutes',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct IAggregator.Route[]',
        name: 'routes',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256',
        name: 'inputAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minOutputAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'expectedOutputAmount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
    name: 'swap',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
] as const

export class CloberAggregator implements Aggregator {
  public readonly baseUrl = 'https://pathfinder.clober-api.com'
  public readonly contract: `0x${string}`
  public readonly chain: Chain

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

  private buildExtraData(dexId: string): `0x${string}` {
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
          dexType: BigInt(dexType),
          tokens: subRoute.tokens as `0x${string}`[],
          pools: subRoute.pools as `0x${string}`[],
          extraData: this.buildExtraData(subRoute.dex_id),
        }
      })

      const route: Route = {
        inputAmount: BigInt(inputAmount),
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
    return {
      amountOut: BigInt(result.amount_out),
      gasLimit: BigInt(result.acc_gas_fee),
      pathViz: undefined,
      aggregator: this,
    }
  }

  public async buildCallData(
    inputCurrency: Currency,
    amountIn: bigint,
    outputCurrency: Currency,
    slippageLimitPercent: number,
    gasPrice: bigint,
    userAddress: `0x${string}`,
  ): Promise<{
    data: `0x${string}`
    gas: bigint
    value: bigint
    to: `0x${string}`
    nonce?: number
    gasPrice?: bigint
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
    const amountOut = BigInt(result.amount_out)
    const gasLimit = BigInt(result.acc_gas_fee)
    const routes = this.buildRoutes(result)
    if (!routes) {
      throw new Error('No routes')
    }

    const minOutputAmount = BigInt(
      new BigNumber(1)
        .minus(new BigNumber(slippageLimitPercent).dividedBy(100).toString())
        .multipliedBy(amountOut.toString())
        .toFixed(0),
    )
    const data = encodeFunctionData({
      abi,
      functionName: 'swap',
      args: [routes, amountIn, minOutputAmount, amountOut, userAddress],
    })

    return {
      data,
      gas: BigInt(
        new BigNumber(gasLimit.toString())
          .multipliedBy(1.4)
          .plus(30000)
          .toFixed(0),
      ),
      value: isAddressEqual(inputCurrency.address, zeroAddress)
        ? amountIn
        : BigInt(0),
      to: this.contract,
      gasPrice,
    }
  }
}
