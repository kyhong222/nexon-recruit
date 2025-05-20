import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Account } from 'src/account/account.schema';

export type QuestClearLogDocument = HydratedDocument<QuestClearLog>;

@Schema()
export class QuestClearLog {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  account: Account;

  @Prop({ required: true, default: new Date() })
  createdAt: Date;

  @Prop({ required: true })
  questId: string;

  @Prop({ required: true })
  rewarded: boolean;

  @Prop({ required: true })
  rewards: string[];
}

export const QuestClearLogSchema = SchemaFactory.createForClass(QuestClearLog);
