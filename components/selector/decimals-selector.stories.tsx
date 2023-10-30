import { Meta, StoryObj } from '@storybook/react'

import '../../styles/globals.css'

import DecimalsSelector from './decimals-selector'

export default {
  title: 'DecimalsSelector',
  component: DecimalsSelector,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof DecimalsSelector>

type Story = StoryObj<typeof DecimalsSelector>
export const Default: Story = {
  args: {
    availableDecimalPlacesGroups: [
      { label: '0.000001', value: 6 },
      { label: '0.00001', value: 5 },
      { label: '0.0001', value: 4 },
      { label: '0.001', value: 3 },
    ],
    value: { label: '0.001', value: 3 },
    onValueChange: () => {},
  },
}
