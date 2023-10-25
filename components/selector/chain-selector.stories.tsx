import { Meta, StoryObj } from '@storybook/react'

import '../../styles/globals.css'
import { arbitrum, base, fantom, mainnet, polygon } from '@wagmi/chains'

import ChainSelector from './chain-selector'

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
    chain: mainnet,
    setChain: () => {},
    chains: [mainnet, polygon, arbitrum, base, fantom],
    switchNetwork: () => {},
  },
}
