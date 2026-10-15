import { EnumValueObject } from '../../../shared/domain/value-objects/enum.value-object'
import { FieldValidationError } from '../../../shared/domain/errors/field-validation.error'
import { UseCase } from '../../../shared/types/use-case'
import { HostMetricsChartRepository } from '../../domain/contracts/host-metrics-chart.repository'
import {
  HostMetricChart,
  HostMetricChartValue,
} from '../../domain/entities/host-metric-chart.entity'
import {
  HOST_METRIC_SUBTYPES_BY_TYPE,
  HostMetricSubtype,
  HostMetricType,
  OverviewMetricsTimeRange,
} from '../../domain/enums'

export interface GetChartMetricsInput {
  type: string
  subtype: string
  timeRange?: string
}

export class GetChartMetricsUseCase
  implements UseCase<GetChartMetricsInput, HostMetricChartValue[]>
{
  constructor(
    private readonly hostMetricsChartRepository: HostMetricsChartRepository,
  ) {}

  async execute(input: GetChartMetricsInput): Promise<HostMetricChartValue[]> {
    const type = EnumValueObject.initiate('type', input.type, HostMetricType)
    const subtype = EnumValueObject.initiate(
      'subtype',
      input.subtype,
      HostMetricSubtype,
    )

    this.validateSubtypeForType(type, subtype)

    const timeRange = input.timeRange ?? OverviewMetricsTimeRange.REALTIME
    EnumValueObject.initiate('timeRange', timeRange, OverviewMetricsTimeRange)

    const chartMetrics =
      await this.hostMetricsChartRepository.findChartMetrics(
        input.type,
        input.subtype,
        timeRange,
      )

    return chartMetrics.map((chartMetric: HostMetricChart) => chartMetric.value)
  }

  private validateSubtypeForType(
    type: EnumValueObject,
    subtype: EnumValueObject,
  ): void {
    const validSubtypes =
      HOST_METRIC_SUBTYPES_BY_TYPE[type.value as HostMetricType]

    if (!validSubtypes.includes(subtype.value as HostMetricSubtype)) {
      throw new FieldValidationError(
        `Subtype ${subtype.value} is not valid for host metric type ${type.value}`,
      )
    }
  }
}
