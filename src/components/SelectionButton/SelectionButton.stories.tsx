import { Meta, Story } from '@storybook/react/types-6-0'
import { SelectionButton, SelectionButtonProps } from '.'

export default {
  title: 'SelectionButton',
  component: SelectionButton
} as Meta

export const Default: Story<SelectionButtonProps> = args => (
  <SelectionButton {...args} />
)
Default.args = {
  variant: 'primary'
}
