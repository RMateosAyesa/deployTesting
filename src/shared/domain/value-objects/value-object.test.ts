import { ValueObject } from './value-object'

class TestValueObject extends ValueObject<{ value: string }> {
  get value(): string {
    return this.props.value
  }
}

describe('ValueObject', () => {
  it('should keep a copy of the provided properties', () => {
    const properties = { value: 'initial value' }
    const valueObject = new TestValueObject(properties)

    properties.value = 'modified value'

    expect(valueObject.value).toBe('initial value')
  })
})
