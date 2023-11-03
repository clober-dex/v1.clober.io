import React, { useEffect, useRef, useState } from 'react'
import { zeroAddress } from 'viem'
import BigNumber from 'bignumber.js'

import LimitSettingForm from '../components/form/limit-setting-form'
import { LimitForm } from '../components/form/limit-form'
import OrderBook from '../components/order-book'
import OpenOrderList from '../components/open-order-list'
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

export const LimitContainer = () => {
  const { selectedChain } = useChainContext()
  const { markets, selectedMarket, setSelectedMarket } = useMarketContext()
  const { openOrders } = useOpenOrderContext()
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

  const [depthClickedIndex, setDepthClickedIndex] = useState<
    { isBid: boolean; index: number } | undefined
  >(undefined)

  // When selectedChain or selectedMarket or isBid is changed, reset the form
  useEffect(() => {
    setClaimBounty(
      formatUnits(
        selectedChain.defaultGasPrice ?? 0n,
        selectedChain.nativeCurrency.decimals,
      ),
    )
    setDepthClickedIndex(undefined)
    if (selectedMarket) {
      setInputCurrency(selectedMarket.quoteToken)
      setOutputCurrency(selectedMarket.baseToken)

      setSelectedDecimalPlaces(availableDecimalPlacesGroups[0])

      setPriceInput(
        isBid
          ? toPlacesString(
              formatUnits(
                selectedMarket.asks[0]?.price ??
                  selectedMarket.bids[0]?.price ??
                  0n,
                PRICE_DECIMAL,
              ),
              PRICE_DECIMAL,
            )
          : toPlacesString(
              formatUnits(
                selectedMarket.bids[0]?.price ??
                  selectedMarket.asks[0]?.price ??
                  0n,
                PRICE_DECIMAL,
              ),
              PRICE_DECIMAL,
            ),
      )
      setInputCurrency(
        isBid ? selectedMarket.quoteToken : selectedMarket.baseToken,
      )
      setOutputCurrency(
        isBid ? selectedMarket.baseToken : selectedMarket.quoteToken,
      )
    }
  }, [
    availableDecimalPlacesGroups,
    isBid,
    selectedChain.defaultGasPrice,
    selectedChain.nativeCurrency.decimals,
    selectedMarket,
    setClaimBounty,
    setInputCurrency,
    setOutputCurrency,
    setPriceInput,
    setSelectedDecimalPlaces,
  ])

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
      new BigNumber(inputCurrencyAmount).isZero()
    ) {
      return
    }

    // `priceInput` is changed -> `outputCurrencyAmount` will be changed
    if (previousValues.current.priceInput !== priceInput) {
      const outputCurrencyAmount = calculateOutputCurrencyAmountString(
        isBid,
        inputCurrencyAmount,
        priceInput,
        outputCurrency?.decimals ?? 18,
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
        outputCurrency?.decimals ?? 18,
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

  return (
    <div className="flex flex-col w-fit mb-4 sm:mb-6">
      <div className="flex flex-col w-full lg:flex-row gap-4">
        {selectedMarket &&
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
        <div className="flex flex-col rounded-2xl bg-gray-900 p-6 w-[360px] sm:w-[480px] lg:h-[480px]">
          {selectMode === 'settings' ? (
            <LimitSettingForm
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
                inputCurrency ? balances[inputCurrency.address] ?? 0n : 0n
              }
              outputCurrency={outputCurrency}
              setOutputCurrency={setOutputCurrency}
              outputCurrencyAmount={outputCurrencyAmount}
              setOutputCurrencyAmount={setOutputCurrencyAmount}
              availableOutputCurrencyBalance={
                outputCurrency ? balances[outputCurrency.address] ?? 0n : 0n
              }
              swapInputCurrencyAndOutputCurrency={() => {
                setIsBid((prevState) =>
                  depthClickedIndex ? depthClickedIndex.isBid : !prevState,
                )
                setDepthClickedIndex(undefined)
                setInputCurrencyAmount(outputCurrencyAmount)
              }}
            />
          )}
        </div>
      </div>
      <div className="flex p-4 sm:border-solid border-b-gray-800 border-b-[1.5px]">
        <div className="flex gap-6">
          <button
            className={`m-0 p-0 bg-transparent text-white ${textStyles.body2}`}
          >
            Open Orders
          </button>
        </div>
      </div>
      <div className="flex w-full justify-center mt-0 sm:mt-4">
        <OpenOrderList openOrders={openOrders} />
      </div>
    </div>
  )
}
