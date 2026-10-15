import { Entity, Primitives } from "../../../shared/domain/entities/entity";
import { EnumValueObject } from "../../../shared/domain/value-objects/enum.value-object";
import { NumberValueObject } from "../../../shared/domain/value-objects/number.value-object";
import { StringValueObject } from "../../../shared/domain/value-objects/string.value-object";
import { FieldValidationError } from "../../../shared/domain/errors/field-validation.error";
import {
  IocTrazabilityDataFrom,
  IocTrazabilityEventEnum,
  IocTrazabilityLocation,
  IocTrazabilityOrigin,
} from "../enums";

export type IocTrazabilityMetricProperties = {
  id: StringValueObject;
  timestamp: NumberValueObject;
  server: StringValueObject;
  dataFrom: EnumValueObject;
  origin: EnumValueObject;
  location: EnumValueObject;
  variable: EnumValueObject;
  value: NumberValueObject;
  status?: StringValueObject;
  url: StringValueObject;
  name: StringValueObject;
};

export type IocTrazabilityMetricCreateProperties = Omit<
  Primitives<IocTrazabilityMetricProperties>,
  "timestamp"
> & {
  timestamp: number | string;
};

const iocHealthyStatuses = ["connected", "disconnected"];

export class IocTrazabilityMetric extends Entity<IocTrazabilityMetricProperties> {
  get value(): Primitives<IocTrazabilityMetricProperties> {
    return {
      id: this.props.id.value,
      timestamp: this.props.timestamp.value,
      server: this.props.server.value,
      dataFrom: this.props.dataFrom.value,
      origin: this.props.origin.value,
      location: this.props.location.value,
      variable: this.props.variable.value,
      value: this.props.value.value,
      status: this.props.status?.value,
      url: this.props.url.value,
      name: this.props.name.value,
    };
  }

  static create(
    props: IocTrazabilityMetricCreateProperties,
  ): IocTrazabilityMetric {
    return new IocTrazabilityMetric({
      id: StringValueObject.create("Ioc trazability metric id", props.id),
      timestamp: NumberValueObject.create(
        "Ioc trazability metric timestamp",
        this.parseTimestamp(props.timestamp),
      ),
      server: StringValueObject.create(
        "Ioc trazability metric server",
        props.server,
      ),
      dataFrom: EnumValueObject.initiate(
        "Ioc trazability metric data from",
        props.dataFrom,
        IocTrazabilityDataFrom,
      ),
      origin: EnumValueObject.initiate(
        "Ioc trazability metric origin",
        props.origin,
        IocTrazabilityOrigin,
      ),
      location: EnumValueObject.initiate(
        "Ioc trazability metric location",
        props.location,
        IocTrazabilityLocation,
      ),
      variable: EnumValueObject.initiate(
        "Ioc trazability metric variable",
        props.variable,
        IocTrazabilityEventEnum,
      ),
      value: NumberValueObject.create(
        "Ioc trazability metric value",
        props.value,
      ),
      status: this.createStatus(props.variable, props.status),
      url: StringValueObject.create("Ioc trazability metric url", props.url),
      name: StringValueObject.create("Ioc trazability metric name", props.name),
    });
  }

  private static parseTimestamp(timestamp: number | string): number {
    if (typeof timestamp === "number") {
      return timestamp;
    }
    const parsed = Date.parse(timestamp);
    return Number.isNaN(parsed) ? Number.NaN : parsed;
  }

  private static createStatus(
    variable: string,
    status?: string,
  ): StringValueObject | undefined {
    if (status == null) {
      return undefined;
    }
    if (variable !== IocTrazabilityEventEnum.IOC_HEALTHY) {
      throw new FieldValidationError(
        `Property Ioc trazability metric status can only be provided for ${IocTrazabilityEventEnum.IOC_HEALTHY}`,
      );
    }
    if (!iocHealthyStatuses.includes(status)) {
      throw new FieldValidationError(
        `Property Ioc trazability metric status must be one of ${iocHealthyStatuses.join(", ")}`,
      );
    }
    return StringValueObject.create("Ioc trazability metric status", status);
  }
}
