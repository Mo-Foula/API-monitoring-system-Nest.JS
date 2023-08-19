import { Logger, Module, forwardRef } from '@nestjs/common'
import { AlertingService } from './alerting.service'
import { EmailNotificationService } from '../email-notification/email-notification.service'
import { EmailNotificationModule } from '../email-notification/email-notification.module'
import {
  INotificationClient,
  notificationClientsDIKey,
} from 'src/general_interfaces/notification.client.interface'
import { MailerService } from '@nestjs-modules/mailer'

@Module({
  imports: [
    // AuthModule,
    // UsersModule,
    // forwardRef(() => EmailNotificationModule),
    EmailNotificationModule,
  ],
  providers: [
    AlertingService,
    Logger,
    EmailNotificationService,
    // EmailNotificationService,
    // {
    //   provide: notificationClientsDIKey,
    //   useFactory: (notificationClients: [INotificationClient]) =>
    //     new AlertingService(notificationClients),
    //   inject: [EmailNotificationService],
    // },

    // {
    //   provide: notificationClientsDIKey,
    //   useFactory: (...parsers) => new AlertingService(parsers),
    //   inject: [EmailNotificationService],
    // },

    // EmailNotificationService,
    // {
    //   provide: notificationClientsDIKey,
    //   // useValue: [EmailNotificationService],
    //   useFactory(args: INotificationClient[]) {
    //     return args
    //   },
    //   inject: [EmailNotificationService],
    // },
    // {
    //   provide: notificationClientsDIKey,
    //   useClass: EmailNotificationService,
    // },
  ],
  exports: [AlertingService],
})
export class AlertingModule {}
