import { Meta, StoryObj } from '@storybook/react'
import '../../styles/globals.css'

import CheckIcon from './check-icon'

export default {
  title: 'CheckIcon',
  component: CheckIcon,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof CheckIcon>

type Story = StoryObj<typeof CheckIcon>

export const Default: Story = {
  args: {
    checked: false,
    onCheck: () => {},
    text: 'Post Only',
  },
}

export const Checked: Story = {
  args: {
    checked: true,
    onCheck: () => {},
    text: 'Post Only',
  },
}
