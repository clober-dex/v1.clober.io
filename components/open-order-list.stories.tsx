import React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import '../styles/globals.css'
import { dummyCurrencies } from '../.storybook/dummy-data/currencies'

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
        className="flex flex-col w-[448px] h-[154px] gap-2"
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
        inputToken: dummyCurrencies[0],
        outputToken: dummyCurrencies[1],
        isBid: true,
        txHash:
          '0x6d91975935196522e7da9911412a1c2c2e509b13f19f215f7aaef820f7125734',
        price: 1600000000000000000000n,
        filledAmount: 120000000000000000n,
        amount: 1000000000000000000n,
        claimableAmount: 700000000000000000n,
      },
      {
        inputToken: dummyCurrencies[1],
        outputToken: dummyCurrencies[0],
        isBid: false,
        txHash:
          '0x6d91975935196522e7da9911412a1c2c2e509b13f19f215f7aaef820f7125734',
        price: 1600000000000000000000n,
        filledAmount: 1000000000000000000n,
        amount: 1230000n,
        claimableAmount: 500000000000000000n,
      },
    ],
  },
}

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString()
}
