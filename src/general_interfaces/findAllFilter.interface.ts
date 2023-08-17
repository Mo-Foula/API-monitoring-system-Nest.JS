import { PaginationOptions } from './pagination.interface'

export interface FindFilter {
  pagination?: PaginationOptions

  filterQuery?: any
}
