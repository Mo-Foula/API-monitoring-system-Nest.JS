import { ReportAbstract } from './interfaces/report.entity.abstract'
import { InspectionLogsAbstract } from 'src/inspection/interfaces/inspectionLogs.entity.abstract'
import { InspectionAbstract } from 'src/inspection/interfaces/inspection.entity.abstract'

export class ReportUtils {
  static checkStatus(status: number, assert?: number): boolean {
    return (assert && status == assert) || (!assert && status / 100 == 2)
  }

  static calculateReportDataFromLogs(
    logs: InspectionLogsAbstract[],
    assert?: number,
  ): Partial<ReportAbstract> | undefined {
    if (!logs || !logs.length) return undefined
    let totalResponseTime = 0
    let outages = 0
    let uptime = 0
    let downtime = 0

    let previousStatus: boolean = undefined

    for (let i = logs.length - 1; i >= 0; i--) {
      totalResponseTime += logs[i].responseTime

      const statusCode = logs[i].statusCode

      const status = ReportUtils.checkStatus(statusCode, assert)

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
      status: ReportUtils.checkStatus(currentStatus, assert)
        ? 'Available'
        : 'Not Available',
      statusCode: currentStatus,
    }

    return reportData
  }

  static createReportFromInspection(
    inspection: InspectionAbstract,
  ): Partial<ReportAbstract> {
    const reportData = this.calculateReportDataFromLogs(
      inspection.logs,
      inspection.assert,
    )

    return {
      ...reportData,
      uptime: reportData.uptime * inspection.interval,
      downtime: reportData.downtime * inspection.interval,
      status: reportData.status,
    }
  }
}
