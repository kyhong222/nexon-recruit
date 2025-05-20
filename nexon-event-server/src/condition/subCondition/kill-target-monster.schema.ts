import { Prop } from '@nestjs/mongoose';
import { BaseCondition } from '../condition.schema';
import { HydratedDocument, Schema } from 'mongoose';

export type KillTargetMonsterConditionDocument =
  HydratedDocument<KillTargetMonsterCondition>;

export class KillTargetMonsterCondition extends BaseCondition {
  @Prop({ required: true })
  monsterName: string; // 몬스터 이름(코드로 변경 필요)
  @Prop({ required: true })
  quantity: number; // 몬스터 처치 수량
}

// 스키마를 수동으로 정의
export const KillTargetMonsterConditionSchema = new Schema({
  monsterName: { type: String, required: true },
  quantity: { type: Number, required: true },
});
