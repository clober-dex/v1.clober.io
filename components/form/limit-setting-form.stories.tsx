import { Meta, StoryObj } from '@storybook/react'
import '../../styles/globals.css'

import LimitSettingForm from './limit-setting-form'

export default {
  title: 'LimitSettingForm',
  component: LimitSettingForm,
  parameters: {
    layout: 'centered',
  },
  render: ({ ...args }) => (
    <div className="flex flex-col rounded-2xl bg-gray-900 p-6 w-full sm:w-[480px] lg:h-[480px]">
      <LimitSettingForm {...args} />
    </div>
  ),
} as Meta<typeof LimitSettingForm>

type Story = StoryObj<typeof LimitSettingForm>

export const Default: Story = {
  args: {
    onBackClick: () => {},
  },
}
