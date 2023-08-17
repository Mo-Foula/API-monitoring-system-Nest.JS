import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { UsersService } from './users/users.service'
import { JwtService } from '@nestjs/jwt'
import { SignInUserDto } from './dto/sign-in-user.dto'
import { SignUpUserDto } from './dto/sign-up-user.dto'
import { RolesService } from './roles/roles.service'
import * as bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'
import { ClaimActions } from 'src/auth/claims/constants'
import { SignUpAdminDto } from './claims/dto/sign-up-admin.dto'
import { arrayToObject } from 'src/utils/array.to.object.utils'
import { FilterQuery } from 'mongoose'
import { RoleAbstract } from './roles/entities/role.entity.abstract'
import { ClaimsService } from './claims/claims.service'

dotenv.config()

@Injectable()
export class AuthService {
  constructor(
    private rolesService: RolesService,
    private usersService: UsersService,
    private claimsService: ClaimsService,
    private jwtService: JwtService,
  ) {}

  private encryptionSalt = 10 //process.env.ENCRYPTION_SALT

  async isRoleAuthorizedForClaim(
    moduleName: string,
    action: ClaimActions,
    userId: number,
  ) {
    const claim = await this.claimsService.findOne({
      moduleName,
      [action]: true,
    })

    if (!claim) {
      throw new NotFoundException('Claim is not found')
    }

    const role = await this.rolesService.findOneByUserId(userId)

    return role.claims.indexOf(claim._id) !== -1
  }

  async login(signInUserDto: SignInUserDto) {
    const { email, password } = signInUserDto
    const user = await this.usersService.findOneByEmailOrPhone({ email })

    if (!user) {
      throw new UnauthorizedException()
    }

    const correctPassword = await this.comparePassword(password, user?.password)

    if (!correctPassword) {
      throw new UnauthorizedException()
    }
    const payload = { userId: user._id, username: user.email }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  private async encryptPassword(password: string) {
    return await bcrypt.hash(password, this.encryptionSalt)
  }

  private async comparePassword(password: string, savedPassword: string) {
    return await bcrypt.compare(password, savedPassword)
  }

  async registerUser(signUpUserDto: SignUpUserDto) {
    const { email, password, phone } = signUpUserDto

    const existingUser = await this.usersService.findOneByEmailOrPhone({
      email,
      phone,
    })

    if (existingUser) {
      throw new UnauthorizedException()
    }

    const hashedPassword = await this.encryptPassword(password)

    const userRole = await this.rolesService.findOneByRoleName('user')

    if (!userRole) {
      throw new BadRequestException('Role not found')
    }
    const newUser = await this.usersService.create({
      email,
      phone,
      password: hashedPassword,
      role: userRole,
      firstName: signUpUserDto.firstName,
      lastName: signUpUserDto.lastName,
    })

    if (newUser) delete newUser.password
    return newUser
  }

  async registerAdmin(signUpAdminDto: SignUpAdminDto) {
    const { email, password, phone } = signUpAdminDto

    const existingUser = await this.usersService.findOneByEmailOrPhone({
      email,
      phone,
    })

    if (existingUser) {
      throw new UnauthorizedException() // TODO change error type
    }

    const hashedPassword = await this.encryptPassword(password)

    const userRole = await this.rolesService.findOneByRoleName('admin')
    const newUser = await this.usersService.create({
      email,
      phone,
      password: hashedPassword,
      role: userRole,
      firstName: signUpAdminDto.firstName,
      lastName: signUpAdminDto.lastName,
    })

    if (newUser) delete newUser.password
    return newUser
  }
}
