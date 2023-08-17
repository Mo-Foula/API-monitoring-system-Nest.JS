import { PartialType } from '@nestjs/mapped-types'
import { CreateInspectionDto } from './create-inspection.dto'

export class UpdateInspectionDto extends PartialType(CreateInspectionDto) {}
