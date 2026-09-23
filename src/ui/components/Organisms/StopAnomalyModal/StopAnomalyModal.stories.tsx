import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'

import { theme } from '../../../../styles/theme'
import { StopAnomalyModal } from './StopAnomalyModal'

const meta: Meta<typeof StopAnomalyModal> = {
  title: 'Organisms/StopAnomalyModal',
  component: StopAnomalyModal,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof StopAnomalyModal>

export const Default: Story = {
  args: {
    open: true,
    onCancel: () => console.log('Cancel clicked'),
    onStop: () => console.log('Stop clicked'),
  },
}