import { Prop } from '@nestjs/mongoose';
import { BaseCondition } from '../condition.schema';
import { HydratedDocument, Schema } from 'mongoose';

export type ContinuousLoginConditionDocument =
  HydratedDocument<ContinuousLoginCondition>;

export class ContinuousLoginCondition extends BaseCondition {
  @Prop({ required: true })
  days: number; // 연속 로그인 일수
}

export const ContinuousLoginConditionSchema = new Schema({
  days: { type: Number, required: true },
});
