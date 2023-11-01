import React, { useState } from 'react'
import { parseUnits } from 'viem'
import { useAccount, useFeeData, useQuery } from 'wagmi'

import { SwapForm } from '../components/form/swap-form'
import { Currency } from '../model/currency'
import { useCurrencyContext } from '../contexts/currency-context'
import { useChainContext } from '../contexts/chain-context'
import { fetchQuotes } from '../apis/quotes'
import { formatUnits } from '../utils/bigint'

export const SwapContainer = () => {
  const { data: feeData } = useFeeData()
  const { address: userAddress } = useAccount()
  const { selectedChain } = useChainContext()
  const { balances, currencies, prices } = useCurrencyContext()

  const [inputCurrency, setInputCurrency] = useState<Currency | undefined>(
    undefined,
  )
  const [inputCurrencyAmount, setInputCurrencyAmount] = useState('')
  const [showInputCurrencySelect, setShowInputCurrencySelect] = useState(false)

  const [outputCurrency, setOutputCurrency] = useState<Currency | undefined>(
    undefined,
  )
  const [showOutputCurrencySelect, setShowOutputCurrencySelect] =
    useState(false)

  const [slippageInput, setSlippageInput] = useState('1')
  const [partitionInput, setPartitionInput] = useState('1')
  const [swapLogic, setSwapLogic] = useState<'GasEfficient' | 'MaximizeReturn'>(
    'MaximizeReturn',
  )

  const { data } = useQuery(
    [
      'quotes',
      inputCurrency,
      outputCurrency,
      inputCurrencyAmount,
      slippageInput,
      userAddress,
      selectedChain,
      swapLogic, // todo: remove
    ],
    async () => {
      if (
        feeData &&
        feeData.gasPrice &&
        inputCurrency &&
        outputCurrency &&
        parseUnits(inputCurrencyAmount, inputCurrency?.decimals ?? 18) > 0n
      ) {
        return fetchQuotes({
          chainId: selectedChain.id,
          amountIn: parseUnits(
            inputCurrencyAmount,
            inputCurrency?.decimals ?? 18,
          ),
          inputCurrency,
          outputCurrency,
          slippageLimitPercent: parseFloat(slippageInput),
          userAddress,
          gasPrice: feeData.gasPrice,
        })
      }
    },
  )

  return (
    <div className="flex flex-col w-fit max-sm:w-full mb-4 sm:mb-6">
      <div className="flex flex-col rounded-2xl bg-gray-900 p-6 sm:w-[480px]">
        <SwapForm
          currencies={currencies}
          balances={balances}
          prices={prices}
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
          outputCurrencyAmount={formatUnits(
            data?.amountOut ?? 0n,
            outputCurrency?.decimals ?? 18,
          ).toString()}
          slippageInput={slippageInput}
          setSlippageInput={setSlippageInput}
          partitionInput={partitionInput}
          setPartitionInput={setPartitionInput}
          swapLogic={swapLogic}
          setSwapLogic={setSwapLogic}
          gasEstimateValue={data?.gasEstimateValue ?? 0}
        />
      </div>
    </div>
  )
}
