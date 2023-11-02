import React, { useCallback } from 'react'
import {
  useAccount,
  usePublicClient,
  useQueryClient,
  useWalletClient,
} from 'wagmi'
import BigNumber from 'bignumber.js'
import { zeroAddress } from 'viem'

import { approve20 } from '../utils/approve20'
import { Currency } from '../model/currency'
import { OdosRouter } from '../constants/odos-router'
import { CHAIN_IDS } from '../constants/chain'
import { buildSwapCallData } from '../apis/calldata'
import { formatUnits } from '../utils/bigint'
import { buildSwapCloberCallData } from '../apis/clober-calldata'
import { writeContract } from '../utils/wallet'

import { useTransactionContext } from './transaction-context'
import { useChainContext } from './chain-context'

type SwapContext = {
  swap: (
    inputCurrency: Currency,
    inputCurrencyAmount: bigint,
    pathId: string,
  ) => Promise<void>
  swapClober: (
    inputCurrency: Currency,
    outputCurrency: Currency,
    inputCurrencyAmount: bigint,
    slippageLimitPercent: number,
    gasEffectiveMode: boolean,
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
      pathId: string,
    ) => {
      if (!walletClient || !userAddress) {
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
    [walletClient, userAddress, selectedChain.id, setConfirmation, queryClient],
  )

  // TODO remove it
  const swapClober = useCallback(
    async (
      inputCurrency: Currency,
      outputCurrency: Currency,
      inputCurrencyAmount: bigint,
      slippageLimitPercent: number,
      gasEffectiveMode: boolean,
    ) => {
      if (!walletClient || !userAddress) {
        return
      }

      try {
        await approve20(
          selectedChain.id,
          walletClient,
          inputCurrency,
          userAddress,
          OdosRouter[selectedChain.id as CHAIN_IDS],
          115792089237316195423570985008687907853269984665640564039457584007913129639935n,
        )

        const result = await buildSwapCloberCallData({
          inputCurrency,
          outputCurrency,
          inputCurrencyAmount,
          gasEffectiveMode,
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

        await writeContract(publicClient, walletClient, {
          address: OdosRouter[selectedChain.id as CHAIN_IDS],
          abi: [
            {
              inputs: [
                {
                  components: [
                    {
                      internalType: 'uint256',
                      name: 'inputAmount',
                      type: 'uint256',
                    },
                    {
                      components: [
                        {
                          internalType: 'uint256',
                          name: 'dexType',
                          type: 'uint256',
                        },
                        {
                          internalType: 'address[]',
                          name: 'tokens',
                          type: 'address[]',
                        },
                        {
                          internalType: 'address[]',
                          name: 'pools',
                          type: 'address[]',
                        },
                        {
                          internalType: 'bytes',
                          name: 'extraData',
                          type: 'bytes',
                        },
                      ],
                      internalType: 'struct IAggregator.SubRoute[]',
                      name: 'subRoutes',
                      type: 'tuple[]',
                    },
                  ],
                  internalType: 'struct IAggregator.Route[]',
                  name: 'routes',
                  type: 'tuple[]',
                },
                {
                  internalType: 'uint256',
                  name: 'inputAmount',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'minOutputAmount',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'expectedOutputAmount',
                  type: 'uint256',
                },
                {
                  internalType: 'address',
                  name: 'recipient',
                  type: 'address',
                },
              ],
              name: 'swap',
              outputs: [],
              stateMutability: 'payable',
              type: 'function',
            },
          ] as const,
          functionName: 'swap',
          args: [
            result.routes,
            inputCurrencyAmount,
            new BigNumber(1)
              .minus(new BigNumber(slippageLimitPercent).dividedBy(100))
              .multipliedBy(result.amountOut)
              .toFixed(0),
            result.amountOut,
            userAddress,
          ],
          gas: BigInt(
            new BigNumber(result.accGasFee)
              .multipliedBy(1.5)
              .plus(30000)
              .toFixed(0),
          ),
          value:
            inputCurrency.address === zeroAddress
              ? BigInt(result.amountIn)
              : 0n,
        })
      } catch (e) {
        console.error(e)
      } finally {
        await queryClient.invalidateQueries(['balances'])
        setConfirmation(undefined)
      }
    },
    [
      publicClient,
      queryClient,
      selectedChain.id,
      setConfirmation,
      userAddress,
      walletClient,
    ],
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
