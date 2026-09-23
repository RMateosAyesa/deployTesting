import React from 'react'
import { Switch } from 'antd'
import styled from 'styled-components'
import { theme } from '../../../../styles/theme'
import type { SwitchProps } from 'antd'

export type SwitchButtonProps = SwitchProps

const StyledSwitch = styled(Switch)`
  &.ant-switch {
    background-color: ${theme.colors.backgroundHigh};
    border: 1px solid ${theme.colors.borderMid};
    min-width: 44px;
    height: 24px;
    transition: all 0.2s ease;
  }

  &.ant-switch-checked {
    background-color: ${theme.colors.backgroundHigh};
  }

  &.ant-switch:hover:not(.ant-switch-disabled),
  &.ant-switch:focus:not(.ant-switch-disabled),
  &.ant-switch-focused:not(.ant-switch-disabled),
  &.ant-switch:active:not(.ant-switch-disabled) {
    background-color: ${theme.colors.semanticPrimary}33;
    border-color: ${theme.colors.semanticPrimary};
  }

  .ant-switch-handle {
    width: 16px;
    height: 16px;
    top: 50%;
    transform: translateY(-50%);
  }

  .ant-switch-handle::before {
    background-color: ${theme.colors.borderMid};
    transition: all 0.2s ease;
  }

  &.ant-switch-checked .ant-switch-handle::before {
    background-color: ${theme.colors.semanticPrimary};
  }

  &.ant-switch-checked .ant-switch-handle {
    left: calc(100% - 18px);
  }

  &.ant-switch:focus,
  &.ant-switch-focused {
    box-shadow: none;
    outline: none;
  }

  &.ant-switch-disabled {
    opacity: 0.5;
  }
`

export function SwitchButton({
  ...rest
}: SwitchButtonProps): React.ReactElement {
  return (
    <StyledSwitch {...rest}/>
  )
}