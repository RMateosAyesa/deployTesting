import React from 'react'
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  Legend,
} from 'recharts'
import { theme } from '../../../../styles/theme'

export type BarChartMetric = 'cpu' | 'ram' | 'disk' | 'network' | 'scanLatency' | 'heartbeat'
export type BarChartVariant = 'standard' | 'expanded'

export interface BarChartDataPoint {
  time: string
  value: number
}

export interface BarChartProps {
  data: BarChartDataPoint[]
  metric: BarChartMetric
  variant?: BarChartVariant
  height?: number
  ticks?: number[]
  xAxisInterval?: number
  showReferenceLines?: boolean
  referenceLinesConfig?: { 50?: boolean; 75?: boolean }
}

const metricConfig: Record<BarChartMetric, { max: number; color: string; label: string }> = {
  cpu: { max: 100, color: theme.colors.cpuColor, label: 'CPU' },
  ram: { max: 100, color: theme.colors.ramColor, label: 'RAM' },
  disk: { max: 100, color: theme.colors.diskColor, label: 'Disk' },
  network: { max: 225, color: theme.colors.networkColor, label: 'Network' },
  scanLatency: { max: 200, color: theme.colors.anomalyFlag, label: 'Scan latency' },
  heartbeat: { max: 1, color: theme.colors.semanticPrimary, label: 'State' },
}

const variantConfig: Record<BarChartVariant, { height: number; showLegend: boolean }> = {
  standard: { height: 225, showLegend: false },
  expanded: { height: 350, showLegend: true },
}

export function BarChart({
  data,
  metric,
  variant = 'standard',
  height,
  ticks,
  xAxisInterval,
  showReferenceLines = true,
  referenceLinesConfig = { 50: true, 75: true },
}: BarChartProps): React.ReactElement {
  const config = metricConfig[metric]
  const { height: variantHeight, showLegend } = variantConfig[variant]

  return (
    <ResponsiveContainer width="100%" height={height || variantHeight}>
      <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={'#424242'} vertical={false} horizontal={true} />
        <XAxis
          dataKey="time"
          interval={xAxisInterval}
          tick={{ fill: theme.colors.contentHigh, fontFamily: theme.fontFamily.primary, fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[0, config.max]}
          ticks={ticks}
          tickCount={ticks?.length || 11}
          tick={{ fill: theme.colors.contentHigh, fontFamily: theme.fontFamily.primary, fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          width={30}
        />
        <Tooltip
          contentStyle={{
            fontFamily: theme.fontFamily.primary,
            fontSize: 12,
            backgroundColor: theme.colors.backgroundLow,
            border: `1px solid ${theme.colors.borderLow}`,
            borderRadius: theme.borderRadius.sm,
          }}
          labelStyle={{ color: theme.colors.contentHigh }}
          itemStyle={{ color: config.color }}
          cursor={{ fill: theme.colors.backgroundLowest }}
        />
        {showLegend && (
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{
              fontFamily: theme.fontFamily.primary,
              fontSize: 12,
              color: theme.colors.contentHigh,
            }}
            formatter={() => (
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: config.color, fontWeight: 'bold' }}>
                <svg width="16" height="9" style={{ flexShrink: 0 }}>
                  <rect width="16" height="9" fill={config.color} rx="2" />
                </svg>
                {config.label}
              </span>
            )}
          />
        )}
        <Bar dataKey="value" max={config.max} radius={[4, 4, 0, 0]} activeBar={false}>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={config.color} />
          ))}
        </Bar>
        {showReferenceLines && referenceLinesConfig[50] && (
          <ReferenceLine
            y={config.max * 0.5}
            stroke={theme.colors.semanticWarning}
            strokeDasharray="5 5"
            strokeWidth={1.5}
          />
        )}
        {showReferenceLines && referenceLinesConfig[75] && (
          <ReferenceLine
            y={config.max * 0.75}
            stroke={theme.colors.semanticDanger}
            strokeDasharray="5 5"
            strokeWidth={1.5}
          />
        )}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
