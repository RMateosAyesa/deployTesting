import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Progress } from './Progress'

const meta: Meta<typeof Progress> = {
  title: 'Atoms/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    track: { control: 'select', options: ['black', 'grey'] },
    colorMode: { control: 'select', options: ['range', 'fixed'] },
    fixedColor: { control: 'color' },
    percent: { control: { type: 'range', min: 0, max: 100 } },
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
type Story = StoryObj<typeof Progress>

export const Default: Story = {
  args: {
    percent: 50,
    track: 'grey',
    colorMode: 'range',
  },
}

export const BlackTrack: Story = {
  args: {
    percent: 75,
    track: 'black',
    colorMode: 'range',
  },
}

export const GreyTrack: Story = {
  args: {
    percent: 30,
    track: 'grey',
    colorMode: 'range',
  },
}

export const FixedColor: Story = {
  args: {
    percent: 60,
    track: 'grey',
    colorMode: 'fixed',
    fixedColor: 'cpu',
  },
}

export const LowPercent: Story = {
  args: {
    percent: 20,
    track: 'grey',
    colorMode: 'range',
  },
}

export const HighPercent: Story = {
  args: {
    percent: 90,
    track: 'grey',
    colorMode: 'range',
  },
}
