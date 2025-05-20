import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BaseCondition } from '../condition.schema';
import { HydratedDocument } from 'mongoose';

export type OwnTargetItemConditionDocument =
  HydratedDocument<OwnTargetItemCondition>;

@Schema()
export class OwnTargetItemCondition extends BaseCondition {
  @Prop({ required: true })
  itemId: string; // 아이템 ID
  @Prop({ required: true })
  quantity: number; // 아이템 수량
}

export const OwnTargetItemConditionSchema = SchemaFactory.createForClass(
  OwnTargetItemCondition,
);
