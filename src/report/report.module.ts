import { Module } from '@nestjs/common'
import { ReportService } from './report.service'
import { ReportController } from './report.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from 'src/auth/auth.module'
import { UsersModule } from 'src/auth/users/users.module'
import { ReportAbstract } from './interfaces/report.entity.abstract'
import { ReportSchema } from './entities/report.entity'
import { InspectionModule } from 'src/inspection/inspection.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReportAbstract.nameDI, schema: ReportSchema },
    ]),
    AuthModule,
    UsersModule,
    InspectionModule,
  ],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
