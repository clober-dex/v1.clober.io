import { Meta, StoryObj } from '@storybook/react'

import '../styles/globals.css'
import { dummyMarkets } from '../.storybook/dummy-data/market'

import OrderBook from './order-book'
export default {
  title: 'OrderBook',
  component: OrderBook,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof OrderBook>

type Story = StoryObj<typeof OrderBook>

export const Default: Story = {
  args: {
    market: dummyMarkets[0],
    availableDecimalPlacesGroups: [
      { label: '0.000001', value: 6 },
      { label: '0.00001', value: 5 },
      { label: '0.0001', value: 4 },
      { label: '0.001', value: 3 },
    ],
  },
}

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString()
}
