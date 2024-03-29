import React, { useEffect, useMemo, useRef, useState } from 'react'
import { getAddress, parseUnits, zeroAddress } from 'viem'
import BigNumber from 'bignumber.js'
import { useAccount } from 'wagmi'

import LimitSettingForm from '../components/form/limit-setting-form'
import { LimitForm } from '../components/form/limit-form'
import OrderBook from '../components/order-book'
import { useChainContext } from '../contexts/chain-context'
import { useMarketContext } from '../contexts/limit/market-context'
import { formatUnits } from '../utils/bigint'
import { PRICE_DECIMAL } from '../utils/prices'
import { textStyles } from '../themes/text-styles'
import { toPlacesString } from '../utils/bignumber'
import { useOpenOrderContext } from '../contexts/limit/open-order-context'
import { useLimitContext } from '../contexts/limit/limit-context'
import {
  calculateOutputCurrencyAmountString,
  calculatePriceInputString,
} from '../utils/order-book'
import { useLimitCurrencyContext } from '../contexts/limit/limit-currency-context'
import { Market } from '../model/market'
import { useLimitContractContext } from '../contexts/limit/limit-contract-context'
import { ActionButton } from '../components/button/action-button'
import { OpenOrderCard } from '../components/card/open-order-card'
import { Currency } from '../model/currency'
import { Balances } from '../model/balances'

import { ChartContainer } from './chart-container'

