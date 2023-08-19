import { Module } from '@nestjs/common'
import { EmailNotificationService } from './email-notification.service'
import { MailerModule } from '@nestjs-modules/mailer'
import { join } from 'path'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { UsersModule } from 'src/auth/users/users.module'
import * as dotenv from 'dotenv'

dotenv.config()

const { MAIL_HOST, MAIL_USER, MAIL_PASSWORD, MAIL_FROM, MAIL_PORT } =
  process.env

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: MAIL_HOST,
        secure: false,
        port: MAIL_PORT && parseInt(MAIL_PORT),
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASSWORD,
        },
      },
      defaults: {
        from: MAIL_FROM,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [EmailNotificationService],
  exports: [EmailNotificationService],
})
export class EmailNotificationModule {}
