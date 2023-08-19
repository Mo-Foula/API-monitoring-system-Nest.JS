import { InspectionAbstract } from '../interfaces/inspection.entity.abstract'

export class CreateInspectionDto extends InspectionAbstract {
  userId: any
  assert?: {
    statusCode: number
  }
}
