import React, { useEffect, useMemo, useRef, useState } from 'react'
import { zeroAddress } from 'viem'
import BigNumber from 'bignumber.js'

import { Currency } from '../model/currency'
import LimitSettingForm from '../components/form/limit-setting-form'
import { LimitForm } from '../components/form/limit-form'
import OrderBook from '../components/order-book'
import OpenOrderList from '../components/open-order-list'
import { useChainContext } from '../contexts/chain-context'
import { useMarketContext } from '../contexts/market-context'
import { formatUnits, min } from '../utils/bigint'
import { getPriceDecimals, PRICE_DECIMAL } from '../utils/prices'
import { textStyles } from '../themes/text-styles'
import { toPlacesString } from '../utils/bignumber'
import { useCurrencyContext } from '../contexts/currency-context'
import { Decimals, DEFAULT_DECIMAL_PLACES_GROUPS } from '../model/decimals'
import { useOpenOrderContext } from '../contexts/open-order-context'

export const LimitContainer = () => {
  const { selectedChain } = useChainContext()
  const { markets, selectedMarket, setSelectedMarket } = useMarketContext()
  const { balances } = useCurrencyContext()
  const { openOrders } = useOpenOrderContext()

  const [isBid, setIsBid] = useState(true)
  // const [showOrderBook, setShowOrderBook] = useState(true)
  const showOrderBook = true
  const [selectMode, setSelectMode] = useState<'none' | 'settings'>('none')

  const [inputCurrency, setInputCurrency] = useState<Currency | undefined>(
    selectedMarket?.quoteToken,
  )
  const [inputCurrencyAmount, setInputCurrencyAmount] = useState('')
  const [showInputCurrencySelect, setShowInputCurrencySelect] = useState(false)

  const [outputCurrency, setOutputCurrency] = useState<Currency | undefined>(
    selectedMarket?.baseToken,
  )
  const [outputCurrencyAmount, setOutputCurrencyAmount] = useState('')
  const [showOutputCurrencySelect, setShowOutputCurrencySelect] =
    useState(false)
  const [claimBounty, setClaimBounty] = useState(
    formatUnits(
      selectedChain.defaultGasPrice ?? 0n,
      selectedChain.nativeCurrency.decimals,
    ),
  )
  const [selectedDecimalPlaces, setSelectedDecimalPlaces] = useState<
    Decimals | undefined
  >(undefined)
  const [priceInput, setPriceInput] = useState('')
  const [depthClickedIndex, setDepthClickedIndex] = useState<
    { isBid: boolean; index: number } | undefined
  >(undefined)

  const availableDecimalPlacesGroups = useMemo(() => {
    const availableDecimalPlacesGroups = selectedMarket
      ? (Array.from(Array(4).keys())
          .map((i) => {
            const minPrice = min(
              selectedMarket.bids.sort(
                (a, b) => Number(b.priceIndex) - Number(a.priceIndex),
              )[0]?.price ?? 0n,
              selectedMarket.asks.sort(
                (a, b) => Number(a.priceIndex) - Number(b.priceIndex),
              )[0]?.price ?? 0n,
            )
            const decimalPlaces = getPriceDecimals(
              minPrice,
              selectedMarket.d,
              selectedMarket.r,
            )
            const label = (10 ** (i - decimalPlaces)).toFixed(
              Math.max(decimalPlaces - i, 0),
            )
            if (new BigNumber(formatUnits(minPrice, PRICE_DECIMAL)).gt(label)) {
              return {
                label,
                value: decimalPlaces - i,
              }
            }
          })
          .filter((x) => x) as Decimals[])
      : []
    return availableDecimalPlacesGroups.length > 0
      ? availableDecimalPlacesGroups
      : DEFAULT_DECIMAL_PLACES_GROUPS
  }, [selectedMarket])

  const [bids, asks] = useMemo(
    () =>
      selectedMarket && selectedDecimalPlaces
        ? [
            Array.from(
              [...selectedMarket.bids.map((depth) => ({ ...depth }))]
                .sort((a, b) => Number(b.priceIndex) - Number(a.priceIndex))
                .map((x) => {
                  return {
                    price: formatUnits(x.price, PRICE_DECIMAL),
                    size: new BigNumber(
                      formatUnits(
                        x.baseAmount,
                        selectedMarket.quoteToken.decimals,
                      ),
                    ),
                  }
                })
                .reduce((prev, curr) => {
                  const price = new BigNumber(curr.price)
                  const key = new BigNumber(price).toFixed(
                    selectedDecimalPlaces.value,
                    BigNumber.ROUND_FLOOR,
                  )
                  prev.set(
                    key,
                    prev.has(key)
                      ? {
                          price: key,
                          size: curr.size.plus(prev.get(key)?.size || 0),
                        }
                      : {
                          price: key,
                          size: curr.size,
                        },
                  )
                  return prev
                }, new Map<string, { price: string; size: BigNumber }>())
                .values(),
            ).map((x) => {
              return {
                price: x.price,
                size: x.size.toString(),
              }
            }),
            Array.from(
              [...selectedMarket.asks.map((depth) => ({ ...depth }))]
                .sort((a, b) => Number(a.priceIndex) - Number(b.priceIndex))
                .map((x) => {
                  return {
                    price: formatUnits(x.price, PRICE_DECIMAL),
                    size: new BigNumber(
                      formatUnits(
                        x.baseAmount,
                        selectedMarket.baseToken.decimals,
                      ),
                    ),
                  }
                })
                .reduce((prev, curr) => {
                  const price = new BigNumber(curr.price)
                  const key = new BigNumber(price).toFixed(
                    selectedDecimalPlaces.value,
                    BigNumber.ROUND_FLOOR,
                  )
                  prev.set(
                    key,
                    prev.has(key)
                      ? {
                          price: key,
                          size: curr.size.plus(prev.get(key)?.size || 0),
                        }
                      : {
                          price: key,
                          size: curr.size,
                        },
                  )
                  return prev
                }, new Map<string, { price: string; size: BigNumber }>())
                .values(),
            ).map((x) => {
              return {
                price: x.price,
                size: x.size.toString(),
              }
            }),
          ]
        : [[], []],
    [selectedDecimalPlaces, selectedMarket],
  )

  // selectedChain && selectedMarket
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
      setInputCurrencyAmount('')

      setOutputCurrency(selectedMarket.baseToken)
      setOutputCurrencyAmount('')

      setSelectedDecimalPlaces(availableDecimalPlacesGroups[0])
    }
  }, [availableDecimalPlacesGroups, selectedChain, selectedMarket])

  // isBid && depthClickedIndex
  useEffect(() => {
    if (!selectedMarket) {
      return
    }

    if (
      depthClickedIndex &&
      ((depthClickedIndex.isBid && bids[depthClickedIndex.index]) ||
        (!depthClickedIndex.isBid && asks[depthClickedIndex.index]))
    ) {
      setPriceInput(
        depthClickedIndex.isBid
          ? bids[depthClickedIndex.index].price
          : asks[depthClickedIndex.index].price,
      )
      setInputCurrency(
        depthClickedIndex.isBid
          ? selectedMarket.baseToken
          : selectedMarket.quoteToken,
      )
      setOutputCurrency(
        depthClickedIndex.isBid
          ? selectedMarket.quoteToken
          : selectedMarket.baseToken,
      )

      const accumulatedSInputCurrencyAmount = depthClickedIndex.isBid
        ? bids
            .reduce(
              (prev, curr, index) =>
                index <= depthClickedIndex.index ? prev.plus(curr.size) : prev,
              new BigNumber(0),
            )
            .toString()
        : asks
            .reduce(
              (prev, curr, index) =>
                index <= depthClickedIndex.index
                  ? prev.plus(new BigNumber(curr.size).times(curr.price))
                  : prev,
              new BigNumber(0),
            )
            .toString()
      setInputCurrencyAmount(accumulatedSInputCurrencyAmount)
    } else {
      if (isBid) {
        setPriceInput(
          toPlacesString(
            formatUnits(selectedMarket.asks[0]?.price ?? 0n, PRICE_DECIMAL),
          ),
        )
        setInputCurrency(selectedMarket.quoteToken)
        setInputCurrencyAmount('')

        setOutputCurrency(selectedMarket.baseToken)
        setOutputCurrencyAmount('')
      } else {
        setPriceInput(
          toPlacesString(
            formatUnits(selectedMarket.bids[0]?.price ?? 0n, PRICE_DECIMAL),
          ),
        )
        setInputCurrency(selectedMarket.baseToken)
        setInputCurrencyAmount('')

        setOutputCurrency(selectedMarket.quoteToken)
        setOutputCurrencyAmount('')
      }
    }
  }, [asks, bids, depthClickedIndex, isBid, selectedMarket])

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

    if (previousValues.current.priceInput !== priceInput) {
      const outputCurrencyAmount = new BigNumber(inputCurrencyAmount)
        .div(priceInput)
        .toString()
      setOutputCurrencyAmount(outputCurrencyAmount)
      previousValues.current = {
        priceInput,
        outputCurrencyAmount,
        inputCurrencyAmount,
      }
    } else if (
      previousValues.current.outputCurrencyAmount !== outputCurrencyAmount
    ) {
      const expectedPriceInput = new BigNumber(inputCurrencyAmount).div(
        outputCurrencyAmount,
      )
      const priceInput =
        expectedPriceInput.isNaN() || !expectedPriceInput.isFinite()
          ? previousValues.current.priceInput
          : expectedPriceInput.toString()
      setPriceInput(priceInput)
      previousValues.current = {
        priceInput,
        outputCurrencyAmount,
        inputCurrencyAmount,
      }
    } else if (
      previousValues.current.inputCurrencyAmount !== inputCurrencyAmount
    ) {
      const outputCurrencyAmount = new BigNumber(inputCurrencyAmount)
        .div(priceInput)
        .toString()
      setOutputCurrencyAmount(outputCurrencyAmount)
      previousValues.current = {
        priceInput,
        outputCurrencyAmount,
        inputCurrencyAmount,
      }
    }
  }, [priceInput, inputCurrencyAmount, outputCurrencyAmount])

  return (
    <div className="flex flex-col w-fit mb-4 sm:mb-6">
      <div className="flex flex-col w-full lg:flex-row gap-4">
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
              swapInputCurrencyAndOutputCurrency={() => {
                setIsBid((prevState) =>
                  depthClickedIndex ? depthClickedIndex.isBid : !prevState,
                )
                setDepthClickedIndex(undefined)
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
