import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { DataTableRecord } from '../../Atoms/DataTable'
import { IocServerTemplate, IocServerTemplateData } from './IocServerTemplate'

jest.mock('recharts', () => ({
  Area: () => null,
  CartesianGrid: () => null,
  ComposedChart: ({ children }: { children: React.ReactNode }) => <svg>{children}</svg>,
  Legend: () => null,
  Line: () => null,
  ReferenceLine: () => null,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Tooltip: () => null,
  XAxis: () => null,
  YAxis: () => null,
}))

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

const sidebar = {
  items: [
    {
      id: 'overview',
      label: 'Overview',
      iconName: 'globe' as const,
      badge: '',
    },
    {
      id: 'lithium',
      label: 'Lithium System',
      iconName: 'cube' as const,
      badge: '',
    },
  ],
  activeId: 'lithium',
}

const columns = [
  {
    title: 'Timestamp',
    dataIndex: 'timestamp',
    key: 'timestamp',
  },
  {
    title: 'PV Name',
    dataIndex: 'pvName',
    key: 'pvName',
  },
  {
    title: 'Change',
    dataIndex: 'change',
    key: 'change',
  },
]

const tableData: DataTableRecord[] = [
  {
    key: '1',
    timestamp: '13/03/2026 - 12:59',
    pvName: 'DONES-Li:HT1:StdDev',
    change: '0.5',
  },
]

const data: IocServerTemplateData = {
  title: 'IOC Server Status',
  subtitle: 'Pressure Sensor #1',
  description: 'System Status & General State',
  helperText: 'Core system metrics that reflect the current operational state of the IOC server.',
  statusCards: [
    {
      iconName: 'radioButton',
      title: 'Restart counter',
      label: 'Value',
      value: 23,
      unit: 'Restarts',
    },
  ],
  heartbeatChart: {
    title: 'Heartbeat',
    data: [true, true, false, true],
    timeLabels: ['12:50', '12:51'],
    legendLabel: 'State',
  },
  logsSection: {
    title: 'System Traceability',
    description: 'Full audit log of PV parameter modifications and IOC server lifecycle events.',
  },
  traceabilityTable: {
    title: 'Process Variable Change Log',
    actionLabel: 'Export CSV',
    columns,
    data: tableData,
  },
  eventTable: {
    title: 'IOC Lifecycle Events',
    actionLabel: 'Export CSV',
    columns: [
      {
        title: 'Timestamp',
        dataIndex: 'timestamp',
        key: 'timestamp',
      },
      {
        title: 'Event',
        dataIndex: 'event',
        key: 'event',
      },
    ],
    data: [
      {
        key: '1',
        timestamp: '01/04/2026 - 8:00',
        event: 'Start',
      },
    ],
  },
  chartsSection: {
    title: 'Performance metrics',
    description: 'These metrics reflect how the current configuration affects system performance and data processing behavior.',
  },
  performanceCharts: [
    {
      title: 'CPU performance (%)',
      metric: 'cpu',
      data: [
        { time: '12:59', value: 50 },
      ],
    },
  ],
  scanLatencySection: {
    title: 'Scan latency',
    description: 'Scan latency represents the time required for the IOC server to acquire, process, and publish sensor data.',
  },
  scanLatencyChart: {
    title: 'Data acquisition latency (ms)',
    metric: 'scanLatency',
    data: [
      { time: '12:59', value: 50 },
      { time: '13:00', value: 120 },
    ],
  },
}

describe('Templates/IocServerTemplate', () => {
  describe('Render', () => {
    it('renders base template and IOC server content', () => {
      renderWithTheme(<IocServerTemplate sidebar={sidebar} data={data} />)

      expect(screen.getByAltText('Optima DONES')).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'IOC Server Status' })).toBeInTheDocument()
      expect(screen.getByText('Pressure Sensor #1')).toBeInTheDocument()
      expect(screen.getByText('Restart counter')).toBeInTheDocument()
      expect(screen.getByText('Heartbeat')).toBeInTheDocument()
      expect(screen.getByText('System Traceability')).toBeInTheDocument()
      expect(screen.getByText('Process Variable Change Log')).toBeInTheDocument()
      expect(screen.getByText('DONES-Li:HT1:StdDev')).toBeInTheDocument()
      expect(screen.getByText('Performance metrics')).toBeInTheDocument()
      expect(screen.getByText('Scan latency')).toBeInTheDocument()
    })
  })
})
