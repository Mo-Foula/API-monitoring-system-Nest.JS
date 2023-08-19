import { Module, forwardRef } from '@nestjs/common'
import { InspectionService } from './inspection.service'
import { InspectionController } from './inspection.controller'
import { InspectionSchema } from './entities/inspection.entity'
import { MongooseModule } from '@nestjs/mongoose'
import { InspectionAbstract } from './interfaces/inspection.entity.abstract'
import { UsersModule } from 'src/auth/users/users.module'
import { AuthModule } from 'src/auth/auth.module'
import { SchedulerService } from 'src/scheduler/scheduler.service'
import { RequestsClientService } from 'src/requests_client/requests_client.service'
import { HttpClientService } from 'src/requests_client/http_client/http_client.service'
import { AlertingService } from 'src/alerting/alerting.service'
import { ReportModule } from 'src/report/report.module'
import { EmailNotificationModule } from 'src/email-notification/email-notification.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InspectionAbstract.nameDI, schema: InspectionSchema },
    ]),
    AuthModule,
    UsersModule,
    EmailNotificationModule,
  ],
  controllers: [InspectionController],
  providers: [
    InspectionService,
    SchedulerService,
    RequestsClientService,
    HttpClientService,
    AlertingService,
  ],
  exports: [InspectionService],
})
export class InspectionModule {}
