import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import '../../styles/globals.css'

import { Currency } from '../../model/currency'
import { dummyMarkets } from '../../.storybook/dummy-data/market'

import { LimitForm } from './limit-form'

export default {
  title: 'LimitForm',
  component: LimitForm,
  parameters: {
    layout: 'centered',
  },
  render: ({ ...args }) => (
    <div className="flex flex-col rounded-2xl bg-gray-900 p-6 w-full sm:w-[480px] lg:h-[480px]">
      <LimitForm {...args} />
    </div>
  ),
} as Meta<typeof LimitForm>

type Story = StoryObj<typeof LimitForm>

export const Default: Story = {
  args: {
    markets: dummyMarkets,
    selectedMarket: dummyMarkets[0],
    isBid: true,
    setIsBid: () => {},
    setSelectMode: () => {},
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
