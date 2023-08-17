import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { UserAbstract } from './entities/user.entity.abstract'
import { UserSchema } from './entities/user.entity'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserAbstract.nameDI, schema: UserSchema },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
