import React from 'react'
import styled from 'styled-components'
import { theme } from '../../../../styles/theme'

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  length?: string
}

const StyledDivider = styled.div<DividerProps>`
  background-color: ${theme.colors.backgroundLowest};
  flex-shrink: 0;

  ${({ orientation = 'horizontal', length }) =>
    orientation === 'vertical'
      ? `
        width: 1px;
        height: ${length || '100%'};
      `
      : `
        height: 1px;
        width: ${length || '100%'};
      `}
`

export function Divider({
  orientation = 'horizontal',
  length,
}: DividerProps): React.ReactElement {
  return (
    <StyledDivider
      orientation={orientation}
      length={length}
      role="separator"
    />
  )
}