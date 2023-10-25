import { Meta, StoryObj } from '@storybook/react'

import '../../styles/globals.css'

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
    currencies: [
      {
        address: '0x0000000000000000000000000000000000000001',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
      },
      {
        address: '0x0000000000000000000000000000000000000002',
        name: 'WBTC',
        symbol: 'WBTC',
        decimals: 8,
      },
      {
        address: '0x0000000000000000000000000000000000000003',
        name: 'WETH',
        symbol: 'WETH',
        decimals: 18,
      },
      {
        address: '0x0000000000000000000000000000000000000004',
        name: 'USDT',
        symbol: 'USDT',
        decimals: 6,
      },
      {
        address: '0x0000000000000000000000000000000000000005',
        name: 'DAI',
        symbol: 'DAI',
        decimals: 18,
      },
    ],
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
