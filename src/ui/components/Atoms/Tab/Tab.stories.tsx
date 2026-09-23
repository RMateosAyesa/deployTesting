import type { Meta, StoryObj } from '@storybook/react-vite'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Tab } from './Tab'
import { IconAtom } from '../Icon'

const Background = styled.div`
  background-color: ${theme.colors.backgroundHigh};
  padding: 24px;
`

const meta: Meta<typeof Tab> = {
  title: 'Atoms/Tab',
  component: Tab,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['default', 'small'] },
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
type Story = StoryObj<typeof Tab>

const items = [
  { key: '1', label: 'Minutes', children: 'Contenido del Tab 1' },
  { key: '2', label: 'Hourly', children: 'Contenido del Tab 2' },
  { key: '3', label: 'Daily', children: 'Contenido del Tab 3' },
]

const itemsWithIcon = [
  { key: '1', label: 'Inlet Temp.', icon: <IconAtom name="thermometer" size="l" color="secondary" />, children: 'Contenido de Inicio' },
  { key: '2', label: 'Inlet Pressure', icon: <IconAtom name="thermometer" size="l" color="secondary" />, children: 'Contenido de Perfil' },
  { key: '3', label: 'Outlet Temp.', icon: <IconAtom name="thermometer" size="l" color="secondary" />, children: 'Contenido de Ajustes' },
]

export const WithIcon: Story = {
  args: {
    items: itemsWithIcon,
    defaultActiveKey: '1',
  },
}

export const Small: Story = {
  args: {
    items,
    size: 'small',
    defaultActiveKey: '1',
  },
}
