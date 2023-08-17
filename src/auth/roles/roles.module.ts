import { Module } from '@nestjs/common'
import { RolesService } from './roles.service'
import { RolesController } from './roles.controller'
import { RoleSchema } from './entities/role.entity'
import { RoleAbstract } from './entities/role.entity.abstract'
import { MongooseModule } from '@nestjs/mongoose'
import { ClaimsModule } from '../claims/claims.module'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoleAbstract.nameDI, schema: RoleSchema },
    ]),
    ClaimsModule,
    UsersModule,
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
