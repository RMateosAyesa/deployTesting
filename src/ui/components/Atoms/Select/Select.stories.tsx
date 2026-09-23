import type { Meta, StoryObj } from '@storybook/react-vite'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Select } from './Select'

const Background = styled.div`
  background-color: ${theme.colors.backgroundHigh};
  padding: 24px;
`

const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    variant: { control: 'select', options: ['standard', 'minimalist', 'minimalistSmall'] },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Background>
          <Story />
        </Background>
      </ThemeProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Select>

const options = [
  { value: 'option1', label: 'Opción 1' },
  { value: 'option2', label: 'Opción 2' },
  { value: 'option3', label: 'Opción 3' },
  { value: 'option4', label: 'Opción 4' },
]

export const Default: Story = {
  args: {
    placeholder: 'Selecciona una opción',
    options,
  },
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'option2',
    options,
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Selecciona una opción',
    options,
    disabled: true,
  },
}

export const FullWidth: Story = {
  args: {
    placeholder: 'Selecciona una opción',
    options,
    fullWidth: true,
  },
}

export const Minimalist: Story = {
  args: {
    placeholder: 'Selecciona una opción',
    options,
    variant: 'minimalist',
  },
}

export const MinimalistSmall: Story = {
  args: {
    placeholder: 'Selecciona una opción',
    options,
    variant: 'minimalistSmall',
  },
}