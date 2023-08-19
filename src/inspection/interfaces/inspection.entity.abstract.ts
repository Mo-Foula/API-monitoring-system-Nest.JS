import { UserAbstract } from 'src/auth/users/entities/user.entity.abstract'
import { InspectionLogsAbstract } from './inspectionLogs.entity.abstract'

export abstract class InspectionAbstract {
  static nameDI = 'InspectionEntity'
  _id?: any
  name: string
  url: string
  protocol: 'HTTP' | 'HTTPS' | 'TCP'
  path?: string // A specific path to be monitored (optional).
  port?: number // The server port number (optional).
  webhook?: string // A webhook URL to receive a notification on (optional).
  timeout?: number // In seconds (defaults to 5 seconds): The timeout of the polling request (optional).
  interval?: number // In minutes (defaults to 10 minutes): The time interval for polling requests (optional).
  threshold?: number // (defaults to 1 failure): The threshold of failed requests that will create an alert (optional).
  // authentication?: Authentication;
  httpHeaders?: Map<string, string>
  assert?: any
  tags?: string[]
  ignoreSSL?: boolean
  user?: any
  jobId?: any
  authentication?: { username: string; password: string }
  logs?: [InspectionLogsAbstract]
}
// import mongoose, { Schema, Document } from 'mongoose'

// const OtpSchema: Schema = new Schema({
//     key : { type: String, required: true, trim: true, unique: true},
// 	otp: { type: String, required: true, trim: true },
// 	token: { type: String, required: true},
// 	expireAt: { type: Date, default: Date.now },
// 	verified: {type: Boolean, default: false},
// 	trials: {type: Number, required: true, default: 0}
// },{
// 	timestamps: true
// })

// export interface IOtpDocument extends IOtp, Document {}

// export default mongoose.model<IOtpDocument>('Otp', OtpSchema);
