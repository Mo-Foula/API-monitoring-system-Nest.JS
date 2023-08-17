import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { InspectionLogsAbstract } from '../interfaces/inspectionLogs.entity.abstract'
import { Schema as SchemaTypes } from 'mongoose'

// @Schema({ collection: 'InspectionLogs' })
export class InspectionLogs extends InspectionLogsAbstract {
  // @Prop({ type: SchemaTypes.Types.ObjectId })
  // _id?: any

  // @Prop({ type: Date, default: Date.now })
  createdAt?: Date

  // @Prop({ type: Number })
  responseTime?: number

  // @Prop({ type: Boolean })
  statusCode?: boolean
}

export const InspectionLogsSchema = SchemaFactory.createForClass(InspectionLogs)
