export type FindAllResponse<T> = {
  total: number
  items: Array<T>
  page: number
  pages: number
}
