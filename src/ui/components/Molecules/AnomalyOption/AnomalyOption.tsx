import React, { useState } from 'react'
import { Row } from 'antd'
import styled from 'styled-components'
import { IconAtom } from '../../Atoms/Icon'
import { Text } from '../../Atoms/Text'
import { Button } from '../../Atoms/Button'
import { AnomalyModal, AnomalyModalData, AnomalyModalFormMode } from '../../Organisms/AnomalyModal'
import { theme } from '../../../../styles/theme'
import { AnomalyOptionType, anomalyConfig } from './anomaly-option.config'

export interface AnomalyOptionProps {
  type: AnomalyOptionType
  onChange: (value: string) => void
  modalData?: AnomalyModalData
  modalOpen?: boolean
  modalSelectedOption?: string
  onModalOpenChange?: (open: boolean, selectedOption: string) => void
  onAccept?: (mode: AnomalyModalFormMode, payload: Record<string, unknown>) => void
}

const Container = styled(Row)`
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const HeaderRow = styled(Row)`
  gap: ${({ theme }) => theme.spacing.sm};
`

const StyledButton = styled(Button)`
  font-size: ${({ theme }) => theme.typography.bodyMedium.fontSize};
`

const OptionsRow = styled(Row)`
  padding-left: 28px;
  gap: ${({ theme }) => theme.spacing.xs};
`

export function AnomalyOption({ type, onChange, modalData, modalOpen, modalSelectedOption, onModalOpenChange, onAccept }: AnomalyOptionProps): React.ReactElement {
  const { name: iconName, text, options } = anomalyConfig[type]
  const [internalModalOpen, setInternalModalOpen] = useState(false)
  const [internalSelectedOption, setInternalSelectedOption] = useState('')

  const isControlled = modalOpen !== undefined && onModalOpenChange !== undefined
  const isOpen = isControlled ? modalOpen : internalModalOpen
  const selectedOption = isControlled ? modalSelectedOption : internalSelectedOption

  const handleOptionClick = (value: string) => {
    onChange(value)
    if (modalData) {
      if (isControlled) {
        onModalOpenChange(true, value)
      } else {
        setInternalSelectedOption(value)
        setInternalModalOpen(true)
      }
    }
  }

  const handleModalClose = () => {
    if (isControlled) {
      onModalOpenChange(false, selectedOption || '')
    } else {
      setInternalModalOpen(false)
    }
  }

  const handleAccept = (mode: AnomalyModalFormMode, payload: Record<string, unknown>) => {
    if (onAccept) {
      onAccept(mode, payload)
    }
    handleModalClose()
  }

  return (
    <Container>
      <HeaderRow>
        <IconAtom name={iconName} size="l" color="primary" />
        <Text variant='bodyMediumBold' color={theme.colors.contentHigh}>
          {text}
        </Text>
      </HeaderRow>
      <OptionsRow>
        {options.map((option) => (
          <StyledButton
            key={option.value}
            variant="text"
            size="small"
            onClick={() => handleOptionClick(option.value)}
          >
            {option.label}
          </StyledButton>
        ))}
      </OptionsRow>
      {modalData && isOpen && selectedOption && (
        <AnomalyModal
          open={isOpen}
          onCancel={handleModalClose}
          anomalyType={type}
          selectedOption={selectedOption}
          data={modalData}
          onAccept={handleAccept}
        />
      )}
    </Container>
  )
}
