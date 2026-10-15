import { FieldValidationError } from '../../../shared/domain/errors/field-validation.error'

import { IocLocation, IocOrigin, IocServer } from '../enums'

import { Ioc } from './ioc.entity'

describe('Ioc', () => {
  const rawIoc = {
    name: 'ioc-01-pres',
    origin: IocOrigin.CYLINDER_01,
    location: IocLocation.CYLINDER_INLET,
    server: IocServer.EPICS_SERVER_01,
  }

  it('creates an ioc from primitive values', () => {
    expect(Ioc.create(rawIoc).value).toEqual(rawIoc)
  })

  it('rejects an empty name', () => {
    expect(() => Ioc.create({ ...rawIoc, name: '' })).toThrow(FieldValidationError)
  })

  it('rejects an invalid origin', () => {
    expect(() => Ioc.create({ ...rawIoc, origin: 'invalid-origin' })).toThrow(FieldValidationError)
  })

  it('rejects an invalid location', () => {
    expect(() => Ioc.create({ ...rawIoc, location: 'invalid-location' })).toThrow(
      FieldValidationError,
    )
  })

  it('rejects an invalid server', () => {
    expect(() => Ioc.create({ ...rawIoc, server: 'invalid-server' })).toThrow(FieldValidationError)
  })
})
