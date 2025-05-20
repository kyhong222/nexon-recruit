import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type KillMonsterLogDocument = HydratedDocument<KillMonsterLog>;

@Schema()
export class KillMonsterLog {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  account: string; // 유저 ID

  @Prop({ required: true })
  createdAt: Date; // 처치 시간

  @Prop({ required: true })
  monsterName: string; // 몬스터 이름(종류)
}

export const KillMonsterLogSchema =
  SchemaFactory.createForClass(KillMonsterLog);
