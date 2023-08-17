import { Injectable } from '@nestjs/common'
import { CronJob } from 'cron'
import { InspectionResult } from 'src/general_interfaces/response.interface'
import { InspectionAbstract } from 'src/inspection/interfaces/inspection.entity.abstract'
import { RequestsClientService } from 'src/requests_client/requests_client.service'

@Injectable()
export class SchedulerService {
  constructor(private requestsClientService: RequestsClientService) {}

  private static jobs = new Map<string, CronJob>()

  private prepareNumberToCronString(num: number | undefined): string {
    let generatedString = '*'
    if (num) {
      generatedString = `*/${num}`
    }
    return generatedString
  }

  private prepareCronString(inspection: InspectionAbstract): string {
    let minutes = inspection.interval
    let hours: number, days: number

    if (minutes) {
      hours = Math.floor(minutes / 60)
      minutes = minutes % 60

      days = Math.floor(hours / 24)
      hours = hours % 24
    } else {
      minutes = 10
    }

    const hoursCron = this.prepareNumberToCronString(hours)
    const daysCron = this.prepareNumberToCronString(days)

    // return `0 */${minutes} ${hoursCron} ${daysCron} * *`
    return `*/15 * ${hoursCron} ${daysCron} * *`
  }

  createJob(
    inspection: InspectionAbstract,
    onCompleteUpdate: (inspectionResult: InspectionResult) => void,
    start = false,
  ): CronJob {
    const cron = this.prepareCronString(inspection)

    const makeRequest = this.requestsClientService.createRequest.bind(
      this.requestsClientService,
    )

    const newJob = new CronJob(
      cron,
      async function () {
        console.log('You will see this message every 1 minute')
        const result = await makeRequest(inspection)
        onCompleteUpdate(result)
      }.bind(this),
      null,
      start,
    )
    SchedulerService.jobs.set(inspection._id, newJob)

    return newJob
  }

  getJobById(param: InspectionAbstract | string): CronJob {
    let id

    if (typeof param === 'string') {
      id = param // `param` is a string
    } else if (param._id) {
      id = param._id // `param` is an object with an `id` property
    } else {
      throw new Error('Invalid parameter') // Handle other cases as needed
    }

    return SchedulerService.jobs.get(id)
  }

  startJob(job: CronJob): void {
    job.start()
  }

  stopJob(job: CronJob): void {
    job.stop()
  }
}
