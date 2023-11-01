// this file will be deleted after the migration

import { stringToHex } from 'viem'
import BigNumber from 'bignumber.js'

import {
  CloberQuoteResultDto,
  CloberRoute,
  CloberSubRoute,
} from '../model/clober-route'

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

const buildExtraData = (dexId: string): string => {
  if (dexId === 'QUICKSWAP_V3') {
    return '0x000000000000000000000000f6ad3ccf71abb3e12becf6b3d2a74c963859adcd'
  } else if (dexId === 'DOVESWAP_V3') {
    return '0x00000000000000000000000095bf28c6502a0544c7adc154bc60d886d9a80a5c'
  } else {
    return stringToHex('', { size: 32 })
  }
}

export const buildCloberRoutes = (
  bestResult: CloberQuoteResultDto,
): CloberRoute[] => {
  const parts = bestResult.parts
  const routes: CloberRoute[] = []
  bestResult.routes.forEach((routeDto) => {
    const inputAmount = new BigNumber(bestResult.amount_in)
      .multipliedBy(routeDto.part)
      .div(parts)
      .toFixed(0)
    const subRoutes: CloberSubRoute[] = routeDto.sub_routes.map((subRoute) => {
      const dexType = DexType[subRoute.dex_type as keyof typeof DexType]
      return {
        dexType,
        tokens: subRoute.tokens,
        pools: subRoute.pools,
        extraData: buildExtraData(subRoute.dex_id),
      }
    })

    const route: CloberRoute = {
      inputAmount,
      subRoutes,
    }
    routes.push(route)
  })
  return routes
}
