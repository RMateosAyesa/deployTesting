import React from "react";
import { DatePicker as AntDatePicker } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import locale from "antd/es/date-picker/locale/es_ES";
import styled, { createGlobalStyle, css } from "styled-components";

export type DatePickerVariant = "standard" | "sensorConfig";

dayjs.extend(updateLocale);
dayjs.updateLocale("es", {
  weekStart: 1,
});

export interface DatePickerProps {
  hasError?: boolean;
  fullWidth?: boolean;
  variant?: DatePickerVariant;
  placeholder?: string;
  disabled?: boolean;
  value?: Dayjs;
  onChange?: (date: Dayjs | null, dateString: string) => void;
  format?: string;
  disabledDate?: (currentDate: Dayjs) => boolean;
  showTime?: boolean;
}

interface StyledDatePickerProps {
  $hasError?: boolean;
  $fullWidth?: boolean;
  $variant: DatePickerVariant;
}

const SelectDropdownStyles = createGlobalStyle`
  &.ant-picker-dropdown {
    background-color: ${({ theme }) => theme.colors.backgroundMid};
    padding: 4px;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    border: 1px solid ${({ theme }) => theme.colors.borderMid};

    & .ant-picker-panel-container {
      background-color: transparent;
    }

    & .ant-picker-content th {
      color: ${({ theme }) => theme.colors.contentHigh};
    }

    & .ant-picker-header, .ant-picker-header > button {
      color: ${({ theme }) => theme.colors.semanticPrimary};
    }

    & .ant-picker-time-panel-column >li.ant-picker-time-panel-cell .ant-picker-time-panel-cell-inner {
      color: ${({ theme }) => theme.colors.contentHigh};
    }

    & .ant-picker-header-view >button:hover, .ant-picker-header >button:hover {
      color: ${({ theme }) => theme.colors.contentHigh};
    }

    & a {
      color: ${({ theme }) => theme.colors.semanticPrimary};

      &:hover {
        color: ${({ theme }) => theme.colors.contentHigh};
      }
    }

    & .ant-picker-ok > .ant-btn {
      background-color: transparent;
      border-color: ${({ theme }) => theme.colors.semanticPrimary};
      color: ${({ theme }) => theme.colors.semanticPrimary};

      &:hover {
        background-color: ${({ theme }) => theme.colors.semanticPrimary}25;
        border-color: ${({ theme }) => theme.colors.semanticPrimary};
        color: ${({ theme }) => theme.colors.semanticPrimary};
      }
    }

    & .ant-picker-cell-in-view.ant-picker-cell-selected:not(.ant-picker-cell-disabled) .ant-picker-cell-inner,
    & .ant-picker-cell:hover .ant-picker-cell-inner {
      background-color: ${({ theme }) => theme.colors.semanticPrimary}25 !important;
    }

    & .ant-picker-cell-in-view.ant-picker-cell-today .ant-picker-cell-inner::before {
      border-color: ${({ theme }) => theme.colors.semanticPrimary};
    }

    & .ant-picker-time-panel-column >li.ant-picker-time-panel-cell-selected .ant-picker-time-panel-cell-inner,
      .ant-picker-time-panel-column >li.ant-picker-time-panel-cell .ant-picker-time-panel-cell-inner:hover{
      background-color: ${({ theme }) => theme.colors.semanticPrimary}25 ;
    }
  }

  & .ant-picker-cell {
    color: ${({ theme }) => theme.colors.contentMid}50 !important;
  }

  & .ant-picker-cell-in-view {
    color: ${({ theme }) => theme.colors.contentHigh} !important;
  }

  &.ant-picker-dropdown .ant-picker-cell-inner:hover {
    background-color: ${({ theme }) => theme.colors.backgroundLowest};
  }
`;

const StyledDatePicker = styled(AntDatePicker)<StyledDatePickerProps>`
  &.ant-picker {
    background-color: ${({ theme }) => theme.colors.backgroundMid};
    border: 1px solid
      ${({ theme, $hasError: hasError }) =>
        hasError ? theme.colors.semanticDanger : theme.colors.backgroundLowest};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    color: ${({ theme }) => theme.colors.contentHigh};
    font-size: ${({ theme }) => theme.typography.bodyLarge.fontSize};
    padding: ${({ theme }) => theme.padding.sm}
      ${({ theme }) => theme.padding.md};
    height: 40px;
    width: ${({ $fullWidth: fullWidth }) => (fullWidth ? "100%" : "auto")};
    min-width: 270px;

    .ant-picker-input {
      input {
        color: ${({ theme }) => theme.colors.contentHigh};

        &::placeholder {
          color: ${({ theme }) => theme.colors.contentMid}40;
        }
      }
    }

    &:hover {
      border-color: ${({ theme }) => theme.colors.semanticPrimary};
      color: ${({ theme }) => theme.colors.contentHigh} !important;

      .ant-picker-clear {
        color: ${({ theme }) => theme.colors.contentHigh} !important;      }
    }

    &:focus,
    &.ant-picker-focused {
      border-color: ${({ theme }) => theme.colors.semanticPrimary};
      //box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.semanticPrimary}20;
    }

    ${({ $hasError: hasError, theme }) =>
      hasError &&
      `
      border-color: ${theme.colors.semanticDanger} !important;
      &:focus {
        box-shadow: 0 0 0 2px ${theme.colors.semanticDanger}20 !important;
      }
    `}

    ${({ $variant, theme }) =>
      $variant === "sensorConfig" &&
      css`
        min-width: 0;
        border-color: ${theme.colors.backgroundLowest};
        border-radius: ${theme.borderRadius.sm};
        font-size: ${theme.typography.bodyMedium.fontSize};
        line-height: ${theme.typography.bodyMedium.lineHeight};

        .ant-picker-input {
          input {
            color: ${theme.colors.contentHigh};
            font-size: ${theme.typography.bodyMedium.fontSize};
            line-height: ${theme.typography.bodyMedium.lineHeight};

            &::placeholder {
              color: ${theme.colors.contentHigh};
            }
          }
        }
      `}
  }

  &.ant-picker-disabled {
    background-color: ${({ theme }) => theme.colors.backgroundLow};
    border-color: ${({ theme }) => theme.colors.borderLow} !important;
    cursor: not-allowed;
  }

  .ant-picker-suffix,
  .ant-picker-separator {
    color: ${({ theme }) => theme.colors.contentHigh};
  }

  .ant-picker-clear {
    background-color: ${({ theme }) => theme.colors.backgroundHigh};
  }

  .ant-picker-footer {
    .ant-picker-today-btn {
      color: ${({ theme }) => theme.colors.semanticPrimary};
    }
  }
`;

export function DatePicker({
  fullWidth = false,
  hasError = false,
  variant = "standard",
  showTime = false,
  ...props
}: DatePickerProps): React.ReactElement {
  const placeholder =
    props.placeholder || (showTime ? "dd/mm/yyyy HH:mm" : "dd/mm/yyyy");

  return (
    <>
      <SelectDropdownStyles />
      <StyledDatePicker
        $fullWidth={fullWidth}
        $hasError={hasError}
        $variant={variant}
        placeholder={placeholder}
        showTime={showTime ? { format: "HH:mm" } : false}
        locale={locale}
        {...props}
      />
    </>
  );
}
