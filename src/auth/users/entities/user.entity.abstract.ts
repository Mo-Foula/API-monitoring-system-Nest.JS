import { RoleAbstract } from 'src/auth/roles/entities/role.entity.abstract'

export abstract class UserAbstract {
  static nameDI = 'UserEntity'
   _id?: any

  email: string

  firstName: string

  lastName: string

  phone: string

  password?: string

  role: RoleAbstract

  createdAt?: Date

  updatedAt?: Date
}
