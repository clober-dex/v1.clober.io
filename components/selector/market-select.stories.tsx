import { Meta, StoryObj } from '@storybook/react'

import '../../styles/globals.css'
import { dummyMarkets } from '../../.storybook/dummy-data/market'

import MarketSelect from './market-select'

export default {
  title: 'MarketSelector',
  component: MarketSelect,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof MarketSelect>

type Story = StoryObj<typeof MarketSelect>
export const Default: Story = {
  args: {
    markets: dummyMarkets,
    onBack: () => {},
    onMarketSelect: () => {},
  },
}

export const Empty: Story = {
  args: {
    markets: [],
    onBack: () => {},
    onMarketSelect: () => {},
  },
}

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString()
}
