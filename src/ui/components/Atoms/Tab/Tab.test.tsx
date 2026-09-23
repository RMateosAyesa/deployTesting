import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Tab, TabItem } from './Tab'
import { IconAtom } from '../Icon'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('Atoms/Tab', () => {
  describe('Render', () => {
    it('renders tabs with items', () => {
      const items: TabItem[] = [
        { key: '1', label: 'Tab 1', children: 'Contenido 1' },
        { key: '2', label: 'Tab 2', children: 'Contenido 2' },
      ]
      renderWithTheme(<Tab items={items} defaultActiveKey="1" />)
      expect(screen.getByText('Tab 1')).toBeInTheDocument()
      expect(screen.getByText('Tab 2')).toBeInTheDocument()
    })

    it('renders tab with icon', () => {
      const items: TabItem[] = [
        { 
          key: '1', 
          label: 'Tab with Icon', 
          icon: <IconAtom name="thermometer" size="l" color="secondary" />,
          children: 'Contenido' 
        },
      ]
      renderWithTheme(<Tab items={items} defaultActiveKey="1" />)
      expect(screen.getByText('Tab with Icon')).toBeInTheDocument()
      expect(document.querySelector('svg')).toBeInTheDocument()
    })

  })
})
