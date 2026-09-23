import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { IocServerCard } from './IocServerCard'

const meta: Meta<typeof IocServerCard> = {
  title: 'Molecules/IocServerCard',
  component: IocServerCard,
  tags: ['autodocs'],
  argTypes: {
    iconName: { control: 'select', options: ['cpu', 'memory', 'disc', 'speedometer'] },
    background: { control: 'select', options: ['low', 'high'] },
    padding: { control: 'select', options: ['none', 'xl', 'card'] },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof IocServerCard>

export const Default: Story = {
  args: {
    title: 'IOC Server',
    subtitle: 'Pressure Sensor #1',
    iconName: 'speedometer',
    metrics: [
      { label: 'CPU', value: 89},
      { label: 'Disk', value: 93},
      { label: 'RAM', value: 41},
    ],
  },
}