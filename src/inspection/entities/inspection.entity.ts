import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { InspectionAbstract } from '../interfaces/inspection.entity.abstract'
import { Schema as SchemaTypes } from 'mongoose'
import { InspectionLogs } from './inspectionLogs.entity'

@Schema({ collection: 'Inspections' })
export class Inspection extends InspectionAbstract {
  @Prop({ type: SchemaTypes.Types.ObjectId, ref: 'Users' })
  user?: SchemaTypes.Types.ObjectId

  @Prop()
  name: string

  @Prop()
  url: string

  @Prop({ enum: ['HTTP', 'HTTPS', 'TCP'] })
  protocol: 'HTTP' | 'HTTPS' | 'TCP'

  @Prop()
  path?: string

  @Prop()
  port?: number

  @Prop()
  webhook?: string

  @Prop()
  timeout?: number

  @Prop()
  interval?: number

  @Prop()
  threshold?: number

  @Prop({ type: Map<string, string> })
  httpHeaders?: Map<string, string>

  @Prop()
  assert?: number

  @Prop({ type: Array<string> })
  tags?: string[]

  @Prop()
  ignoreSSL?: boolean

  @Prop()
  jobId?: string

  @Prop({ type: { username: String, password: String } })
  authentication?: { username: string; password: string }

  @Prop({
    type: [
      {
        createdAt: Date,
        responseTime: Number,
        statusCode: Number,
        statusText: String,
      },
    ],
    default: [],
  })
  logs?: [InspectionLogs]
}

export const InspectionSchema = SchemaFactory.createForClass(Inspection)
InspectionSchema.index({ user: 1, name: 1 }, { unique: true })

// import mongoose, { Schema } from 'mongoose';
// import { IInspectionDocument } from '../interfaces/inspection.document.interface';

// const InspectionSchema = new Schema<IInspectionDocument>(
//   {
//     _id: { type: Schema.Types.ObjectId },
//     name: { type: String, required: true },
//     url: { type: String, required: true },
//     protocol: { type: String, enum: ['HTTP', 'HTTPS', 'TCP'], required: true },
//     path: { type: String },
//     port: { type: Number },
//     webhook: { type: String },
//     timeout: { type: Number, default: 5 },
//     interval: { type: Number, default: 10 },
//     threshold: { type: Number, default: 1 },
//     httpHeaders: { type: Map, of: String },
//     assert: { type: Number },
//     tags: { type: [String] },
//     ignoreSSL: { type: Boolean },
//   },
//   {
//     timestamps: true, // Adds createdAt and updatedAt fields
//   },
// );

// const InspectionModel = mongoose.model<IInspectionDocument>(
//   'Inspection',
//   InspectionSchema,
// );

// export default InspectionModel;
