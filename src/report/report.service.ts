import { Injectable } from '@nestjs/common'
import { CreateReportDto } from './dto/create-report.dto'
import { UpdateReportDto } from './dto/update-report.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ReportAbstract } from './interfaces/report.entity.abstract'
import { InspectionService } from 'src/inspection/inspection.service'
import { InspectionLogsAbstract } from 'src/inspection/interfaces/inspectionLogs.entity.abstract'
import { InspectionAbstract } from 'src/inspection/interfaces/inspection.entity.abstract'

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(ReportAbstract.nameDI)
    private reportRepo: Model<ReportAbstract>,
    private inspectionService: InspectionService,
  ) {}

  create(createReportDto: CreateReportDto) {
    return 'This action adds a new report'
  }

  findAll() {
    return `This action returns all report`
  }

  findOne(id: any) {
    return this.reportRepo.findById(id)
  }

  checkStatus(status: number): boolean {
    return status / 100 == 2
  }

  private calculateReportDataFromLogs(
    logs: InspectionLogsAbstract[],
  ): Partial<ReportAbstract> | undefined {
    if (!logs || !logs.length) return undefined
    let totalResponseTime = 0
    let outages = 0
    let uptime = 0
    let downtime = 0

    let previousStatus: boolean = undefined

    for (let i = logs.length - 1; i >= 0; i--) {
      totalResponseTime += logs[i].responseTime

      const status = this.checkStatus(logs[i].statusCode)

      outages += status ? 0 : 1

      if (previousStatus === status) {
        if (status) uptime++
        else downtime++
      } else previousStatus = status
    }

    const logsCount = logs.length
    const availability = ((logsCount - outages) * 100) / logsCount
    const history = logs
    const responseTime = totalResponseTime / logsCount
    const currentStatus = logs[0].statusCode

    const reportData: Partial<ReportAbstract> = {
      history,
      outages,
      uptime,
      downtime,
      availability,
      responseTime,
      status: this.checkStatus(currentStatus) ? 'Available' : 'Not Available',
    }

    return reportData
  }

  private createReportFromInspection(
    inspection: InspectionAbstract,
  ): Partial<ReportAbstract> {
    const reportData = this.calculateReportDataFromLogs(inspection.logs)

    return {
      ...reportData,
      uptime: reportData.uptime * inspection.interval,
      downtime: reportData.downtime * inspection.interval,
      status: reportData.status,
    }
  }

  async findOneByInspection(inspectionId: any) {
    const inspection = await this.inspectionService.findById(inspectionId)

    const report: Partial<ReportAbstract> =
      this.createReportFromInspection(inspection)

    this.reportRepo.create(report)

    return report
  }

  update(id: any, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`
  }

  remove(id: any) {
    return `This action removes a #${id} report`
  }
}
