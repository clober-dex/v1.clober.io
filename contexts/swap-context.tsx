import React, { useEffect, useState } from 'react'

import { Currency } from '../model/currency'

import { useChainContext } from './chain-context'

type SwapContext = {
  inputCurrency: Currency | undefined
  setInputCurrency: (currency: Currency | undefined) => void
  inputCurrencyAmount: string
  setInputCurrencyAmount: (amount: string) => void
  outputCurrency: Currency | undefined
  setOutputCurrency: (currency: Currency | undefined) => void
  slippageInput: string
  setSlippageInput: (slippage: string) => void
}

const Context = React.createContext<SwapContext>({
  inputCurrency: undefined,
  setInputCurrency: () => {},
  inputCurrencyAmount: '',
  setInputCurrencyAmount: () => {},
  outputCurrency: undefined,
  setOutputCurrency: () => {},
  slippageInput: '1',
  setSlippageInput: () => {},
})

export const SwapProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { selectedChain } = useChainContext()

  const [inputCurrency, setInputCurrency] = useState<Currency | undefined>(
    undefined,
  )
  const [inputCurrencyAmount, setInputCurrencyAmount] = useState('')
  const [outputCurrency, setOutputCurrency] = useState<Currency | undefined>(
    undefined,
  )
  const [slippageInput, setSlippageInput] = useState('1')

  useEffect(() => {
    setInputCurrency(undefined)
    setInputCurrencyAmount('')
    setOutputCurrency(undefined)
  }, [selectedChain])

  return (
    <Context.Provider
      value={{
        inputCurrency,
        setInputCurrency,
        inputCurrencyAmount,
        setInputCurrencyAmount,
        outputCurrency,
        setOutputCurrency,
        slippageInput,
        setSlippageInput,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useSwapContext = () => React.useContext(Context) as SwapContext
