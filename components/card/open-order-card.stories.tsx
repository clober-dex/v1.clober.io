import React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import '../../styles/globals.css'
import { OpenOrderCard } from './open-order-card'

export default {
  title: 'OpenOrderCard',
  component: OpenOrderCard,
  parameters: {
    layout: 'centered',
  },
  render: ({ ...args }) => (
    <div className="flex flex-col w-[448px] h-[154px] gap-2">
      <OpenOrderCard {...args} />
    </div>
  ),
} as Meta<typeof OpenOrderCard>

type Story = StoryObj<typeof OpenOrderCard>

export const Bid: Story = {
  args: {
    openOrder: {
      baseSymbol: 'WETH',
      quoteSymbol: 'USDC',
      isBid: true,
      txHash:
        '0x6d91975935196522e7da9911412a1c2c2e509b13f19f215f7aaef820f7125734',
      timestamp: 'Sep 22, 2023 8:34 PM',
      price: 1600000000000000000000n,
      filledAmount: 1000000000000000000n,
      amount: 1000000000000000000n,
      claimableAmount: 1000000000000000000n,
    },
  },
}

export const Ask: Story = {
  args: {
    openOrder: {
      baseSymbol: 'WETH',
      quoteSymbol: 'USDC',
      isBid: false,
      txHash:
        '0x6d91975935196522e7da9911412a1c2c2e509b13f19f215f7aaef820f7125734',
      timestamp: 'Sep 22, 2023 8:34 PM',
      price: 1600000000000000000000n,
      filledAmount: 1000000000000000000n,
      amount: 1000000000000000000n,
      claimableAmount: 1000000000000000000n,
    },
  },
}

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString()
}
