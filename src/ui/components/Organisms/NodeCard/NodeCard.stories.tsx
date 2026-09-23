import type { Meta, StoryObj } from '@storybook/react-vite'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { NodeCard } from './NodeCard'

const StoryPreview = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundHigh};
  padding: ${({ theme }) => theme.spacing.md};
  width: 100%;
  box-sizing: border-box;
  overflow: visible;
`

const meta: Meta<typeof NodeCard> = {
  title: 'Organisms/NodeCard',
  component: NodeCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Node card organism that displays node information, IOC instances, active anomalies and an anomaly action panel.

The \`data\` prop accepts:

- \`title\`: node title.
- \`iocInstances\`: IOC instance names shown in the count badge tooltip.
- \`activeAnomaly\`: optional active anomaly row data.
`,
      },
    },
  },
  argTypes: {
    data: {
      control: 'object',
      description: 'Node card data.',
      table: {
        type: {
          summary: 'NodeCardData',
        },
      },
    },
    actionPanelTitle: {
      control: 'text',
      description: 'Accordion title for the anomaly action panel.',
    },
    defaultActionPanelOpen: {
      control: 'boolean',
      description: 'Opens the action panel by default.',
    },
    onAnomalyOptionChange: {
      action: 'anomaly option changed',
      description: 'Callback fired when an anomaly option is selected.',
    },
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
type Story = StoryObj<typeof NodeCard>

export const Default: Story = {
  args: {
    data: {
      title: 'Host Server — Node 01',
      iocInstances: ['IOC-Temp-01', 'IOC-Press-02', 'IOC-Elec-01'],
    },
  },
  render: (args) => (
    <StoryPreview>
      <NodeCard {...args} />
    </StoryPreview>
  ),
}

export const WithActiveAnomaly: Story = {
  args: {
    data: {
      title: 'Host Server — Node 01',
      iocInstances: ['IOC-Temp-01', 'IOC-Press-02', 'IOC-Elec-01'],
      activeAnomaly: {
        type: 'network',
        optionValue: 'ioc_service_restart',
        status: 'running',
      },
    },
  },
  render: (args) => (
    <StoryPreview>
      <NodeCard {...args} />
    </StoryPreview>
  ),
}

export const OpenActionPanel: Story = {
  args: {
    data: {
      title: 'Host Server — Node 01',
      iocInstances: ['IOC-Temp-01', 'IOC-Press-02', 'IOC-Elec-01'],
    },
    defaultActionPanelOpen: true,
  },
  render: (args) => (
    <StoryPreview>
      <NodeCard {...args} />
    </StoryPreview>
  ),
}
