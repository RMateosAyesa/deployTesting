import React from 'react';
import { Tooltip as AntTooltip } from 'antd';
import type { TooltipProps as AntTooltipProps } from 'antd';
import { theme } from '../../../../styles/theme';

export interface TooltipProps extends AntTooltipProps {
  children: React.ReactNode,
}

const styles: TooltipProps['styles'] = {
  container: {
    backgroundColor: theme.colors.backgroundLowest,
    color: theme.colors.baseColor,
    padding: theme.padding.tag,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.bodyMedium.fontSize,
    lineHeight: theme.typography.bodyMedium.lineHeight,
  },
};

export function Tooltip({ children, ...props }: TooltipProps): React.ReactElement {
  return (
    <AntTooltip styles={styles} arrow={false} placement='rightBottom' {...props}>
      {children}
    </AntTooltip>
  )
}
