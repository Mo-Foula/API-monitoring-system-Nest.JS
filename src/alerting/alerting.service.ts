import { Inject, Injectable, Logger } from '@nestjs/common'
import { EmailNotificationService } from 'src/email-notification/email-notification.service'
import { AlertData } from 'src/general_interfaces/alert.data.interface'
import {
  INotificationClient,
  isInstanceOfINotificationClient,
  notificationClientsDIKey,
} from 'src/general_interfaces/notification.client.interface'

@Injectable()
export class AlertingService {
  constructor(private emailNotificationService: EmailNotificationService) {
    for (const client of Object.values(this)) {
      if (isInstanceOfINotificationClient(client)) {
        this.notificationClients.push(client)
      }
    }
  }

  private readonly notificationClients: INotificationClient[] = []
  private readonly logger = new Logger(AlertingService.name)

  async alertDownService(alertData: AlertData) {
    for (const client of this.notificationClients) {
      try {
        client.sendAlert(alertData).then((value: any) => {
          this.logger.log('Sent alert notification details:')
          this.logger.log(value)
        })
      } catch (error) {
        this.logger.error('Could not send alert for client ' + client.getName())
      }
    }
  }
}
