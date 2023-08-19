import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { InspectionModule } from './inspection/inspection.module'
import { ReportModule } from './report/report.module'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { RolesModule } from './auth/roles/roles.module'
import { UsersModule } from './auth/users/users.module'
import { ClaimsModule } from './auth/claims/claims.module'
import { SchedulerService } from './scheduler/scheduler.service'
import { RequestsClientService } from './requests_client/requests_client.service'
import { HttpClientService } from './requests_client/http_client/http_client.service'
import { TcpClientService } from './requests_client/tcp_client/tcp_client.service'
import { AlertingModule } from './alerting/alerting.module'
import * as dotenv from 'dotenv'
import { EmailNotificationModule } from './email-notification/email-notification.module'

dotenv.config()
const {
  MONGO_HOST,
  MONGO_PORT,
  MONGO_INITDB_USERNAME,
  MONGO_INITDB_PASSWORD,
  MONGO_DB,
} = process.env

const mongoConnectionString = `mongodb://${MONGO_INITDB_USERNAME}:${MONGO_INITDB_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/?authMechanism=SCRAM-SHA-1`

@Module({
  imports: [
    MongooseModule.forRoot(mongoConnectionString, {
      // authMechanism: 'SCRAM-SHA-256',
      dbName: MONGO_DB,
    }),
    // forwardRef(() => InspectionModule),
    ReportModule,
    InspectionModule,
    AuthModule,
    RolesModule,
    UsersModule,
    ClaimsModule,
    AlertingModule,
    EmailNotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SchedulerService,
    RequestsClientService,
    TcpClientService,
    HttpClientService,
    // {
    //   provide: notificationServicesDIKey,
    //   useFactory: (emailNotificationService: EmailNotificationService) => {
    //     return [EmailNotificationService]
    //   },
    //   inject: [EmailNotificationService],
    // },
    // AlertingService,
    // {
    //   provide: notificationServicesDIKey,
    //   useClass: EmailNotificationService,
    // },
  ],
})
export class AppModule {}
