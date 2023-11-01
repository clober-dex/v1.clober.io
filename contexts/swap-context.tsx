import React, { useCallback } from 'react'
import {
  useAccount,
  usePublicClient,
  useQueryClient,
  useWalletClient,
} from 'wagmi'

import { CloberSwapInput } from '../model/clober-route'
import { approve20 } from '../utils/approve20'
import { Currency } from '../model/currency'
import { OdosRouter } from '../constants/odos-router'
import { CHAIN_IDS } from '../constants/chain'
import { buildSwapCallData } from '../apis/calldata'
import { formatUnits } from '../utils/bigint'

import { useTransactionContext } from './transaction-context'
import { useChainContext } from './chain-context'

type SwapContext = {
  swap: (
    inputCurrency: Currency,
    inputCurrencyAmount: bigint,
    userAddress: `0x${string}`,
    pathId: string,
  ) => Promise<void>
  swapClober: (
    cloberSwapInput: CloberSwapInput,
    slippageLimitPercent: number,
    userAddress: `0x${string}`,
    gasLimit: bigint,
  ) => Promise<void>
}

const Context = React.createContext<SwapContext>({
  swap: () => Promise.resolve(),
  swapClober: () => Promise.resolve(),
})

export const SwapProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const queryClient = useQueryClient()

  const { address: userAddress } = useAccount()
  const { selectedChain } = useChainContext()
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()
  const { setConfirmation } = useTransactionContext()

  const swap = useCallback(
    async (
      inputCurrency: Currency,
      inputCurrencyAmount: bigint,
      userAddress: `0x${string}`,
      pathId: string,
    ) => {
      if (!walletClient) {
        return
      }

      try {
        await approve20(
          selectedChain.id,
          walletClient,
          inputCurrency,
          userAddress,
          OdosRouter[selectedChain.id as CHAIN_IDS],
          inputCurrencyAmount,
        )
        const { data, gas, value, to, nonce, gasPrice } =
          await buildSwapCallData({
            pathId,
            userAddress,
          })

        setConfirmation({
          title: 'Swap',
          body: 'Please confirm in your wallet.',
          fields: [
            {
              currency: inputCurrency,
              label: inputCurrency.symbol,
              value: formatUnits(inputCurrencyAmount, inputCurrency.decimals),
            },
          ],
        })
        await walletClient.sendTransaction({
          data,
          value,
          gas,
          gasPrice,
          to,
          nonce,
        })
      } catch (e) {
        console.error(e)
      } finally {
        await queryClient.invalidateQueries(['balances'])
        setConfirmation(undefined)
      }
    },
    [walletClient, publicClient, setConfirmation],
  )

  const swapClober = useCallback(
    async (
      cloberSwapInput: CloberSwapInput,
      slippageLimitPercent: number,
      userAddress: `0x${string}`,
      gasLimit: bigint,
    ) => {},
    [],
  )

  return (
    <Context.Provider
      value={{
        swap,
        swapClober,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useSwapContext = () => React.useContext(Context) as SwapContext
