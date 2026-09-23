import React from 'react'
import { Form } from 'antd'
import styled from 'styled-components'

export interface LabelProps {
  text: string
  htmlFor?: string
  required?: boolean
}

const StyledLabel = styled(Form.Item)`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.bodyMedium.fontSize};
  font-weight: ${({ theme }) => theme.typography.bodyMedium.fontWeight};
  color: ${({ theme}) => theme.colors.contentHigh};

  .ant-form-item-label > label {
    color: inherit;
  }
`

const RequiredMark = styled.span`
  margin-left: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.semanticDanger};
  font-size: 1.1em;
`

export function Label({ text, htmlFor, required = false }: LabelProps): React.ReactElement {
  return (
    <StyledLabel
      label={(
        <>
          <span>{text}</span>
          {required && <RequiredMark aria-hidden="true">*</RequiredMark>}
        </>
      )}
      htmlFor={htmlFor}
      colon={false}
    >
    </StyledLabel>
  )
}
