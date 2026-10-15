
import { IocServerStatus } from '../../domain/entities/ioc-server-status.entity'
import { GetIocServerStatusUseCase } from './get-ioc-servers-status.use-case'
import { IocRepository } from '@/iocs/domain/contracts/ioc.repository'

describe('GetIocServerStatusUseCase', () => {
  const status = IocServerStatus.create({
    restartCounter: 1,
    recordCounter: 100,
    startTod: '12:00:00',
    totalCAConnections: 10,
    activeCAClients: 5,
    epicsBaseVersion: '7.0.8',
    linuxKernelVersion: '5.15.0',
  })

  const repository: IocRepository = {
    findAll: jest.fn(),
    findStatus: jest.fn(),
  }

  const useCase = new GetIocServerStatusUseCase(repository)

  beforeEach(() => {
    jest.clearAllMocks()
    ;(repository.findStatus as jest.Mock).mockResolvedValue(status)
  })

  it('should delegate to the repository and return the status primitive values', async () => {
    const result = await useCase.execute({
      iocName: 'ioc-01-pres',
    })

    expect(result).toEqual(status.value)

    expect(repository.findStatus).toHaveBeenCalledWith('ioc-01-pres')
  })

  it('should propagate repository errors', async () => {
    const error = new Error('Unable to get ioc server status')

    ;(repository.findStatus as jest.Mock).mockRejectedValue(error)

    await expect(
      useCase.execute({
        iocName: 'ioc-01-pres',
      }),
    ).rejects.toBe(error)
  })
})
