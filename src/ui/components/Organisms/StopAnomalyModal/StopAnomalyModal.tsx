import React, { useRef } from 'react'
import { Modal } from 'antd'
import type { ModalProps } from 'antd'
import styled from 'styled-components'

import { Text } from '../../Atoms/Text'
import { Button } from '../../Atoms/Button'
import { theme } from '../../../../styles/theme'

export interface StopAnomalyModalProps
  extends Omit<ModalProps, 'children'> {
  onStop?: () => void
  onCancel?: () => void
}

const ModalPortalWrapper = styled.div`
  .ant-modal {
    max-width: 100%;
  }

  .ant-modal-container {
    background-color: ${theme.colors.backgroundLow};
    padding: ${theme.padding.lg};
    border-radius: ${theme.borderRadius.md};
  }

  .ant-modal-content {
    background-color: ${theme.colors.backgroundLow};
    border-radius: ${theme.borderRadius.md};
  }

  .ant-modal-body {
    padding: 0;
  }

  .ant-modal-footer {
    margin-top: ${theme.spacing.lg};
    border-top: none;
  }

  .ant-modal-close {
    color: ${theme.colors.contentMid};

    &:hover {
      color: ${theme.colors.contentHigh};
    }
  }

  .ant-modal-mask {
    background-color: ${theme.colors.contentOverlay};
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`

export function StopAnomalyModal({
  onCancel,
  onStop,
  ...modalProps
}: StopAnomalyModalProps): React.ReactElement {

  const wrapperRef = useRef<HTMLDivElement>(null)

  return (
    <ModalPortalWrapper ref={wrapperRef}>
      <Modal
        getContainer={() => wrapperRef.current || document.body}
        width={420}
        footer={[
          <Button
            key="cancel"
            variant="outlined"
            fontSize="default"
            onClick={onCancel}
          >
            Cancel
          </Button>,

          <Button
            key="stop"
            variant="solid"
            fontSize="default"
            onClick={onStop}
          >
            Stop
          </Button>,
        ]}
        onCancel={onCancel}
        {...modalProps}
      >
        <Content>
          <Text variant="h3" color={theme.colors.contentHigh}>
            Stop anomaly
          </Text>

          <Text variant="bodyMedium" color={theme.colors.contentMid}>
            You are about to stop this anomaly. This action cannot be undone.
          </Text>
        </Content>
      </Modal>
    </ModalPortalWrapper>
  )
}