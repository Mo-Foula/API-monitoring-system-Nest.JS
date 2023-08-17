import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ClaimAbstract } from 'src/auth/claims/entities/claim.entity.abstract'
import { UserAbstract } from 'src/auth/users/entities/user.entity.abstract'
import { RoleAbstract } from './role.entity.abstract'
import { Schema as SchemaTypes } from 'mongoose'

@Schema({ collection: 'Roles' })
export class Role extends RoleAbstract {
  @Prop()
  name: string

  @Prop({ type: [{ type: SchemaTypes.Types.ObjectId, ref: 'Claims' }] })
  claims: ClaimAbstract[]

  @Prop({ default: () => new Date() })
  createdAt?: Date

  @Prop({ default: () => new Date() })
  updatedAt?: Date
}

export const RoleSchema = SchemaFactory.createForClass(Role)
