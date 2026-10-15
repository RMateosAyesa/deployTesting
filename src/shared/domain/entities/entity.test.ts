import { ValueObject } from '../value-objects/value-object'

import { Entity, Primitives } from './entity'

class TestStringValueObject extends ValueObject<{ value: string }> {
  get value(): string {
    return this.props.value
  }
}

type TestEntityProperties = {
  name: TestStringValueObject
  enabled: boolean
  tags: TestStringValueObject[]
  metadata: {
    createdAt: Date
    description?: TestStringValueObject
  }
}

class TestEntity extends Entity<TestEntityProperties> {
  get value(): Primitives<TestEntityProperties> {
    return {
      name: this.props.name.value,
      enabled: this.props.enabled,
      tags: this.props.tags.map(tag => tag.value),
      metadata: {
        createdAt: this.props.metadata.createdAt,
        description: this.props.metadata.description?.value,
      },
    }
  }
}

describe('Entity', () => {
  it('should expose its properties and their primitive representation', () => {
    const createdAt = new Date('2026-08-27T10:00:00.000Z')
    const name = new TestStringValueObject({ value: 'Host metric' })
    const tag = new TestStringValueObject({ value: 'cpu' })

    const entity = new TestEntity({
      name,
      enabled: true,
      tags: [tag],
      metadata: {
        createdAt,
      },
    })

    expect(entity.props).toEqual({
      name,
      enabled: true,
      tags: [tag],
      metadata: { createdAt },
    })
    expect(entity.value).toEqual({
      name: 'Host metric',
      enabled: true,
      tags: ['cpu'],
      metadata: {
        createdAt,
        description: undefined,
      },
    })
  })
})
