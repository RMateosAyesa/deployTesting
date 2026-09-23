import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { NavItem } from './NavItem'

const meta: Meta<typeof NavItem> = {
  title: 'Molecules/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div
          style={{
            backgroundColor: theme.colors.backgroundHigh,
            padding: '20px',
            width: '280px',
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof NavItem>

export const OverviewActive: Story = {
  args: {
    item: {
      id: 'overview',
      label: 'Overview',
      iconName: 'globe',
      badge: '',
    },
    activeId: 'overview',
  },
}

export const LithiumSystem: Story = {
  args: {
    item: {
      id: 'lithium',
      label: 'Lithium System',
      iconName: 'cube',
      badge: '',
    },
    activeId: '',
  },
}

export const DataLabWithSubItems: Story = {
  args: {
    item: {
      id: 'datalab',
      label: 'Data Lab',
      iconName: 'flask',
      badge: '',
      children: [
        {
          id: 'anomaly',
          label: 'Anomaly scenarios',
          iconName: 'arrowRight',
          badge: '',
        },
        {
          id: 'sensor',
          label: 'Sensor data config',
          iconName: 'arrowRight',
          badge: '',
        },
      ],
    },
    activeId: 'sensor',
  },
}