import React, { useId } from 'react'
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { theme } from '../../../../styles/theme'

export type LineChartMetric = 'cpu' | 'ram' | 'disk' | 'network' | 'scanLatency' | 'heartbeat'
export type LineChartVariant = 'standard' | 'expanded'
export type LineChartAreaFill = 'gradient' | 'solid'

export interface LineChartDataPoint {
  time: string
  value: number
}

export interface LineChartProps {
  data: LineChartDataPoint[]
  metric: LineChartMetric
  variant?: LineChartVariant
  height?: number
  ticks?: number[]
  xAxisInterval?: number
  showDots?: boolean
  fillArea?: boolean
  areaFill?: LineChartAreaFill
  showReferenceLines?: boolean
  referenceLinesConfig?: { 50?: boolean; 75?: boolean }
}

const metricConfig: Record<LineChartMetric, { max: number; color: string; label: string }> = {
  cpu: { max: 100, color: theme.colors.cpuColor, label: 'CPU' },
  ram: { max: 100, color: theme.colors.ramColor, label: 'RAM' },
  disk: { max: 100, color: theme.colors.diskColor, label: 'Disk' },
  network: { max: 225, color: theme.colors.networkColor, label: 'Network' },
  scanLatency: { max: 200, color: theme.colors.anomalyFlag, label: 'Scan latency' },
  heartbeat: { max: 1, color: theme.colors.semanticPrimary, label: 'State' },
}

const variantConfig: Record<LineChartVariant, { height: number; showLegend: boolean }> = {
  standard: { height: 225, showLegend: false },
  expanded: { height: 350, showLegend: true },
}

export function LineChart({
  data,
  metric,
  variant = 'standard',
  height,
  ticks,
  xAxisInterval,
  showDots = true,
  fillArea = false,
  areaFill = 'gradient',
  showReferenceLines = true,
  referenceLinesConfig = { 50: true, 75: true },
}: LineChartProps): React.ReactElement {
  const config = metricConfig[metric]
  const { height: variantHeight, showLegend } = variantConfig[variant]
  const gradientId = `line-chart-gradient-${useId().replace(/:/g, '')}`

  return (
    <ResponsiveContainer width="100%" height={height || variantHeight}>
      <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={config.color} stopOpacity={0.45} />
            <stop offset="100%" stopColor={config.color} stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#424242" vertical={false} />
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
          />
        )}
        {fillArea ? (
          <Area
            type="monotone"
            dataKey="value"
            name={config.label}
            stroke={config.color}
            strokeWidth={2}
            fill={areaFill === 'gradient' ? `url(#${gradientId})` : config.color}
            fillOpacity={areaFill === 'solid' ? 0.3 : 1}
            dot={showDots ? { r: 3, fill: config.color, strokeWidth: 0 } : false}
            activeDot={{ r: 5 }}
          />
        ) : (
          <Line
            type="monotone"
            dataKey="value"
            name={config.label}
            stroke={config.color}
            strokeWidth={2}
            dot={showDots ? { r: 3, fill: config.color, strokeWidth: 0 } : false}
            activeDot={{ r: 5 }}
          />
        )}
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
      </ComposedChart>
    </ResponsiveContainer>
  )
}
