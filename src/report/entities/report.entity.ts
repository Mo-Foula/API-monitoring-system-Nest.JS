import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ReportAbstract } from '../interfaces/report.entity.abstract'
import { Schema as SchemaTypes } from 'mongoose'
import { InspectionAbstract } from 'src/inspection/interfaces/inspection.entity.abstract'

@Schema({ collection: 'Reports' })
export class Report extends ReportAbstract {
  @Prop()
  status: string

  @Prop()
  availability: number

  @Prop()
  outages: number

  @Prop()
  downtime: number

  @Prop()
  uptime: number

  @Prop()
  responseTime: number

  @Prop({ type: [{ type: SchemaTypes.Types.ObjectId, ref: 'Inspections' }] })
  inspections: [InspectionAbstract]
}

export const ReportSchema = SchemaFactory.createForClass(Report)

// import mongoose, { Schema } from 'mongoose';
// import { IReportDocument } from '../interfaces/report.document.interface';

// const ReportSchema = new Schema<IReportDocument>(
//   {
//     _id: { type: Schema.Types.ObjectId },
//     status: { type: String, required: true },
//     availability: { type: Number, required: true, default: 0 },
//     outages: { type: Number, required: true, default: 0 },
//     downtime: { type: Number, required: true, default: 0 },
//     uptime: { type: Number, required: true, default: 0 },
//     responseTime: { type: Number, required: true },
//     inspections: [{ type: Schema.Types.ObjectId, ref: 'History' }],
//   },
//   {
//     timestamps: true,
//   },
// );

// const Report = mongoose.model<IReportDocument>('Report', ReportSchema);
// export default Report;
