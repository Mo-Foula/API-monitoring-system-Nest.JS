import { Module, forwardRef } from '@nestjs/common'
import { ClaimsService } from './claims.service'
import { ClaimsController } from './claims.controller'
import { Claim, ClaimSchema } from './entities/claim.entity'
import { ClaimAbstract } from './entities/claim.entity.abstract'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from '../auth.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClaimAbstract.nameDI, schema: ClaimSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ClaimsController],
  providers: [ClaimsService],
  exports: [ClaimsService],
})
export class ClaimsModule {}
