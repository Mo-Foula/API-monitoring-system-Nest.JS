import { RoleAbstract } from 'src/auth/roles/entities/role.entity.abstract'

export class CreateUserDto {
  email: string
  password: string
  phone: string
  role: RoleAbstract
  firstName: string
  lastName: string
}
