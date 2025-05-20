import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BaseConditionDocument = HydratedDocument<BaseCondition>;

export enum ConditionType {
  CONTINUOUSLOGIN = 'ContinuousLoginCondition',
  OWNTARGETITEM = 'OwnTargetItemCondition',
  KILLTARGETMONSTER = 'KillTargetMonsterCondition',
  CLEARTARGETQUEST = 'ClearTargetQuestCondition',
}

@Schema({ discriminatorKey: 'type' }) // 조건의 종류를 구분하기 위한 discriminatorKey 설정
export class BaseCondition {
  @Prop({ required: true }) // 조건의 종류를 구분
  type: ConditionType;
}

export const BaseConditionSchema = SchemaFactory.createForClass(BaseCondition);
