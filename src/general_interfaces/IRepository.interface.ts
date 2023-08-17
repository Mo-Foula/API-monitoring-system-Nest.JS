import { FindFilter } from './findAllFilter.interface'

export interface IRepository<T> {
  findById(id: any): Promise<T | undefined>
  findAll(filter: FindFilter): Promise<T[] | undefined>
  findOne(filterQuery: any): Promise<T | undefined>
  create(newT: T): Promise<T | void>
  update(id: any, updatedT: Partial<T>): Promise<T | void>
  remove(filterQuery: any): Promise<T | T[] | void>
  aggregate(args: any): any
}
