import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/index'
import { IconAtom, icons } from './Icon'

const meta: Meta<typeof IconAtom> = {
  title: 'Atoms/Icon',
  component: IconAtom,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'select', options: icons },
    size: { control: 'select', options: ['l', 'm'] },
    color: { control: 'select', options: ['primary', 'secondary'] },
    weight: { control: 'select', options: ['regular', 'fill'] },
    isActive: { control: 'boolean' },
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
type Story = StoryObj<typeof IconAtom>

export const SizeL: Story = {
  args: {
    name: 'globe',
    size: 'l',
    color: 'primary',
  },
}

export const SizeM: Story = {
  args: {
    name: 'globe',
    size: 'm',
    color: 'primary',
  },
}

export const ColorPrimary: Story = {
  args: {
    name: 'globe',
    size: 'l',
    color: 'primary',
  },
}

export const ColorSecondary: Story = {
  args: {
    name: 'globe',
    size: 'l',
    color: 'secondary',
  },
  render: (args) => (
    <div style={{ backgroundColor: '#0A0A0A', padding: '16px', display: 'inline-block' }}>
      <IconAtom {...args} />
    </div>
  ),
}

export const Active: Story = {
  args: {
    name: 'globe',
    size: 'l',
    color: 'primary',
    isActive: true,
  },
}

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {icons.map((i) => (
        <div key={i} style={{ textAlign: 'center' }}>
          <IconAtom name={i} size="l" color="primary" />
          <p style={{ fontSize: '12px', marginTop: '4px' }}>{i}</p>
        </div>
      ))}
    </div>
  ),
}
