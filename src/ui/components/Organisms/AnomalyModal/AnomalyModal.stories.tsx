import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { AnomalyModal } from './AnomalyModal'

const meta: Meta<typeof AnomalyModal> = {
  title: 'Organisms/AnomalyModal',
  component: AnomalyModal,
  tags: ['autodocs'],
  argTypes: {
    anomalyType: { control: 'select', options: ['network', 'resource', 'disk'] },
    open: { control: 'boolean' },
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
type Story = StoryObj<typeof AnomalyModal>

const mockNodeData = {
  nodeName: 'server-prod-01',
  metrics: ['CPU usage', 'Memory consumption', 'Network latency'],
}

const mockDiskData = {
  nodeName: 'storage-node-03',
  metrics: ['Disk I/O', 'Write throughput'],
}

const mockNetworkData = {
  nodeName: 'gateway-router-02',
  metrics: ['Packet loss', 'Bandwidth utilization'],
}

export const NetworkAnomaly: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <AnomalyModal
        open={open}
        onCancel={() => setOpen(false)}
        anomalyType="network"
        selectedOption="network_interface_disconnection"
        data={mockNetworkData}
      />
    )
  },
}

export const ResourceAnomaly: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <AnomalyModal
        open={open}
        onCancel={() => setOpen(false)}
        anomalyType="resource"
        selectedOption="progressive_memory_leak"
        data={mockNodeData}
      />
    )
  },
}

export const DiskAnomaly: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <AnomalyModal
        open={open}
        onCancel={() => setOpen(false)}
        anomalyType="disk"
        selectedOption="disk_fill"
        data={mockDiskData}
      />
    )
  },
}

export const RunInMinutes: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const [rangeValue, setRangeValue] = useState(30)
    return (
      <AnomalyModal
        open={open}
        onCancel={() => setOpen(false)}
        anomalyType="resource"
        selectedOption="cpu_hog"
        data={mockNodeData}
        formMode="runInMinutes"
        rangeValue={rangeValue}
        onRangeChange={setRangeValue}
      />
    )
  },
}

export const ScheduleDateTime: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const [dateValue, setDateValue] = useState<string>('')
    return (
      <AnomalyModal
        open={open}
        onCancel={() => setOpen(false)}
        anomalyType="network"
        selectedOption="full_server_reboot"
        data={mockNetworkData}
        formMode="scheduleDateTime"
        dateValue={dateValue}
        onDateChange={setDateValue}
      />
    )
  },
}

export const WithAcceptHandler: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const [acceptedMode, setAcceptedMode] = useState<string>('')
    const [acceptedPayload, setAcceptedPayload] = useState<Record<string, unknown>>({})

    const handleAccept = (mode: string, payload: Record<string, unknown>) => {
      setAcceptedMode(mode)
      setAcceptedPayload(payload)
      setOpen(false)
    }

    return (
      <div>
        <AnomalyModal
          open={open}
          onCancel={() => setOpen(false)}
          anomalyType="resource"
          selectedOption="fork_bomb"
          data={mockNodeData}
          onAccept={handleAccept}
        />
        {acceptedMode && (
          <div style={{ color: theme.colors.contentHigh, marginTop: '16px' }}>
            <p>Accepted mode: {acceptedMode}</p>
            <p>Payload: {JSON.stringify(acceptedPayload)}</p>
          </div>
        )}
      </div>
    )
  },
}
