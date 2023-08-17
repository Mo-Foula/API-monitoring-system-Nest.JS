import { Model, Document, FilterQuery, Schema } from 'mongoose'
import { IRepository } from '../general_interfaces/IRepository.interface'
import { FindFilter } from 'src/general_interfaces/findAllFilter.interface'

export class MongooseRepository<T extends Document> implements IRepository<T> {
  constructor(private readonly model: Model<T>) {}
  aggregate(args: any) {
    return this.model.aggregate(args)
  }
  async remove(filterQuery: FilterQuery<T>) {
    this.model.deleteMany(filterQuery, {
      new: true,
    })
  }

  async findOne(filterQuery: FilterQuery<T>): Promise<T | undefined> {
    return this.model.findOne(filterQuery)
  }

  async findById(id: Schema.Types.ObjectId): Promise<T | undefined> {
    return this.model.findById(id)
  }
  async findAll(filter: FindFilter): Promise<T[] | undefined> {
    return this.model
      .find(filter.filterQuery)
      .skip(filter.pagination.limit * (filter.pagination.page - 1))
      .limit(filter.pagination.limit)
  }
  async update(id: any, updatedT: Partial<T>): Promise<T> {
    console.log('Hello')
    return this.model.findOneAndUpdate(id, updatedT, { new: true })
  }

  async create(data: Partial<T>): Promise<T> {
    const createdItem = new this.model(data)
    return createdItem.save({})
  }
}
