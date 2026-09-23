import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { useState } from 'react'
import { theme } from '../../../../styles/theme'
import { AnomalyOption } from './AnomalyOption'

const mockModalData = {
  nodeName: 'server-prod-01',
  metrics: ['CPU usage', 'Memory consumption', 'Network latency'],
}

const meta: Meta<typeof AnomalyOption> = {
  title: 'Molecules/AnomalyOption',
  component: AnomalyOption,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['network', 'resource', 'disk'] },
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
type Story = StoryObj<typeof AnomalyOption>

export const Network: Story = {
  render: () => {
    const [, setSelected] = useState('')
    return <AnomalyOption type="network" onChange={setSelected} />
  },
}

export const ResourceConsumption: Story = {
  render: () => {
    const [, setSelected] = useState('')
    return <AnomalyOption type="resource" onChange={setSelected} />
  },
}

export const DiskIO: Story = {
  render: () => {
    const [, setSelected] = useState('')
    return <AnomalyOption type="disk" onChange={setSelected} />
  },
}

export const AllOptions: Story = {
  render: () => {
    const [, setSelectedNetwork] = useState('')
    const [, setSelectedResource] = useState('')
    const [, setSelectedDisk] = useState('')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <AnomalyOption type="network" onChange={setSelectedNetwork} />
        <AnomalyOption type="resource" onChange={setSelectedResource} />
        <AnomalyOption type="disk" onChange={setSelectedDisk} />
      </div>
    )
  },
}

export const WithModal: Story = {
  render: () => {
    const [, setSelected] = useState('')
    return (
      <AnomalyOption type="network" onChange={setSelected} modalData={mockModalData} />
    )
  },
}
