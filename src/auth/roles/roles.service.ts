import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { ClaimActions } from '../claims/constants'
// import { arrayToObject } from 'src/utils/array.to.object.utils'
import { RoleAbstract } from './entities/role.entity.abstract'
import { InjectModel } from '@nestjs/mongoose'
import { IRepository } from 'src/general_interfaces/IRepository.interface'
import { arrayToObject } from 'src/utils/array.to.object.utils'
import { FilterQuery } from 'mongoose'
import { UserAbstract } from '../users/entities/user.entity.abstract'
import { ClaimsService } from '../claims/claims.service'
import { UsersService } from '../users/users.service'

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(RoleAbstract.nameDI)
    private rolesRepo: IRepository<RoleAbstract>,
    private usersService: UsersService,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    return this.rolesRepo.create(createRoleDto)
  }

  findAll() {
    return `This action returns all roles`
  }

  async findById(id: any) {
    return this.rolesRepo.findById(id)
  }

  async findOne(filter: any) {
    return this.rolesRepo.findOne(filter)
  }

  async findOneByUserId(userId: any) {
    const user = await this.usersService.findOneById(userId)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return this.rolesRepo.findById(user.role)
  }

  async findOneByRoleName(name: string): Promise<RoleAbstract | undefined> {
    return await this.rolesRepo.findOne({
      name,
    })
  }

  // async isUserAuthorizedForClaim(
  //   moduleName: string,
  //   actions: ClaimActions[],
  //   userId: number,
  // ) {
  //   const user = await this.usersService.findUsersWithClaim({
  //     actions,
  //     moduleName,
  //     userId,
  //   })
  //   // const claimActions = arrayToObject(actions)

  //   // const user = await this.usersService.findOneById(userId)

  //   // if (!user) {
  //   //   throw new NotFoundException('User is not found')
  //   // }

  //   // const claim = await this.claimsService.findOne({
  //   //   moduleName,
  //   //   ...claimActions,
  //   // })

  //   // if (!claim) {
  //   //   throw new NotFoundException('Claim is not found')
  //   // }

  //   // const filter: FilterQuery<RoleAbstract> = {
  //   //   claims: claim._id,
  //   // }

  //   return user ? true : false
  // }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return await this.rolesRepo.update(id, updateRoleDto)
  }

  remove(id: number) {
    return `This action removes a #${id} role`
  }
}
