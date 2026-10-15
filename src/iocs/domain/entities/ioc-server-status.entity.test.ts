import { FieldValidationError } from '../../../shared/domain/errors/field-validation.error'

import { IocServerStatus } from './ioc-server-status.entity'

describe('IocServerStatus', () => {
  const rawIocServerStatus = {
    restartCounter: 23,
    recordCounter: 1563,
    startTod: '01/01/26 - 12:00',
    totalCAConnections: 112,
    activeCAClients: 13,
    epicsBaseVersion: 'R7.0.0',
    linuxKernelVersion: '6.0.1-generic',
  }

  it('creates an ioc server status from primitive values', () => {
    expect(IocServerStatus.create(rawIocServerStatus).value).toEqual(rawIocServerStatus)
  })

  it('rejects a non-numeric restart counter', () => {
    expect(() =>
      IocServerStatus.create({ ...rawIocServerStatus, restartCounter: Number.NaN }),
    ).toThrow(FieldValidationError)
  })

  it('rejects a non-numeric record counter', () => {
    expect(() =>
      IocServerStatus.create({ ...rawIocServerStatus, recordCounter: Number.NaN }),
    ).toThrow(FieldValidationError)
  })

  it('rejects an empty start tod', () => {
    expect(() => IocServerStatus.create({ ...rawIocServerStatus, startTod: '' })).toThrow(
      FieldValidationError,
    )
  })

  it('rejects a non-numeric total CA connections', () => {
    expect(() =>
      IocServerStatus.create({ ...rawIocServerStatus, totalCAConnections: Number.NaN }),
    ).toThrow(FieldValidationError)
  })

  it('rejects a non-numeric active CA clients', () => {
    expect(() =>
      IocServerStatus.create({ ...rawIocServerStatus, activeCAClients: Number.NaN }),
    ).toThrow(FieldValidationError)
  })

  it('rejects an empty epics base version', () => {
    expect(() => IocServerStatus.create({ ...rawIocServerStatus, epicsBaseVersion: '' })).toThrow(
      FieldValidationError,
    )
  })

  it('rejects an empty linux kernel version', () => {
    expect(() => IocServerStatus.create({ ...rawIocServerStatus, linuxKernelVersion: '' })).toThrow(
      FieldValidationError,
    )
  })
})
