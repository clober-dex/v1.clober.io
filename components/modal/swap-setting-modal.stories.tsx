import { Meta, StoryObj } from '@storybook/react'

import '../../styles/globals.css'
import { SwapSettingModal } from './swap-setting-modal'
export default {
  title: 'SwapSettingModal',
  component: SwapSettingModal,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof SwapSettingModal>

type Story = StoryObj<typeof SwapSettingModal>

export const Default: Story = {
  args: {
    slippageInput: '1.00',
    setSlippageInput: () => {},
    partitionInput: '1',
    setPartitionInput: () => {},
  },
}
