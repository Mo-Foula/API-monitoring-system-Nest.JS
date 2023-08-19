import { MailerService } from '@nestjs-modules/mailer'
import { Injectable, NotFoundException } from '@nestjs/common'
import { UserAbstract } from 'src/auth/users/entities/user.entity.abstract'
import { UsersService } from 'src/auth/users/users.service'
import { AlertData } from 'src/general_interfaces/alert.data.interface'
import { INotificationClient } from 'src/general_interfaces/notification.client.interface'
import { Inspection } from 'src/inspection/entities/inspection.entity'

@Injectable()
export class EmailNotificationService implements INotificationClient {
  constructor(private mailerService: MailerService) {}

  getName() {
    return EmailNotificationService.name
  }

  async sendAlert(alertData: AlertData): Promise<boolean | void> {
    const user = alertData.user

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const userEmail: string = user.email
    const url = alertData.inspection.url
    const userName = user.firstName + ' ' + user.lastName // TODO GET USER
    const downtime = alertData.report.downtime // TODO downtime
    const protocol = alertData.inspection.protocol
    const port = alertData.inspection.port
    const path = alertData.inspection.path
    if (!userEmail) {
      throw new NotFoundException('Email not found')
    }

    return this.mailerService.sendMail({
      to: userEmail,
      // from: this.senderEmail, // override default from
      subject: 'A website you are watching went down',
      template: './alert', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        userName,
        url,
        downtime,
        inspectionName: Inspection.name,
        fullurl:
          protocol.toLowerCase() + '://' + url ?? '' + port
            ? ':' + port
            : '' + path ?? '',
        port,
        path,
        protocol,
      },
    })
  }

  // TODO: incomplete
  async sendUserConfirmation(user: UserAbstract, token: string) {
    const url = `example.com/auth/confirm?token=${token}`

    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './email.confirmation', // `.hbs` extension is appended automatically
      context: {
        name: user.firstName + ' ' + user.lastName,
        url,
      },
    })
  }
}
