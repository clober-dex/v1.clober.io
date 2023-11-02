import React, { useCallback, useEffect, useState } from 'react'
import {
  useAccount,
  useBalance,
  useQuery,
  useQueryClient,
  useWalletClient,
} from 'wagmi'
import { getAddress, isAddressEqual, zeroAddress } from 'viem'
import { readContracts } from '@wagmi/core'

import { approve20 } from '../utils/approve20'
import { Currency } from '../model/currency'
import { CHAIN_IDS } from '../constants/chain'
import { formatUnits } from '../utils/bigint'
import { fetchCurrencies } from '../apis/swap/currencies'
import { AGGREGATORS } from '../constants/aggregators'
import { fetchPrices } from '../apis/swap/prices'
import { Prices } from '../model/prices'
import { Balances } from '../model/balances'
import { IERC20__factory } from '../typechain'
import { fetchSwapData } from '../apis/swap/data'

import { useTransactionContext } from './transaction-context'
import { useChainContext } from './chain-context'

type SwapContext = {
  currencies: Currency[]
  prices: Prices
  balances: Balances
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
  currencies: [],
  prices: {},
  balances: {},
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

  const { address: userAddress } = useAccount()
  const { data: balance } = useBalance({ address: userAddress })
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

  const { data: currencies } = useQuery(
    ['currencies', selectedChain],
    async () => fetchCurrencies(AGGREGATORS[selectedChain.id as CHAIN_IDS]),
  )

  const { data: prices } = useQuery(
    ['prices', selectedChain],
    async () => {
      return fetchPrices(AGGREGATORS[selectedChain.id as CHAIN_IDS])
    },
    {
      refetchInterval: 10 * 1000,
      refetchOnWindowFocus: true,
    },
  )

  const { data: balances } = useQuery(
    ['balances', userAddress, balance, currencies],
    async () => {
      if (!userAddress || !currencies) {
        return {}
      }
      const uniqueCurrencies = currencies
        .filter((currency) => !isAddressEqual(currency.address, zeroAddress))
        .filter(
          (currency, index, self) =>
            self.findIndex((c) => c.address === currency.address) === index,
        )
      const results = await readContracts({
        contracts: uniqueCurrencies.map((currency) => ({
          address: currency.address,
          abi: IERC20__factory.abi,
          functionName: 'balanceOf',
          args: [userAddress],
        })),
      })
      return results.reduce(
        (acc: {}, { result }, index: number) => {
          const currency = uniqueCurrencies[index]
          return {
            ...acc,
            [getAddress(currency.address)]: result ?? 0n,
          }
        },
        {
          [zeroAddress]: balance?.value ?? 0n,
        },
      )
    },
    {
      refetchInterval: 10 * 1000,
      refetchOnWindowFocus: true,
    },
  ) as { data: Balances }

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
        currencies: currencies ?? [],
        prices: prices ?? {},
        balances: balances ?? {},
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
