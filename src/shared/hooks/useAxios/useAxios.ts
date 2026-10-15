import { useCallback, useRef, useState } from 'react'

import { IOptions } from './types/options.interface'
import { OperationType } from './types/operation.type'

const identityAdapter = <T, R>(response: T): R => response as unknown as R

export const useAxios = <T, R = T>(
  operation: OperationType<T>,
  options: IOptions<R> = {},
  adapter: (response: T) => R = identityAdapter,
) => {
  const { onComplete, onError, beforeFire } = options

  const [data, setData] = useState<R | null>(options.initData ?? null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<unknown>(null)
  const loadingRef = useRef(false)

  /**
   * Fire the operation from a useEffect or an event handler, never from the
   * component body to avoid infinite re-render loops.
   */
  const fireOperation = useCallback(
    (...variables: Parameters<OperationType<T>>) => {
      if (!loadingRef.current) {
        loadingRef.current = true
        setLoading(true)

        if (beforeFire) {
          beforeFire()
        }

        operation(...variables)
          .then((_data) => {
            const result = adapter(_data)
            setData(result)
            if (onComplete) {
              onComplete(result, variables)
            }
          })
          .catch((_error: unknown) => {
            setError(_error)
            if (onError) {
              onError(_error)
            }
          })
          .finally(() => {
            loadingRef.current = false
            setLoading(false)
          })
      }
    },
    [adapter, beforeFire, onComplete, onError, operation],
  )

  return { data, loading, error, fireOperation }
}
