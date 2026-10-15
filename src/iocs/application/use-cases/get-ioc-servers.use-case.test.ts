import { FieldValidationError } from '../../../shared/domain/errors/field-validation.error'
import type { FindAllResponse } from '../../../shared/types/find-all-response.type'
import type { IocRepository } from '../../domain/contracts/ioc.repository'
import { Ioc } from '../../domain/entities/ioc.entity'
import { IocLocation, IocOrigin, IocServer } from '../../domain/enums'

import { GetIocServersUseCase } from './get-ioc-servers.use-case'

describe('GetIocServersUseCase', () => {
  const ioc = Ioc.create({
    name: 'ioc-01-pres',
    origin: IocOrigin.CYLINDER_01,
    location: IocLocation.CYLINDER_INLET,
    server: IocServer.EPICS_SERVER_01,
  })

  const populatedResponse: FindAllResponse<Ioc> = {
    items: [ioc],
    total: 1,
    page: 1,
    pages: 1,
  }

  const emptyResponse: FindAllResponse<Ioc> = {
    items: [],
    total: 0,
    page: 1,
    pages: 0,
  }

  const repository: IocRepository = {
    findAll: jest.fn(),
  }
  const useCase = new GetIocServersUseCase(repository)

  beforeEach(() => {
    jest.clearAllMocks()
    ;(repository.findAll as jest.Mock).mockResolvedValue(populatedResponse)
  })

  it('should delegate to the repository and map iocs to primitive values', async () => {
    const result = await useCase.execute()

    expect(result).toEqual({
      items: [ioc.value],
      total: 1,
      page: 1,
      pages: 1,
    })
    expect(repository.findAll).toHaveBeenCalledWith(undefined, undefined)
  })

  it('should pass through the provided pagination', async () => {
    const pagination = { page: 2, pageSize: 20 }

    await useCase.execute({ pagination })

    expect(repository.findAll).toHaveBeenCalledWith(2, 20)
  })

  it('should return an empty find all response when no iocs exist', async () => {
    ;(repository.findAll as jest.Mock).mockResolvedValue(emptyResponse)

    await expect(useCase.execute()).resolves.toEqual({
      items: [],
      total: 0,
      page: 1,
      pages: 0,
    })
  })

  it('should reject invalid pagination and not call the repository', async () => {
    await expect(
      useCase.execute({ pagination: { page: -1, pageSize: 20 } }),
    ).rejects.toThrow(FieldValidationError)

    expect(repository.findAll).not.toHaveBeenCalled()
  })

  it('should propagate repository errors', async () => {
    const error = new Error('Unable to get ioc servers')
    ;(repository.findAll as jest.Mock).mockRejectedValue(error)

    await expect(useCase.execute()).rejects.toBe(error)
  })
})
