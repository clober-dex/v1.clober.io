import { Meta, StoryObj } from '@storybook/react'

import '../styles/globals.css'
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
    bids: [
      {
        price: '1691.4332',
        size: '7.53458',
      },
      {
        price: '1690.4332',
        size: '15.2340',
      },
      {
        price: '1689.79',
        size: '13.7123',
      },
      {
        price: '1686.79',
        size: '13.7456',
      },
      {
        price: '1680.766',
        size: '3.7143',
      },
      {
        price: '1679.766',
        size: '31.7143',
      },
      {
        price: '1670.766',
        size: '16.0043',
      },
      {
        price: '1670.766',
        size: '6.0043',
      },
      {
        price: '1670.766',
        size: '6.0043',
      },
      {
        price: '1670.766',
        size: '36.0043',
      },
      {
        price: '1670.766',
        size: '6.0043',
      },
    ],
    asks: [
      {
        price: '1700.4332',
        size: '5.667',
      },
      {
        price: '1701.4332',
        size: '5.667',
      },
      {
        price: '1704.3332',
        size: '5.667',
      },
      {
        price: '1750.4332',
        size: '15.667',
      },
      {
        price: '1760.4332',
        size: '5.667',
      },
    ],
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
