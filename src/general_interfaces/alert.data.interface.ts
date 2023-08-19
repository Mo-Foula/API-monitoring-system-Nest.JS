import { UserAbstract } from 'src/auth/users/entities/user.entity.abstract'
import { InspectionAbstract } from 'src/inspection/interfaces/inspection.entity.abstract'
import { ReportAbstract } from 'src/report/interfaces/report.entity.abstract'

export interface AlertData {
  inspection?: InspectionAbstract
  report?: Partial<ReportAbstract>
  user?: UserAbstract
}
