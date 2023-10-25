import React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import '../styles/globals.css'
import OpenOrderList from './open-order-list'
export default {
  title: 'OpenOrderList',
  component: OpenOrderList,
  parameters: {
    layout: 'centered',
  },
  render: ({ ...args }) => (
    <div className="flex w-full justify-center mt-6">
      <OpenOrderList
        className="flex flex-col w-[448px] h-[154px] lg:grid lg:grid-cols-3 gap-1"
        {...args}
      />
    </div>
  ),
} as Meta<typeof OpenOrderList>

type Story = StoryObj<typeof OpenOrderList>

export const Default: Story = {
  args: {
    openOrders: [
      {
        baseSymbol: 'WETH',
        quoteSymbol: 'USDC',
        isBid: true,
        txHash:
          '0x6d91975935196522e7da9911412a1c2c2e509b13f19f215f7aaef820f7125734',
        timestamp: 'Sep 22, 2023 8:34 PM',
        price: 1600000000000000000000n,
        filledAmount: 120000000000000000n,
        amount: 1000000000000000000n,
        claimableAmount: 700000000000000000n,
      },
      {
        baseSymbol: 'WETH',
        quoteSymbol: 'USDC',
        isBid: false,
        txHash:
          '0x6d91975935196522e7da9911412a1c2c2e509b13f19f215f7aaef820f7125734',
        timestamp: 'Sep 22, 2023 8:34 PM',
        price: 1600000000000000000000n,
        filledAmount: 1000000000000000000n,
        amount: 1230000000000000000n,
        claimableAmount: 500000000000000000n,
      },
    ],
  },
}

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString()
}
