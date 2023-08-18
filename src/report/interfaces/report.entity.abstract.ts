import { InspectionAbstract } from 'src/inspection/interfaces/inspection.entity.abstract'
import { InspectionLogsAbstract } from 'src/inspection/interfaces/inspectionLogs.entity.abstract'

export abstract class ReportAbstract {
  static nameDI = 'ReportEntity'
  _id?: any
  status: string // The current status of the URL.
  availability: number // A percentage of the URL availability.
  outages: number // The total number of URL downtimes.
  downtime: number // The total time, in seconds, of the URL downtime.
  uptime: number // The total time, in seconds, of the URL uptime.
  responseTime: number // The average response time for the URL.
  inspection: InspectionAbstract
  history: InspectionLogsAbstract[] // Timestamped logs of the polling requests.
}
