export type OperationType<T> = (...variables: unknown[]) => Promise<T>
