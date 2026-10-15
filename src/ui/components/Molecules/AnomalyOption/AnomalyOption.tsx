import React, { useState } from 'react'
import { Row } from 'antd'
import styled from 'styled-components'
import { IconAtom } from '../../Atoms/Icon'
import { Text } from '../../Atoms/Text'
import { Button } from '../../Atoms/Button'
import { AnomalyModal, AnomalyModalData, AnomalyModalFormMode } from '../../Organisms/AnomalyModal'
import { theme } from '../../../../styles/theme'

export type AnomalyOptionType = 'network' | 'resource' | 'disk'

export interface AnomalyOptionProps {
  type: AnomalyOptionType
  onChange: (value: string) => void
  modalData?: AnomalyModalData
  modalOpen?: boolean
  modalSelectedOption?: string
  onModalOpenChange?: (open: boolean, selectedOption: string) => void
  onAccept?: (mode: AnomalyModalFormMode, payload: Record<string, unknown>) => void
}

type AnomalyOptionConfig = {
  name: 'wifiHigh' | 'memory' | 'disc'
  text: string
  options: { value: string; label: string }[]
}

export const anomalyConfig: Record<AnomalyOptionType, AnomalyOptionConfig> = {
  network: {
    name: 'wifiHigh',
    text: 'Network / Connectivity',
    options: [
      { value: 'network_interface_disconnection', label: 'Network interface disconnection' },
      { value: 'ioc_service_restart', label: 'IOC service restart' },
      { value: 'full_server_reboot', label: 'Full server reboot' },
    ],
  },
  resource: {
    name: 'memory',
    text: 'Resource Consumption',
    options: [
      { value: 'progressive_memory_leak', label: 'Progressive memory leak' },
      { value: 'cpu_hog', label: 'CPU hog (CPU burn)' },
      { value: 'fork_bomb', label: 'Fork bomb / zombie processes' },
      { value: 'file_description_leak', label: 'File description leak' },
      { value: 'tcp_connection_saturation', label: 'TCP connection saturation' },
    ],
  },
  disk: {
    name: 'disc',
    text: 'Disk I/O',
    options: [
      { value: 'log_flooding', label: 'Log flooding (massive disk writes)' },
      { value: 'disk_fill', label: 'Disk fill' },
    ],
  },
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
