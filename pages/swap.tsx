import React, { useEffect } from 'react'

import { SwapContainer } from '../containers/swap-container'
import { cleanAndSetQueryParams } from '../utils/url'
import { useSwapContext } from '../contexts/swap/swap-context'

export default function Swap() {
  const { inputCurrency, outputCurrency } = useSwapContext()
  useEffect(() => {
    cleanAndSetQueryParams(['chain'], {
      inputCurrency: inputCurrency?.address,
      outputCurrency: outputCurrency?.address,
    })
  }, [inputCurrency, outputCurrency])
  return <SwapContainer />
}
