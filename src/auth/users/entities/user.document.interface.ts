import { UserAbstract } from './user.entity.abstract'
import { HydratedDocument } from 'mongoose'
export type UserDocument = HydratedDocument<UserAbstract>
