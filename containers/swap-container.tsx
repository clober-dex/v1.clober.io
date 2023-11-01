import React, { useState } from 'react'
import { parseUnits } from 'viem'
import { useAccount, useFeeData, useQuery } from 'wagmi'
import { polygonZkEvm } from 'wagmi/chains'

import { SwapForm } from '../components/form/swap-form'
import { Currency } from '../model/currency'
import { useCurrencyContext } from '../contexts/currency-context'
import { useChainContext } from '../contexts/chain-context'
import { fetchQuotes } from '../apis/quotes'
import { formatUnits } from '../utils/bigint'
import OdosPathVizViewer from '../components/odos-pathviz-viewer'
import { useSwapContext } from '../contexts/swap-context'

export const SwapContainer = () => {
  const { swap, swapClober } = useSwapContext()
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
          gasEffectiveMode: swapLogic === 'GasEfficient',
        })
      }
    },
  )

  return (
    <div className="flex flex-col w-fit mb-4 sm:mb-6">
      <div className="flex flex-col w-full lg:flex-row gap-4">
        <div className="flex flex-col rounded-2xl bg-gray-900 p-6 sm:w-[528px] lg:w-[480px]">
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
            swapLogic={swapLogic}
            setSwapLogic={setSwapLogic}
            gasEstimateValue={data?.gasEstimateValue ?? 0}
            actionButtonProps={{
              disabled:
                !userAddress ||
                !inputCurrency ||
                !outputCurrency ||
                !inputCurrencyAmount ||
                !data,
              onClick: async () => {
                if (
                  !userAddress ||
                  !inputCurrency ||
                  !outputCurrency ||
                  !inputCurrencyAmount ||
                  !data
                ) {
                  return
                }
                // TODO remove it
                if (selectedChain.id === polygonZkEvm.id && data.amountOut) {
                  await swapClober(
                    inputCurrency,
                    outputCurrency,
                    parseUnits(
                      inputCurrencyAmount,
                      inputCurrency?.decimals ?? 18,
                    ),
                    parseFloat(slippageInput),
                    swapLogic === 'GasEfficient',
                  )
                  return
                } else if (!data.pathId) {
                  return
                }
                await swap(
                  inputCurrency,
                  parseUnits(
                    inputCurrencyAmount,
                    inputCurrency?.decimals ?? 18,
                  ),
                  data.pathId,
                )
              },
              text: 'Swap',
            }}
          />
        </div>
        {/* TODO: remove this */}
        {selectedChain.id !== polygonZkEvm.id ? (
          <div className="flex flex-col rounded-2xl bg-gray-900 p-6">
            <OdosPathVizViewer pathVizData={data?.pathViz} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
