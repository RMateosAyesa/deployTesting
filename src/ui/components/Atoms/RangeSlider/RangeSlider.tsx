import React, { useState, useEffect } from 'react';
import { Slider, InputNumber } from 'antd';
import type { SliderSingleProps } from 'antd';
import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

export interface RangeSliderProps extends SliderSingleProps {
  showInput?: boolean;
  inputWidth?: number;
  placeholder?: string;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const StyledWrapper = styled.div`
  flex: 1;

  .ant-slider {
    --ant-slider-handle-size: 12px;
    --ant-slider-handle-size-hover: 12px;
    margin: 8px 0;

    &:hover {
      .ant-slider-track {
        background-color: ${theme.colors.semanticPrimary};
      }

      .ant-slider-handle::after {
        box-shadow: 0 0 0 2px ${theme.colors.semanticPrimary}80;
      }
    }

    .ant-slider-handle:focus::after {
      box-shadow: 0 0 0 2px ${theme.colors.contentHigh}80;
      outline: 6px solid ${theme.colors.semanticPrimary}20;
    }

    .ant-slider-handle:active::after {
      box-shadow: 0 0 0 2px ${theme.colors.semanticPrimary}60;
      outline: 6px solid ${theme.colors.semanticPrimary}20;
    }
  }

  .ant-slider-track {
    background-color: ${theme.colors.semanticPrimary};
  }

  .ant-slider-rail {
    background-color: ${theme.colors.semanticPrimarySubtle};
  }

  .ant-slider-handle::after {
    background-color: ${theme.colors.semanticPrimary};
    box-shadow: none;
  }

  .ant-slider-handle:hover::after {
    box-shadow: 0 0 0 2px ${theme.colors.semanticPrimary}20;
  }

  .ant-slider-handle:focus::after {
    box-shadow: 0 0 0 2px ${theme.colors.semanticPrimary}20;
  }
  .ant-slider:hover .ant-slider-track,
  .ant-slider:focus .ant-slider-track {
    background-color: ${theme.colors.semanticPrimary};
  }

  .ant-slider-handle:focus::after,
  .ant-slider-handle:focus-visible::after {
    box-shadow: 0 0 0 4px ${theme.colors.semanticPrimary}40 !important;
    outline: none !important;
  }

  .ant-slider-handle:focus {
    outline: none;
    box-shadow: none;
  }

  .ant-slider-disabled {
    .ant-slider-track {
      background-color: ${theme.colors.contentMid} !important;
    }
    .ant-slider-rail {
      background-color: ${theme.colors.borderLow}80 !important;
    }
    .ant-slider-handle::after {
      background-color: ${theme.colors.borderLow} !important;
      box-shadow: none !important;
    }
  }
`;
const StyledInputNumber = styled(InputNumber)<{ $width?: number }>`
  &.ant-input-number {
    width: ${({ $width }) => ($width ? `${$width}px` : "96px")};
    height: 40px;
    background-color: ${theme.colors.backgroundHigh};
    border: none;
    border-radius: ${theme.borderRadius.md};
    color: ${theme.colors.contentHigh};

    &:hover {
      border: 1px solid ${theme.colors.semanticPrimary};
      .ant-input-number-actions {
        background-color: transparent;
      }
      & .ant-input-number-actions > .ant-input-number-action-up {
        border-inline-start: 1px solid ${theme.colors.semanticPrimary};
      }

      & .ant-input-number-actions > .ant-input-number-action-down {
        border-inline-start: 1px solid ${theme.colors.semanticPrimary};
        border-block-start: 1px solid ${theme.colors.semanticPrimary};
      }
    }

    & .ant-input-number-action {
      color: ${theme.colors.contentMid};
    }

    .ant-input-number-input {
      height: 100%;
      text-align: center;
      padding: 0;
      font-size: 14px;
      color: ${theme.colors.contentHigh};

      &::placeholder {
        color: ${theme.colors.contentMid}60;
      }
    }
  }

  & .ant-input-number-mode-input .ant-input-number-action {
    border-inline-start: 1px solid ${theme.colors.semanticPrimary} !important;
  }
`;

export function RangeSlider({
  showInput = true,
  inputWidth,
  placeholder,
  value: controlledValue,
  onChange,
  ...props
}: RangeSliderProps): React.ReactElement {
  const min = props.min ?? 0;
  
  const [internalValue, setInternalValue] = useState<number | undefined>(
    controlledValue !== undefined ? controlledValue : props.defaultValue,
  );

  const currentValue = controlledValue !== undefined 
    ? controlledValue 
    : internalValue !== undefined 
      ? internalValue 
      : undefined;

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  const handleChange = (newValue: number | null) => {
    const val = newValue ?? min;
    setInternalValue(val);
    onChange?.(val);
  };

  return (
    <Container>
      <StyledWrapper>
        <Slider value={currentValue ?? min} onChange={handleChange} {...props} />
      </StyledWrapper>

      {showInput && (
        <StyledInputNumber
          $width={inputWidth}
          min={min}
          max={props.max}
          step={props.step}
          value={currentValue}
          onChange={handleChange}
          disabled={props.disabled}
          placeholder={placeholder}
        />
      )}
    </Container>
  );
}
