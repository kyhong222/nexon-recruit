import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type QuestClearLogDocument = HydratedDocument<QuestClearLog>;

@Schema()
export class QuestClearLog {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  account: string;

  @Prop({ required: true, default: new Date() })
  createdAt: Date;

  @Prop({ required: true })
  questId: string;

  @Prop({ required: true })
  rewarded: boolean;

  @Prop({ required: true })
  rewards: string[]; // 보상 테이블 ID들
}

export const QuestClearLogSchema = SchemaFactory.createForClass(QuestClearLog);
