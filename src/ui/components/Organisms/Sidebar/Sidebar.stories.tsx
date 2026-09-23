import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Sidebar } from './Sidebar'

const meta: Meta<typeof Sidebar> = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div style={{ display: 'flex' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  args: {
    activeId: 'overview',
    items: [
      {
        id: 'overview',
        label: 'Overview',
        iconName: 'globe',
        badge: '',
      },
      {
        id: 'lithium',
        label: 'Lithium System',
        iconName: 'cube',
        badge: '',
      },
      {
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
          }
        ],
      },
    ],
  },
}