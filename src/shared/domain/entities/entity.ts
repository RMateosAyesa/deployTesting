type PrimitiveTypes = string | number | boolean | Date | undefined | null

type ValueObjectValue<Property> = Property extends PrimitiveTypes
  ? Property
  : Property extends { value: infer Value }
    ? ValueObjectValue<Value>
    : Property extends Array<infer Value>
      ? Array<ValueObjectValue<Value>>
      : Property extends object
        ? { [Key in keyof Property]: ValueObjectValue<Property[Key]> }
        : never

export type Primitives<Properties> = {
  [Key in keyof Properties]: ValueObjectValue<Properties[Key]>
}

export abstract class Entity<Properties> {
  readonly props: Properties

  abstract get value(): Primitives<Properties>

  constructor(props: Properties) {
    this.props = props
  }
}
