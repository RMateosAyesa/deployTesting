import { EnumValueObject } from '../../../shared/domain/value-objects/enum.value-object'
import { FieldValidationError } from '../../../shared/domain/errors/field-validation.error'
import { NumberValueObject } from '../../../shared/domain/value-objects/number.value-object'
import { UseCase } from '../../../shared/types/use-case'
import { HostMetricsRepository } from '../../domain/contracts/host-metrics.repository'
import {
  HostMetric,
  HostMetricValue,
} from '../../domain/entities/host-metric.entity'
import {
  HOST_METRIC_SUBTYPES_BY_TYPE,
  HostMetricSubtype,
  HostMetricType,
} from '../../domain/enums'

export interface GetOverviewMetricsInput {
  type: string
  subtype: string
  minutes?: number
}

export class GetOverviewMetricsUseCase
  implements UseCase<GetOverviewMetricsInput, HostMetricValue[]>
{
  constructor(
    private readonly hostMetricsRepository: HostMetricsRepository,
  ) {}

  async execute(input: GetOverviewMetricsInput): Promise<HostMetricValue[]> {
    const type = EnumValueObject.initiate('type', input.type, HostMetricType)
    const subtype = EnumValueObject.initiate(
      'subtype',
      input.subtype,
      HostMetricSubtype,
    )

    this.validateSubtypeForType(type, subtype)

    if (input.minutes != null) {
      NumberValueObject.create('minutes', input.minutes)
    }

    const hostMetrics = await this.hostMetricsRepository.findOverviewMetrics(
      input.type as HostMetricType,
      input.subtype,
      input.minutes,
    )

    return hostMetrics.map((hostMetric: HostMetric) => hostMetric.value)
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