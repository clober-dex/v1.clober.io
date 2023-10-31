import { Meta, StoryObj } from '@storybook/react'

import '../styles/globals.css'
import { BlockNumberWidget } from './block-number-widget'
export default {
  title: 'BlockNumberWidget',
  component: BlockNumberWidget,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof BlockNumberWidget>

type Story = StoryObj<typeof BlockNumberWidget>

export const Default: Story = {
  args: {},
}

export const BlockNumber: Story = {
  args: {
    latestBlockNumber: 1234567890,
  },
}
