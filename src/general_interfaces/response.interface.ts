import { InspectionAbstract } from 'src/inspection/interfaces/inspection.entity.abstract'

export interface InspectionResult {
  inspection?: InspectionAbstract
  statusCode: number
  responseTime: number
  statusText: string
}
