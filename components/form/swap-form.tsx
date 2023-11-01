import React from 'react'
import { isAddressEqual } from 'viem'
import BigNumber from 'bignumber.js'

import CurrencyAmountInput from '../input/currency-amount-input'
import { Currency } from '../../model/currency'
import CurrencySelect from '../selector/currency-select'
import { toPlacesString } from '../../utils/bignumber'
import { GasSvg } from '../svg/gas-svg'
import { SettingSvg } from '../svg/setting-svg'
import useDropdown from '../../hooks/useDropdown'
import { SwapSettingModal } from '../modal/swap-setting-modal'
import { ActionButton } from '../button/action-button'
import { formatDollarValue } from '../../utils/bigint'
import { Prices } from '../../model/prices'
import { Balances } from '../../model/balances'
export const SwapForm = ({
  currencies,
  balances,
  prices,
  showInputCurrencySelect,
  setShowInputCurrencySelect,
  inputCurrency,
  setInputCurrency,
  inputCurrencyAmount,
  setInputCurrencyAmount,
  availableInputCurrencyBalance,
  showOutputCurrencySelect,
  setShowOutputCurrencySelect,
  outputCurrency,
  setOutputCurrency,
  outputCurrencyAmount,
  setOutputCurrencyAmount,
  availableOutputCurrencyBalance,
  slippageInput,
  setSlippageInput,
  partitionInput,
  setPartitionInput,
  swapLogic,
  setSwapLogic,
  gasAmount,
  nativeCurrency,
}: {
  currencies: Currency[]
  balances: Balances
  prices: Prices
  showInputCurrencySelect: boolean
  setShowInputCurrencySelect: (showInputCurrencySelect: boolean) => void
  inputCurrency: Currency | undefined
  setInputCurrency: (inputCurrency: Currency | undefined) => void
  inputCurrencyAmount: string
  setInputCurrencyAmount: (inputCurrencyAmount: string) => void
  availableInputCurrencyBalance: bigint
  showOutputCurrencySelect: boolean
  setShowOutputCurrencySelect: (showOutputCurrencySelect: boolean) => void
  outputCurrency: Currency | undefined
  setOutputCurrency: (outputCurrency: Currency | undefined) => void
  outputCurrencyAmount: string
  setOutputCurrencyAmount: (outputCurrencyAmount: string) => void
  availableOutputCurrencyBalance: bigint
  slippageInput: string
  setSlippageInput: (slippageInput: string) => void
  partitionInput: string
  setPartitionInput: (partitionInput: string) => void
  swapLogic: 'GasEfficient' | 'MaximizeReturn'
  setSwapLogic: (swapLogic: 'GasEfficient' | 'MaximizeReturn') => void
  gasAmount: bigint
  nativeCurrency: Currency
}) => {
  const { showDropdown, setShowDropdown } = useDropdown()

  const exchangeRate =
    !new BigNumber(inputCurrencyAmount).isNaN() &&
    !new BigNumber(outputCurrencyAmount).isNaN()
      ? new BigNumber(outputCurrencyAmount).dividedBy(
          new BigNumber(inputCurrencyAmount),
        )
      : undefined

  return showInputCurrencySelect ? (
    <CurrencySelect
      currencies={
        outputCurrency
          ? currencies.filter(
              (currency) =>
                !isAddressEqual(currency.address, outputCurrency.address),
            )
          : currencies
      }
      balances={balances}
      prices={prices}
      onBack={() => setShowInputCurrencySelect(false)}
      onCurrencySelect={(currency) => {
        setInputCurrency(currency)
        setShowInputCurrencySelect(false)
      }}
    />
  ) : showOutputCurrencySelect ? (
    <CurrencySelect
      currencies={
        inputCurrency
          ? currencies.filter(
              (currency) =>
                !isAddressEqual(currency.address, inputCurrency.address),
            )
          : currencies
      }
      balances={balances}
      prices={prices}
      onBack={() => setShowOutputCurrencySelect(false)}
      onCurrencySelect={(currency) => {
        setOutputCurrency(currency)
        setShowOutputCurrencySelect(false)
      }}
    />
  ) : (
    <>
      <div className="flex flex-col relative gap-2 sm:gap-4 mb-3 sm:mb-4">
        <CurrencyAmountInput
          currency={inputCurrency}
          value={inputCurrencyAmount}
          onValueChange={setInputCurrencyAmount}
          availableAmount={availableInputCurrencyBalance}
          onCurrencyClick={() => setShowInputCurrencySelect(true)}
          price={inputCurrency ? prices[inputCurrency.address] : undefined}
        />
        <CurrencyAmountInput
          currency={outputCurrency}
          value={outputCurrencyAmount}
          onValueChange={setOutputCurrencyAmount}
          availableAmount={availableOutputCurrencyBalance}
          onCurrencyClick={() => setShowOutputCurrencySelect(true)}
          price={outputCurrency ? prices[outputCurrency.address] : undefined}
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex text-xs sm:text-sm text-white">
          1 {inputCurrency?.symbol ?? 'IN'} ={' '}
          {exchangeRate ? toPlacesString(exchangeRate) : '? '}
          {outputCurrency?.symbol ?? 'OUT'}
          <span className="text-gray-500">
            (~$
            {toPlacesString(
              exchangeRate && outputCurrency
                ? exchangeRate.multipliedBy(prices[outputCurrency.address] ?? 0)
                : 0,
            )}
            )
          </span>
        </div>
        <div className="flex text-xs sm:text-sm text-white">
          <GasSvg className="mr-0.5" />
          <div className="flex text-xs sm:text-sm text-white">
            {formatDollarValue(
              gasAmount,
              nativeCurrency.decimals,
              prices[nativeCurrency.address] ?? 0,
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 mb-4 h-7 gap-2">
        <button
          onClick={() => setShowDropdown(true)}
          className="flex relative items-center gap-1 text-blue-500 bg-blue-500 hover:bg-opacity-30 bg-opacity-20 rounded px-2 text-xs sm:text-sm h-6 sm:h-7 whitespace-nowrap"
        >
          <SettingSvg className="sm:w-4 sm:h-4 w-3 h-3" />
          {`${new BigNumber(slippageInput).toFixed(2)}%`}
          {showDropdown ? (
            <SwapSettingModal
              slippageInput={slippageInput}
              setSlippageInput={setSlippageInput}
              partitionInput={partitionInput}
              setPartitionInput={setPartitionInput}
            />
          ) : (
            <></>
          )}
        </button>
        <div className="flex w-full bg-gray-800 rounded">
          <button
            onClick={() => setSwapLogic('GasEfficient')}
            disabled={swapLogic === 'GasEfficient'}
            className="flex flex-1 items-center rounded justify-center disabled:text-blue-500 disabled:border-blue-500 text-gray-500 py-2 h-6 sm:h-7 text-xs sm:text-sm disabled:border bg-transparent"
          >
            Gas Efficient
          </button>
          <button
            onClick={() => setSwapLogic('MaximizeReturn')}
            disabled={swapLogic === 'MaximizeReturn'}
            className="flex flex-1 items-center rounded justify-center disabled:text-blue-500 disabled:border-blue-500 text-gray-500 py-2 h-6 sm:h-7 text-xs sm:text-sm disabled:border bg-transparent"
          >
            Max Output
          </button>
        </div>
      </div>
      <ActionButton
        disabled={false}
        onClick={() => {}}
        text={'Connect wallet'}
      />
    </>
  )
}
