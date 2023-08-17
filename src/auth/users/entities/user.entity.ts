import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as SchemaTypes } from 'mongoose'
import { UserAbstract } from './user.entity.abstract'
import { RoleAbstract } from 'src/auth/roles/entities/role.entity.abstract'

@Schema({ collection: 'Users' })
export class User extends UserAbstract {
  @Prop()
  email: string

  @Prop()
  phone: string

  @Prop()
  password: string

  @Prop()
  firstName: string

  @Prop()
  lastName: string

  @Prop({ type: [{ type: SchemaTypes.Types.ObjectId, ref: 'Roles' }] })
  role: RoleAbstract

  @Prop({ default: () => new Date() })
  createdAt?: Date

  @Prop({ default: () => new Date() })
  updatedAt?: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
