import { Meta, StoryObj } from '@storybook/react'

import '../../styles/globals.css'

import { dummyCurrencies } from '../../.storybook/dummy-data/currencies'

import CurrencySelect from './currency-select'

export default {
  title: 'CurrencySelector',
  component: CurrencySelect,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof CurrencySelect>

type Story = StoryObj<typeof CurrencySelect>
export const Default: Story = {
  args: {
    currencies: dummyCurrencies,
    onBack: () => {},
    onCurrencySelect: () => {},
  },
}

export const Empty: Story = {
  args: {
    currencies: [],
    onBack: () => {},
    onCurrencySelect: () => {},
  },
}
