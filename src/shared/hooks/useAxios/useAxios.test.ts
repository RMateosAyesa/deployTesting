import { act, renderHook } from '@testing-library/react'

import { useAxios } from './useAxios'

describe('useAxios', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() => useAxios(jest.fn()))

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.data).toBeNull()
  })

  it('should set data on success and stop loading', async () => {
    const operation = jest.fn().mockResolvedValue({ id: 1 })
    const { result } = renderHook(() => useAxios(operation))

    await act(async () => {
      await result.current.fireOperation()
    })

    expect(operation).toHaveBeenCalled()
    expect(result.current.data).toEqual({ id: 1 })
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('should set error on failure and stop loading', async () => {
    const error = new Error('boom')
    const operation = jest.fn().mockRejectedValue(error)
    const onError = jest.fn()
    const { result } = renderHook(() => useAxios(operation, { onError }))

    await act(async () => {
      await result.current.fireOperation()
    })

    expect(result.current.error).toBe(error)
    expect(result.current.data).toBeNull()
    expect(result.current.loading).toBe(false)
    expect(onError).toHaveBeenCalledWith(error)
  })

  it('should pass variables to the operation', async () => {
    const operation = jest.fn().mockResolvedValue('ok')
    const { result } = renderHook(() => useAxios(operation))

    await act(async () => {
      await result.current.fireOperation('a', 1)
    })

    expect(operation).toHaveBeenCalledWith('a', 1)
  })

  it('should use adapter and call onComplete', async () => {
    const onComplete = jest.fn()
    const operation = jest.fn().mockResolvedValue({ value: 2 })
    const adapter = (response: { value: number }) => response.value * 10
    const { result } = renderHook(() =>
      useAxios(operation, { onComplete }, adapter),
    )

    await act(async () => {
      await result.current.fireOperation()
    })

    expect(result.current.data).toBe(20)
    expect(onComplete).toHaveBeenCalledWith(20, [])
  })

  it('should run beforeFire before firing the operation', async () => {
    const beforeFire = jest.fn()
    const operation = jest.fn().mockResolvedValue(null)
    const { result } = renderHook(() => useAxios(operation, { beforeFire }))

    await act(async () => {
      await result.current.fireOperation()
    })

    expect(beforeFire).toHaveBeenCalled()
  })

  it('should respect initData', () => {
    const { result } = renderHook(() =>
      useAxios(jest.fn(), { initData: { cached: true } }),
    )

    expect(result.current.data).toEqual({ cached: true })
  })

  it('should keep fireOperation stable between renders', () => {
    const operation = jest.fn()
    const { result, rerender } = renderHook(() => useAxios(operation))
    const initialFireOperation = result.current.fireOperation

    rerender()

    expect(result.current.fireOperation).toBe(initialFireOperation)
  })
})
