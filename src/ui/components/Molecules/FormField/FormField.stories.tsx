import type { Meta, StoryObj } from '@storybook/react-vite'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { FormField } from './FormField'

const Background = styled.div`
  display: grid;
  width: 360px;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.backgroundHigh};
`

const meta: Meta<typeof FormField> = {
  title: 'Molecules/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: ['input', 'select', 'datePicker'] },
    appearance: { control: 'select', options: ['default', 'sensorConfig'] },
    required: { control: 'boolean' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    fullWidth: { control: 'boolean' },
    tooltipProps: { control: 'object' },
  },
  parameters: {
    layout: 'centered',
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
type Story = StoryObj<typeof FormField>

export const Input: Story = {
  args: {
    label: 'Event name',
    variant: 'input',
    inputProps: {
      placeholder: 'Event name',
    },
  },
}

export const NumericInput: Story = {
  args: {
    label: 'Intensity',
    variant: 'input',
    helperText: 'Value from 0 to 100',
    inputProps: {
      type: 'number',
      min: 0,
      max: 100,
      placeholder: '0',
    },
  },
}

export const Select: Story = {
  args: {
    label: 'Event type',
    variant: 'select',
    selectProps: {
      placeholder: 'Select type',
      options: [
        { value: 'beam-trip', label: 'Beam trip' },
        { value: 'maintenance', label: 'Maintenance' },
        { value: 'calibration', label: 'Calibration' },
        { value: 'alert', label: 'Alert' },
      ],
    },
  },
}

export const DatePicker: Story = {
  args: {
    label: 'Start time',
    variant: 'datePicker',
    datePickerProps: {
      showTime: true,
    },
  },
}

export const WithError: Story = {
  args: {
    label: 'Chance',
    variant: 'input',
    error: 'Chance must be between 0 and 100',
    inputProps: {
      type: 'number',
      value: '130',
    },
  },
}

export const WithTooltip: Story = {
  args: {
    label: 'Intensity',
    variant: 'input',
    tooltipProps: {
      title: 'Intensity value for the event.',
    },
    inputProps: {
      type: 'number',
      value: '1.5',
    },
  },
}

export const SensorConfigAppearance: Story = {
  args: {
    label: 'Variable type',
    variant: 'select',
    appearance: 'sensorConfig',
    selectProps: {
      value: 'float64',
      options: [
        { value: 'float64', label: 'Float64' },
        { value: 'int', label: 'Int' },
        { value: 'double', label: 'Double' },
        { value: 'boolean', label: 'Boolean' },
      ],
    },
  },
}
