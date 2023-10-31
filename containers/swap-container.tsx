import React, { useState } from 'react'
import { zeroAddress } from 'viem'

import { SwapForm } from '../components/form/swap-form'
import { Currency } from '../model/currency'
import { useCurrencyContext } from '../contexts/currency-context'
import { useChainContext } from '../contexts/chain-context'

const currencies = [
  {
    address: '0x0000000000000000000000000000000000000001',
    name: 'USDC',
    symbol: 'USDC',
    decimals: 6,
  },
  {
    address: '0x0000000000000000000000000000000000000002',
    name: 'WBTC',
    symbol: 'WBTC',
    decimals: 8,
  },
  {
    address: '0x0000000000000000000000000000000000000003',
    name: 'WETH',
    symbol: 'WETH',
    decimals: 18,
  },
  {
    address: '0x0000000000000000000000000000000000000004',
    name: 'USDT',
    symbol: 'USDT',
    decimals: 6,
  },
  {
    address: '0x0000000000000000000000000000000000000005',
    name: 'DAI',
    symbol: 'DAI',
    decimals: 18,
  },
] as Currency[]

export const SwapContainer = () => {
  const { selectedChain } = useChainContext()
  const { balances } = useCurrencyContext()

  const [inputCurrency, setInputCurrency] = useState<Currency | undefined>(
    undefined,
  )
  const [inputCurrencyAmount, setInputCurrencyAmount] = useState('')
  const [showInputCurrencySelect, setShowInputCurrencySelect] = useState(false)

  const [outputCurrency, setOutputCurrency] = useState<Currency | undefined>(
    undefined,
  )
  const [outputCurrencyAmount, setOutputCurrencyAmount] = useState('')
  const [showOutputCurrencySelect, setShowOutputCurrencySelect] =
    useState(false)

  const [slippageInput, setSlippageInput] = useState('1')
  const [partitionInput, setPartitionInput] = useState('1')
  const [swapLogic, setSwapLogic] = useState<'GasEfficient' | 'MaximizeReturn'>(
    'MaximizeReturn',
  )
  return (
    <div className="flex flex-col w-fit max-sm:w-full mb-4 sm:mb-6">
      <div className="flex flex-col rounded-2xl bg-gray-900 p-6 w-[480px] lg:h-[480px]">
        <SwapForm
          currencies={currencies}
          prices={{ '0x0000000000000000000000000000000000000000': 1800 }}
          showInputCurrencySelect={showInputCurrencySelect}
          setShowInputCurrencySelect={setShowInputCurrencySelect}
          inputCurrency={inputCurrency}
          setInputCurrency={setInputCurrency}
          inputCurrencyAmount={inputCurrencyAmount}
          setInputCurrencyAmount={setInputCurrencyAmount}
          availableInputCurrencyBalance={
            inputCurrency ? balances[inputCurrency.address] ?? 0n : 0n
          }
          showOutputCurrencySelect={showOutputCurrencySelect}
          setShowOutputCurrencySelect={setShowOutputCurrencySelect}
          outputCurrency={outputCurrency}
          setOutputCurrency={setOutputCurrency}
          outputCurrencyAmount={outputCurrencyAmount}
          setOutputCurrencyAmount={setOutputCurrencyAmount}
          availableOutputCurrencyBalance={
            outputCurrency ? balances[outputCurrency.address] ?? 0n : 0n
          }
          slippageInput={slippageInput}
          setSlippageInput={setSlippageInput}
          partitionInput={partitionInput}
          setPartitionInput={setPartitionInput}
          swapLogic={swapLogic}
          setSwapLogic={setSwapLogic}
          gasAmount={1000000000000000n}
          nativeCurrency={{
            address: zeroAddress,
            ...selectedChain.nativeCurrency,
          }}
        />
      </div>
    </div>
  )
}
