import { Meta, StoryObj } from '@storybook/react'
import { arbitrum, base, fantom, mainnet, polygon } from 'viem/chains'

import ChainSelector from './chain-selector'
import '../../styles/globals.css'

export default {
  title: 'ChainSelector',
  component: ChainSelector,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof ChainSelector>

type Story = StoryObj<typeof ChainSelector>
export const Default: Story = {
  args: {
    chain: {
      ...mainnet,
      defaultGasPrice: 0n,
      expireIn: 0,
    },
    setChain: () => {},
    chains: [
      {
        ...mainnet,
        defaultGasPrice: 0n,
        expireIn: 0,
      },
      {
        ...polygon,
        defaultGasPrice: 0n,
        expireIn: 0,
      },
      {
        ...arbitrum,
        defaultGasPrice: 0n,
        expireIn: 0,
      },
      {
        ...base,
        defaultGasPrice: 0n,
        expireIn: 0,
      },
      {
        ...fantom,
        defaultGasPrice: 0n,
        expireIn: 0,
      },
    ],
  },
}
