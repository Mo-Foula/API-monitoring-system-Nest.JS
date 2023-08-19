import { Injectable, Logger } from '@nestjs/common'
import { UserAbstract } from './entities/user.entity.abstract'
import { InjectModel } from '@nestjs/mongoose'
import { IRepository } from 'src/general_interfaces/IRepository.interface'
import { CreateUserDto } from './dto/create-user.dto'
import { FilterQuery } from 'mongoose'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserAbstract.nameDI)
    private usersRepo: IRepository<UserAbstract>,
  ) {}

  private readonly logger = new Logger(UsersService.name)

  async create(createUserDto: CreateUserDto): Promise<UserAbstract | void> {
    this.logger.log('Adding new auth user')
    const user = await this.usersRepo.create(createUserDto)

    if (!user) return

    delete user.password
    return user
  }

  async findAll(): Promise<UserAbstract[]> {
    return []
    // return this.usersRepo.findAll({})
  }

  async findOneById(id: any): Promise<UserAbstract | undefined> {
    return this.usersRepo.findById(id)
  }

  async findOneByEmailOrPhone({
    email,
    phone,
  }: {
    email?: string
    phone?: string
  }): Promise<UserAbstract | null> {
    const filter: FilterQuery<UserAbstract> = {
      $or: [{ email }, { phone }],
    }
    return this.usersRepo.findOne(filter)
  }

  async remove(id: any): Promise<void> {
    await this.usersRepo.remove(id)
  }

  // async findUsersWithClaim({
  //   actions,
  //   moduleName,
  //   userId,
  // }: {
  //   userId: any
  //   moduleName: string
  //   actions: ClaimActions[]
  // }): Promise<UserAbstract> {
  //   const claimActions = arrayToObject(actions)

  //   const user = await this.usersService.findOneById(userId)

  //   if (!user) {
  //     throw new NotFoundException('User is not found')
  //   }

  //   const claims = await this.claimsService.findOne({
  //     moduleName,
  //     ...claimActions,
  //   })

  //   if (!claims) {
  //     throw new NotFoundException('Claim is not found')
  //   }

  //   // const filter: FilterQuery<RoleAbstract> = {
  //   //   claims: claim._id,
  //   // }

  //   // const claimActions = arrayToObject(actions)

  //   // const claimFilter: FilterQuery<ClaimAbstract> = {
  //   //   moduleName,
  //   //   ...claimActions,
  //   // }

  //   // const userFilter: FilterQuery<UserAbstract> = {
  //   //   _id: userId,
  //   //   role: {
  //   //     claims: claimFilter,
  //   //   },
  //   //   // 'role.claims': {
  //   //   //   $elemMatch: claimFilter,
  //   //   // },
  //   // }

  //   // return this.usersRepo.aggregate([
  //   //   {
  //   //     $match: {
  //   //       _id: userId,
  //   //       role: {
  //   //         claims: {
  //   //           $elemMatch: {
  //   //             moduleName: moduleName,
  //   //             ...claimActions,
  //   //           },
  //   //         },
  //   //       },
  //   //     },
  //   //   },
  //   // ])
  //   // return this.usersRepo.findOne({
  //   //   role:
  //   // })
  //   // return this.usersRepo.findOne(userFilter)
  // }

  async update(id: any, updatedUser: any) {
    return await this.usersRepo.update(id, updatedUser)
  }
}
