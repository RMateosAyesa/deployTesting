import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Text } from './Text'

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h3', 'bodyLargeBold', 'bodyLarge', 'bodyMediumBold', 'bodyMedium'],
    },
    color: { control: 'text' },
    children: { control: 'text' },
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
type Story = StoryObj<typeof Text>

export const H1: Story = {
  args: {
    variant: 'h1',
    children: 'Network interface disconnection ',
  },
}

export const H3: Story = {
  args: {
    variant: 'h3',
    children: 'Lithium Server Overview',
  },
}

export const H5: Story = {
  args: {
    variant: 'h5',
    children: 'Host Server — Node 01',
  },
}

export const BodyLargeBold: Story = {
  args: {
    variant: 'bodyLargeBold',
    children: 'Host Server — Node 01',
  },
}

export const BodyLarge: Story = {
  args: {
    variant: 'bodyLarge',
    children: 'Define anomaly scenarios that affect host server performance and influence system behavior across the platform.',
  },
}

export const BodyMediumBold: Story = {
  args: {
    variant: 'bodyMediumBold',
    children: 'Affected metrics',
  },
}

export const BodyMedium: Story = {
  args: {
    variant: 'bodyMedium',
    children: 'IOC Instances: ',
  },
}

export const CustomColor: Story = {
  args: {
    variant: 'bodyMedium',
    color: '#FFBE31',
    children: 'Texto con color personalizado',
  },
}