export const LimitContainer = () => {
  const { selectedChain } = useChainContext()
  const { markets, selectedMarket, setSelectedMarket } = useMarketContext()
  const { openOrders } = useOpenOrderContext()
  const { address: userAddress } = useAccount()
  const {
    isBid,
    setIsBid,
    selectMode,
    setSelectMode,
    inputCurrency,
    setInputCurrency,
    inputCurrencyAmount,
    setInputCurrencyAmount,
    outputCurrency,
    setOutputCurrency,
    outputCurrencyAmount,
    setOutputCurrencyAmount,
    claimBounty,
    setClaimBounty,
    isPostOnly,
    setIsPostOnly,
    selectedDecimalPlaces,
    setSelectedDecimalPlaces,
    priceInput,
    setPriceInput,
    availableDecimalPlacesGroups,
    bids,
    asks,
  } = useLimitContext()
  const { balances } = useLimitCurrencyContext()
  const { limit, claim, cancel } = useLimitContractContext()
  const { claimable, claimParamsListMap, cancelParamsList } =
    useOpenOrderContext()
  const [showOrderBook, setShowOrderBook] = useState(true)

  const [depthClickedIndex, setDepthClickedIndex] = useState<
    { isBid: boolean; index: number } | undefined
  >(undefined)

  // once
  useEffect(() => {
    setSelectedDecimalPlaces(availableDecimalPlacesGroups[0])
  }, [
    availableDecimalPlacesGroups,
    setInputCurrencyAmount,
    setSelectedDecimalPlaces,
  ])

  // When chain is changed
  useEffect(() => {
    setClaimBounty(
      formatUnits(
        selectedChain.defaultGasPrice,
        selectedChain.nativeCurrency.decimals,
      ),
    )
  }, [
    selectedChain.defaultGasPrice,
    selectedChain.nativeCurrency.decimals,
    setClaimBounty,
  ])

  // When selectedMarket is changed
  useEffect(() => {
    if (selectedMarket?.quoteToken && selectedMarket?.baseToken) {
      setInputCurrency(
        isBid ? selectedMarket.quoteToken : selectedMarket.baseToken,
      )
      setOutputCurrency(
        isBid ? selectedMarket.baseToken : selectedMarket.quoteToken,
      )
    }
  }, [
    isBid,
    selectedMarket?.baseToken,
    selectedMarket?.quoteToken,
    setInputCurrency,
    setInputCurrencyAmount,
    setOutputCurrency,
    setOutputCurrencyAmount,
  ])

  // When depth is changed
  const highestBidPrice = bids[0]?.price
  const lowestAskPrice = asks[0]?.price
  useEffect(() => {
    setDepthClickedIndex(undefined)

    setPriceInput(
      isBid
        ? toPlacesString(lowestAskPrice || highestBidPrice || '1')
        : toPlacesString(highestBidPrice || lowestAskPrice || '1'),
    )
  }, [highestBidPrice, isBid, lowestAskPrice, setPriceInput])

  // When depthClickedIndex is changed, reset the priceInput
  useEffect(() => {
    if (depthClickedIndex) {
      setPriceInput(
        depthClickedIndex.isBid
          ? bids[depthClickedIndex.index]?.price
          : asks[depthClickedIndex.index]?.price,
      )
    }
  }, [asks, bids, depthClickedIndex, setPriceInput])

  const previousValues = useRef({
    priceInput,
    outputCurrencyAmount,
    inputCurrencyAmount,
  })

  useEffect(() => {
    if (
      new BigNumber(inputCurrencyAmount).isNaN() ||
      new BigNumber(inputCurrencyAmount).isZero() ||
      !outputCurrency?.decimals
    ) {
      return
    }

    // `priceInput` is changed -> `outputCurrencyAmount` will be changed
    if (previousValues.current.priceInput !== priceInput) {
      const outputCurrencyAmount = calculateOutputCurrencyAmountString(
        isBid,
        inputCurrencyAmount,
        priceInput,
        outputCurrency.decimals,
      )
      setOutputCurrencyAmount(outputCurrencyAmount)
      previousValues.current = {
        priceInput,
        outputCurrencyAmount,
        inputCurrencyAmount,
      }
    }
    // `outputCurrencyAmount` is changed -> `priceInput` will be changed
    else if (
      previousValues.current.outputCurrencyAmount !== outputCurrencyAmount
    ) {
      const priceInput = calculatePriceInputString(
        isBid,
        inputCurrencyAmount,
        outputCurrencyAmount,
        previousValues.current.priceInput,
      )
      setPriceInput(priceInput)
      previousValues.current = {
        priceInput,
        outputCurrencyAmount,
        inputCurrencyAmount,
      }
    }
    // `inputCurrencyAmount` is changed -> `outputCurrencyAmount` will be changed
    else if (
      previousValues.current.inputCurrencyAmount !== inputCurrencyAmount
    ) {
      const outputCurrencyAmount = calculateOutputCurrencyAmountString(
        isBid,
        inputCurrencyAmount,
        priceInput,
        outputCurrency.decimals,
      )
      setOutputCurrencyAmount(outputCurrencyAmount)
      previousValues.current = {
        priceInput,
        outputCurrencyAmount,
        inputCurrencyAmount,
      }
    }
  }, [
    priceInput,
    inputCurrencyAmount,
    outputCurrencyAmount,
    isBid,
    outputCurrency?.decimals,
    setOutputCurrencyAmount,
    setPriceInput,
  ])

  const [market, amount, price] = useMemo(
    () => [
      selectedMarket
        ? Market.from(selectedMarket, selectedMarket.bids, selectedMarket.asks)
        : undefined,
      parseUnits(inputCurrencyAmount, inputCurrency?.decimals ?? 18),
      parseUnits(priceInput, PRICE_DECIMAL),
    ],
    [inputCurrency?.decimals, inputCurrencyAmount, priceInput, selectedMarket],
  )

  const [rawAmount, baseAmount, priceIndex] = useMemo(() => {
    if (!market) {
      return [0n, 0n, undefined]
    }
    const priceIndex = market.priceToIndex(price, !isBid).index
    return isBid
      ? [market.quoteToRaw(amount, true), 0n, priceIndex]
      : [0n, amount, priceIndex]
  }, [amount, isBid, market, price])

  const currencyMaps = [
    ...markets.map((market) => market.baseToken),
    ...markets.map((market) => market.quoteToken),
  ].reduce(
    (acc, currency) => ({
      ...acc,
      [getAddress(currency.address)]: currency,
    }),
    {} as { [currencyAddress in `0x${string}`]: Currency },
  )

  return (
    <div className="flex flex-col w-fit mb-4 sm:mb-6">
      <button
        className="rounded bg-blue-500 bg-opacity-20 text-blue-500 px-2 py-1 w-fit mb-3 text-xs sm:text-sm"
        onClick={() => setShowOrderBook(!showOrderBook)}
      >
        {showOrderBook ? 'View Chart' : 'View Order Book'}
      </button>
      <div className="flex flex-col w-full lg:flex-row gap-4">
        {!showOrderBook && selectedMarket ? (
          <ChartContainer selectedMarket={selectedMarket} />
        ) : (
          <></>
        )}
        {showOrderBook &&
        selectedMarket &&
        availableDecimalPlacesGroups &&
        selectedDecimalPlaces ? (
          <OrderBook
            name={`${selectedMarket.baseToken.symbol}/${selectedMarket.quoteToken.symbol}`}
            bids={bids}
            asks={asks}
            availableDecimalPlacesGroups={availableDecimalPlacesGroups}
            selectedDecimalPlaces={selectedDecimalPlaces}
            setSelectedDecimalPlaces={setSelectedDecimalPlaces}
            setDepthClickedIndex={setDepthClickedIndex}
          />
        ) : (
          <></>
        )}
        <div className="flex flex-col rounded-2xl bg-gray-900 p-6 w-[360px] sm:w-[480px] lg:h-[460px]">
          {selectMode === 'settings' ? (
            <LimitSettingForm
              isPostOnly={isPostOnly}
              setIsPostOnly={setIsPostOnly}
              nativeCurrency={{
                address: zeroAddress,
                ...selectedChain.nativeCurrency,
              }}
              claimBounty={claimBounty}
              setClaimBounty={setClaimBounty}
              onBackClick={() => setSelectMode('none')}
            />
          ) : (
            <LimitForm
              priceInput={priceInput}
              setPriceInput={setPriceInput}
              markets={markets}
              selectedMarket={selectedMarket}
              setSelectedMarket={setSelectedMarket}
              isBid={isBid}
              setSelectMode={setSelectMode}
              inputCurrency={inputCurrency}
              setInputCurrency={setInputCurrency}
              inputCurrencyAmount={inputCurrencyAmount}
              setInputCurrencyAmount={setInputCurrencyAmount}
              availableInputCurrencyBalance={
                inputCurrency
                  ? balances[inputCurrency.address] ?? 0n
                  : // +
                    // TODO fix it
                    // (claimable[inputCurrency.address] ?? 0n)
                    0n
              }
              outputCurrency={outputCurrency}
              setOutputCurrency={setOutputCurrency}
              outputCurrencyAmount={outputCurrencyAmount}
              setOutputCurrencyAmount={setOutputCurrencyAmount}
              availableOutputCurrencyBalance={
                outputCurrency
                  ? balances[outputCurrency.address] ?? 0n
                  : // +
                    // TODO fix it
                    // (claimable[outputCurrency.address] ?? 0n)
                    0n
              }
              swapInputCurrencyAndOutputCurrency={() => {
                setIsBid((prevState) =>
                  depthClickedIndex ? depthClickedIndex.isBid : !prevState,
                )
                setDepthClickedIndex(undefined)
                setInputCurrencyAmount(outputCurrencyAmount)
              }}
              actionButtonProps={{
                disabled:
                  !inputCurrency ||
                  !market ||
                  !priceIndex ||
                  !userAddress ||
                  !amount,
                onClick: async () => {
                  if (
                    !inputCurrency ||
                    !market ||
                    !priceIndex ||
                    !userAddress
                  ) {
                    return
                  }
                  await limit(
                    market,
                    userAddress,
                    priceIndex,
                    rawAmount,
                    baseAmount,
                    parseUnits(
                      claimBounty,
                      selectedChain.nativeCurrency.decimals,
                    ),
                    isPostOnly,
                    claimParamsListMap[inputCurrency.address],
                  )
                },
                text: `Limit ${isBid ? 'Bid' : 'Ask'}`,
              }}
            />
          )}
        </div>
      </div>
      <div className="flex pb-4 pt-8 px-1 sm:border-solid border-b-gray-800 border-b-[1.5px]">
        <div className="flex gap-6">
          <div
            className={`m-0 p-0 bg-transparent text-white ${textStyles.body2}`}
          >
            Open Orders
          </div>
        </div>
        <div className="flex gap-1 sm:gap-2 ml-auto h-6">
          <ActionButton
            className="w-[64px] sm:w-[120px] flex flex-1 items-center justify-center rounded bg-gray-700 hover:bg-blue-600 text-white text-xs sm:text-sm disabled:bg-gray-800 disabled:text-gray-500 h-6 sm:h-7"
            disabled={
              openOrders.filter((openOrder) => openOrder.claimableAmount > 0n)
                .length === 0
            }
            onClick={async () => {
              const [addresses, claimParamsList] = [
                Object.keys(claimParamsListMap) as `0x${string}`[],
                Object.values(claimParamsListMap).flat(),
              ]
              await claim(
                addresses.map((address) => ({
                  token: currencyMaps[address],
                  amount: claimable[address] ?? 0n,
                })),
                claimParamsList,
              )
            }}
            text={`Claim (${
              openOrders.filter((openOrder) => openOrder.claimableAmount > 0n)
                .length
            })`}
          />
          <ActionButton
            className="w-[64px] sm:w-[120px] flex flex-1 items-center justify-center rounded bg-gray-700 hover:bg-blue-600 text-white text-xs sm:text-sm disabled:bg-gray-800 disabled:text-gray-500 h-6 sm:h-7"
            disabled={openOrders.length === 0}
            onClick={async () => {
              const openOrderBalances = openOrders.reduce(
                (acc, openOrder) => ({
                  ...acc,
                  [getAddress(openOrder.inputToken.address)]:
                    (acc[getAddress(openOrder.inputToken.address)] ?? 0n) +
                    (openOrder.isBid
                      ? openOrder.quoteAmount
                      : openOrder.baseAmount),
                }),
                {} as Balances,
              )
              await cancel(
                Object.entries(openOrderBalances).map(([address, amount]) => ({
                  token: currencyMaps[getAddress(address)],
                  amount,
                })),
                cancelParamsList,
              )
            }}
            text={`Cancel (${openOrders.length})`}
          />
        </div>
      </div>
      <div className="flex w-full justify-center mt-0 sm:mt-4">
        <div className="flex flex-col w-full h-full lg:grid lg:grid-cols-3 gap-4 sm:gap-6">
          {openOrders.map((openOrder, index) => (
            <OpenOrderCard
              openOrder={openOrder}
              key={index}
              claimActionButtonProps={{
                disabled: openOrder.claimableAmount === 0n,
                onClick: async () => {
                  await claim(
                    [
                      {
                        amount: openOrder.claimableAmount,
                        token: openOrder.outputToken,
                      },
                    ],
                    [
                      {
                        market: openOrder.marketAddress,
                        orderKeys: [
                          {
                            isBid: openOrder.isBid,
                            priceIndex: openOrder.priceIndex,
                            orderIndex: openOrder.orderIndex,
                          },
                        ],
                      },
                    ],
                  )
                },
                text: 'Claim',
              }}
              cancelActionButtonProps={{
                disabled: false,
                onClick: async () => {
                  await cancel(
                    [
                      {
                        amount: openOrder.isBid
                          ? openOrder.quoteAmount
                          : openOrder.baseAmount,
                        token: openOrder.inputToken,
                      },
                    ],
                    [
                      {
                        market: openOrder.marketAddress,
                        tokenIds: [openOrder.nftId],
                      },
                    ],
                  )
                },
                text: 'Cancel',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
