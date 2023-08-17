export abstract class ClaimAbstract {
  static nameDI = 'ClaimEntity'
  _id?: any

  name: string

  moduleName: string

  read: boolean

  create: boolean

  update: boolean

  delete: boolean

  createdAt?: Date

  updatedAt?: Date
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
