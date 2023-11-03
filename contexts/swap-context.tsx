import React, { useCallback, useEffect, useState } from 'react'
import { useQueryClient, useWalletClient } from 'wagmi'
import { isAddressEqual, zeroAddress } from 'viem'

import { approve20 } from '../utils/approve20'
import { Currency } from '../model/currency'
import { CHAIN_IDS } from '../constants/chain'
import { formatUnits } from '../utils/bigint'
import { AGGREGATORS } from '../constants/aggregators'
import { fetchSwapData } from '../apis/swap/data'

import { useTransactionContext } from './transaction-context'
import { useChainContext } from './chain-context'

type SwapContext = {
  swap: (
    inputCurrency: Currency,
    amountIn: bigint,
    outputCurrency: Currency,
    slippageLimitPercent: number,
    gasPrice: bigint,
    userAddress: `0x${string}`,
  ) => Promise<void>
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
  swap: () => Promise.resolve(),
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
  const queryClient = useQueryClient()

  const { selectedChain } = useChainContext()
  const { data: walletClient } = useWalletClient()
  const { setConfirmation } = useTransactionContext()

  const [inputCurrency, setInputCurrency] = useState<Currency | undefined>(
    undefined,
  )
  const [inputCurrencyAmount, setInputCurrencyAmount] = useState('')
  const [outputCurrency, setOutputCurrency] = useState<Currency | undefined>(
    undefined,
  )
  const [slippageInput, setSlippageInput] = useState('1')

  const swap = useCallback(
    async (
      inputCurrency: Currency,
      amountIn: bigint,
      outputCurrency: Currency,
      slippageLimitPercent: number,
      gasPrice: bigint,
      userAddress: `0x${string}`,
    ) => {
      if (!walletClient) {
        return
      }

      try {
        setConfirmation({
          title: 'Swap',
          body: 'Please confirm in your wallet.',
          fields: [
            {
              currency: inputCurrency,
              label: inputCurrency.symbol,
              value: formatUnits(amountIn, inputCurrency.decimals),
            },
          ],
        })

        const transaction = await fetchSwapData(
          AGGREGATORS[selectedChain.id as CHAIN_IDS],
          inputCurrency,
          amountIn,
          outputCurrency,
          slippageLimitPercent,
          gasPrice,
          userAddress,
        )

        if (!isAddressEqual(inputCurrency.address, zeroAddress)) {
          setConfirmation({
            title: 'Approve',
            body: 'Please confirm in your wallet.',
            fields: [
              {
                currency: inputCurrency,
                label: inputCurrency.symbol,
                value: formatUnits(amountIn, inputCurrency.decimals),
              },
            ],
          })
          await approve20(
            selectedChain.id,
            walletClient,
            inputCurrency,
            userAddress,
            transaction.to,
            amountIn,
          )
        }

        setConfirmation({
          title: 'Swap',
          body: 'Please confirm in your wallet.',
          fields: [
            {
              currency: inputCurrency,
              label: inputCurrency.symbol,
              value: formatUnits(amountIn, inputCurrency.decimals),
            },
          ],
        })
        await walletClient.sendTransaction({
          data: transaction.data,
          to: transaction.to,
          value: transaction.value,
          gas: transaction.gas,
        })
      } catch (e) {
        console.error(e)
      } finally {
        await queryClient.invalidateQueries(['balances'])
        setConfirmation(undefined)
      }
    },
    [walletClient, selectedChain.id, setConfirmation, queryClient],
  )

  useEffect(() => {
    setInputCurrency(undefined)
    setInputCurrencyAmount('')
    setOutputCurrency(undefined)
  }, [selectedChain])

  return (
    <Context.Provider
      value={{
        swap,
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
