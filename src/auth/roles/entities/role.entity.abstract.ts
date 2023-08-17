import { ClaimAbstract } from 'src/auth/claims/entities/claim.entity.abstract'

export abstract class RoleAbstract {
  static nameDI = 'RoleEntity'
  _id?: any

  name: string

  claims: ClaimAbstract[]

  createdAt?: Date

  updatedAt?: Date
}
