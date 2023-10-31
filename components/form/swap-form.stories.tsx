import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import '../../styles/globals.css'

import { zeroAddress } from 'viem'

import { dummyCurrencies } from '../../.storybook/dummy-data/currencies'
import { dummyPrices } from '../../.storybook/dummy-data/prices'

import { SwapForm } from './swap-form'

export default {
  title: 'SwapForm',
  component: SwapForm,
  parameters: {
    layout: 'centered',
  },
  render: ({ ...args }) => (
    <div className="flex flex-col rounded-2xl bg-gray-900 p-6 w-full sm:w-[480px] lg:h-[480px]">
      <SwapForm {...args} />
    </div>
  ),
} as Meta<typeof SwapForm>

type Story = StoryObj<typeof SwapForm>

export const Default: Story = {
  args: {
    currencies: dummyCurrencies,
    prices: dummyPrices,
    showInputCurrencySelect: false,
    setShowInputCurrencySelect: () => {},
    inputCurrency: undefined,
    setInputCurrency: () => {},
    inputCurrencyAmount: '0.1',
    setInputCurrencyAmount: () => {},
    showOutputCurrencySelect: false,
    setShowOutputCurrencySelect: () => {},
    outputCurrency: undefined,
    setOutputCurrency: () => {},
    outputCurrencyAmount: '0.1',
    setOutputCurrencyAmount: () => {},
  },
}

export const Selected: Story = {
  args: {
    currencies: dummyCurrencies,
    prices: dummyPrices,
    showInputCurrencySelect: false,
    setShowInputCurrencySelect: () => {},
    inputCurrency: dummyCurrencies[3],
    setInputCurrency: () => {},
    inputCurrencyAmount: '1.123',
    setInputCurrencyAmount: () => {},
    availableInputCurrencyBalance: 10000000000000000000n,
    showOutputCurrencySelect: false,
    setShowOutputCurrencySelect: () => {},
    outputCurrency: dummyCurrencies[5],
    setOutputCurrency: () => {},
    outputCurrencyAmount: '2000',
    setOutputCurrencyAmount: () => {},
    availableOutputCurrencyBalance: 100000000000000000n,
    slippageInput: '1.00',
    setSlippageInput: () => {},
    partitionInput: '1',
    setPartitionInput: () => {},
    swapLogic: 'GasEfficient',
    setSwapLogic: () => {},
    gasAmount: 1000000000000000n,
    nativeCurrency: {
      address: zeroAddress,
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
}

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString()
}
