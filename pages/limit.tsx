import React, { useEffect } from 'react'

import { LimitContainer } from '../containers/limit-container'
import { useMarketContext } from '../contexts/limit/market-context'
import { cleanAndSetQueryParams } from '../utils/url'

export default function Limit() {
  const { selectedMarket } = useMarketContext()
  useEffect(() => {
    cleanAndSetQueryParams(['chain'], {
      market: selectedMarket?.address,
    })
  }, [selectedMarket])
  return <LimitContainer />
}
