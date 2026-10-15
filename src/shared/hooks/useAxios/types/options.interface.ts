export interface IOptions<T, K = unknown> {
  beforeFire?: () => void
  onComplete?: (data: T, variables: K[]) => void
  onError?: (error: unknown) => void
  initData?: T | null
}
