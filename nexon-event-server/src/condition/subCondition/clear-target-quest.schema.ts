import { Prop } from '@nestjs/mongoose';
import { BaseCondition } from '../condition.schema';
import { HydratedDocument, Schema } from 'mongoose';

export type ClearTargetQuestConditionDocument =
  HydratedDocument<ClearTargetQuestCondition>;

export class ClearTargetQuestCondition extends BaseCondition {
  @Prop({ required: true })
  questId: string; // 퀘스트 ID
}

// 스키마 수동 생성
export const ClearTargetQuestConditionSchema = new Schema({
  questId: { type: String, required: true },
});
