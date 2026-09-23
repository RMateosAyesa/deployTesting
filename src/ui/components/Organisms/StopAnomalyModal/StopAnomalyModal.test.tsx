import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import { theme } from '../../../../styles/theme'
import { StopAnomalyModal } from './StopAnomalyModal'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  )
}

describe('Organisms/StopAnomalyModal', () => {
  it('renders modal title', () => {
    renderWithTheme(<StopAnomalyModal open />)

    expect(
      screen.getByText('Stop anomaly')
    ).toBeInTheDocument()
  })

  it('renders modal description', () => {
    renderWithTheme(<StopAnomalyModal open />)

    expect(
      screen.getByText(
        /You are about to stop this anomaly/i
      )
    ).toBeInTheDocument()
  })

  it('calls onStop when clicking stop button', () => {
    const onStop = jest.fn()

    renderWithTheme(
      <StopAnomalyModal open onStop={onStop} />
    )

    fireEvent.click(screen.getByText('Stop'))

    expect(onStop).toHaveBeenCalled()
  })

  it('calls onCancel when clicking cancel button', () => {
    const onCancel = jest.fn()

    renderWithTheme(
      <StopAnomalyModal open onCancel={onCancel} />
    )

    fireEvent.click(screen.getByText('Cancel'))

    expect(onCancel).toHaveBeenCalled()
  })
})