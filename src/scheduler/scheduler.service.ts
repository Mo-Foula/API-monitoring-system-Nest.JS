import { Injectable } from '@nestjs/common'
import { CronJob } from 'cron'
import { UserAbstract } from 'src/auth/users/entities/user.entity.abstract'
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
    onCompleteUpdate: (
      inspectionResult: InspectionResult,
      user: UserAbstract,
    ) => void,
    user: UserAbstract,
    start = false,
  ): CronJob {
    const cron = this.prepareCronString(inspection)

    const makeRequest = this.requestsClientService.createRequest.bind(
      this.requestsClientService,
    )

    const newJob = new CronJob(
      cron,
      async function () {
        const result: InspectionResult = await makeRequest(inspection)
        onCompleteUpdate(result, user)
      }.bind(this),
      null,
      start,
    )
    SchedulerService.jobs.set(inspection._id.toString(), newJob)

    return newJob
  }

  async getJobByInspectionId(inspectionId: any): Promise<CronJob> {
    return await SchedulerService.jobs.get(inspectionId)
  }

  async removeJob(id: any) {
    const job = await this.getJobByInspectionId(id)
    this.stopJob(job)
    SchedulerService.jobs.delete(id)
    return job
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

  async startJob(job: CronJob): Promise<void> {
    job.start()
  }

  async startJobById(id: any): Promise<void> {
    const job = await this.getJobByInspectionId(id)
    job.start()
  }

  async stopJobById(id: any): Promise<void> {
    const job = await this.getJobByInspectionId(id)
    job.stop()
  }

  async stopJob(job: CronJob): Promise<void> {
    job.stop()
  }
}
