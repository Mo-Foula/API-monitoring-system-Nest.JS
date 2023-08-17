import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ClaimAbstract } from './claim.entity.abstract'
import { Schema as SchemaTypes } from 'mongoose'

@Schema({ collection: 'Claims' })
export class Claim extends ClaimAbstract {
  @Prop()
  name: string

  @Prop()
  moduleName: string

  @Prop()
  read: boolean

  @Prop()
  create: boolean

  @Prop()
  update: boolean

  @Prop()
  delete: boolean

  @Prop({ default: () => new Date() })
  createdAt?: Date

  @Prop({ default: () => new Date() })
  updatedAt?: Date
}

export const ClaimSchema = SchemaFactory.createForClass(Claim)
