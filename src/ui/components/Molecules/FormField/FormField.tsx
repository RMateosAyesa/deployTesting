import React from 'react'
import type { SelectProps as AntSelectProps } from 'antd'
import type { Dayjs } from 'dayjs'
import { InfoIcon } from '@phosphor-icons/react'
import styled from 'styled-components'
import { DatePicker, type DatePickerProps } from '../../Atoms/DatePicker'
import { Input, type InputProps } from '../../Atoms/Input'
import { Label } from '../../Atoms/Label'
import { Select, type SelectProps } from '../../Atoms/Select'
import { Tooltip, type TooltipProps } from '../../Atoms/Tooltip'

export type FormFieldAppearance = 'default' | 'sensorConfig'

type AccessibleInputProps = InputProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    'aria-label'?: string
    'aria-invalid'?: boolean
    'aria-describedby'?: string
  }

type AccessibleDatePickerProps = DatePickerProps & {
  id?: string
  'aria-label'?: string
  'aria-invalid'?: boolean
  'aria-describedby'?: string
}

const InputControl = Input as React.ComponentType<AccessibleInputProps>
const DatePickerControl = DatePicker as React.ComponentType<AccessibleDatePickerProps>

type BaseFormFieldProps = {
  id?: string
  label: string
  required?: boolean
  error?: string
  helperText?: string
  tooltipProps?: Omit<TooltipProps, 'children'>
  fullWidth?: boolean
  appearance?: FormFieldAppearance
}

type InputFormFieldProps = BaseFormFieldProps & {
  variant?: 'input'
  inputProps?: AccessibleInputProps
}

type SelectFormFieldProps = BaseFormFieldProps & {
  variant: 'select'
  selectProps?: SelectProps & {
    id?: string
    'aria-label'?: string
    'aria-invalid'?: boolean
    'aria-describedby'?: string
  }
}

type DatePickerFormFieldProps = BaseFormFieldProps & {
  variant: 'datePicker'
  datePickerProps?: AccessibleDatePickerProps
}

export type FormFieldProps = InputFormFieldProps | SelectFormFieldProps | DatePickerFormFieldProps

export function FormField(props: FormFieldProps): React.ReactElement {
  const {
    id,
    label,
    required = false,
    error,
    helperText,
    tooltipProps,
    fullWidth = true,
    appearance = 'default',
  } = props
  const fieldId = id || label.toLowerCase().replace(/\s+/g, '-')
  const messageId = `${fieldId}-message`
  const description = error || helperText
  const tooltipIconSize = appearance === 'sensorConfig' ? 16 : 24

  return (
    <FieldWrapper $fullWidth={fullWidth}>
      <LabelRow>
        {tooltipProps?.title && (
          <Tooltip {...tooltipProps}>
            <TooltipTrigger type="button" aria-label={`${label} information`} $appearance={appearance}>
              <InfoIcon size={tooltipIconSize} weight="regular" />
            </TooltipTrigger>
          </Tooltip>
        )}
        <LabelContainer>
          <Label text={label} htmlFor={fieldId} required={required} />
        </LabelContainer>
      </LabelRow>
      {renderControl(props, fieldId, fullWidth, Boolean(error), appearance, description ? messageId : undefined)}
      {description && (
        <Message id={messageId} $hasError={Boolean(error)}>
          {description}
        </Message>
      )}
    </FieldWrapper>
  )
}

function renderControl(
  props: FormFieldProps,
  fieldId: string,
  fullWidth: boolean,
  hasError: boolean,
  appearance: FormFieldAppearance,
  describedBy?: string
): React.ReactElement {
  const controlVariant = appearance === 'sensorConfig' ? 'sensorConfig' : undefined

  if (props.variant === 'select') {
    const selectVariant = props.selectProps?.variant || controlVariant

    return (
      <Select
        fullWidth={fullWidth}
        {...props.selectProps}
        variant={selectVariant}
        id={fieldId}
        aria-label={props.label}
        aria-invalid={hasError}
        aria-describedby={describedBy}
      />
    )
  }

  if (props.variant === 'datePicker') {
    const datePickerVariant = props.datePickerProps?.variant || controlVariant

    return (
      <DatePickerControl
        fullWidth={fullWidth}
        hasError={hasError}
        {...props.datePickerProps}
        variant={datePickerVariant}
        id={fieldId}
        aria-label={props.label}
        aria-invalid={hasError}
        aria-describedby={describedBy}
      />
    )
  }

  return (
    <InputControl
      fullWidth={fullWidth}
      hasError={hasError}
      {...props.inputProps}
      variant={props.inputProps?.variant || controlVariant}
      id={fieldId}
      aria-label={props.label}
      aria-invalid={hasError}
      aria-describedby={describedBy}
    />
  )
}

export type FormFieldInputChange = React.ChangeEvent<HTMLInputElement>
export type FormFieldSelectChange = AntSelectProps['onChange']
export type FormFieldDateChange = (date: Dayjs | null, dateString: string) => void

const FieldWrapper = styled.div<{ $fullWidth: boolean }>`
  display: flex;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'fit-content')};
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  min-height: 24px;
`

const LabelContainer = styled.div`
  display: flex;
  align-items: center;

  .ant-form-item {
    margin-bottom: 0;
  }

  .ant-form-item-label {
    padding: 0;
  }
`

const TooltipTrigger = styled.button<{ $appearance: FormFieldAppearance }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $appearance }) => ($appearance === 'sensorConfig' ? '16px' : '24px')};
  height: ${({ $appearance }) => ($appearance === 'sensorConfig' ? '16px' : '24px')};
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.semanticPrimary};
  cursor: help;
`

const Message = styled.p<{ $hasError: boolean }>`
  margin: 0;
  color: ${({ theme, $hasError }) =>
    $hasError ? theme.colors.semanticDanger : theme.colors.contentMid};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.info.fontSize};
  font-weight: ${({ theme }) => theme.typography.info.fontWeight};
  line-height: ${({ theme }) => theme.typography.info.lineHeight};
`
