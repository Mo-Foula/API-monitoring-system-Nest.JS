import { AlertData } from './alert.data.interface'

export const notificationClientsDIKey = 'notificationServicesDIKey'

export interface INotificationClient {
  getName(): string
  sendAlert(alertData: AlertData): Promise<boolean | void>
}

export function isInstanceOfINotificationClient(
  object: INotificationClient,
): object is INotificationClient {
  return 'getName' in object && 'sendAlert' in object
}
