import React from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

export interface RadioButtonProps {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  value?: string | number;
  onChange?: (e: RadioChangeEvent) => void;
}

const StyledWrapper = styled.div`
  .ant-radio-wrapper {
    font-family: ${theme.fontFamily.primary};
    color: ${theme.colors.baseColor};
    font-size: ${theme.typography.bodyLarge.fontSize};
    font-weight: ${theme.typography.bodyLargeBold.fontWeight};

    &:hover {
      .ant-radio {
        border-color: ${theme.colors.semanticPrimary};
      }
    }
  }
  
  .ant-radio{
    border-color: ${theme.colors.borderLow};
  }

  .ant-radio-wrapper-checked{
    .ant-radio-checked {
      background-color: ${theme.colors.semanticPrimary};
      border-color: ${theme.colors.semanticPrimary};
    }
            
    &:hover {
      .ant-radio {
        background-color: ${theme.colors.semanticPrimary}90;
      }
    }
  }

  .ant-radio-wrapper-disabled {
    span.ant-radio-label {
      color: ${theme.colors.borderLow};
    }
      
    &:hover {
      .ant-radio {
        border-color: ${theme.colors.contentMid};
      }
    }
  }
`;

export function RadioButton({
  label,
  checked,
  disabled = false,
  name,
  value,
  onChange,
}: RadioButtonProps): React.ReactElement {
  return (
    <StyledWrapper>
      <Radio
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      >
        {label}
      </Radio>
    </StyledWrapper>
  );
}