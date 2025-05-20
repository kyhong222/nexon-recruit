import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Account } from 'src/account/account.schema';

export type KillMonsterLogDocument = HydratedDocument<KillMonsterLog>;

@Schema()
export class KillMonsterLog {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  account: Account;

  @Prop({ required: true, default: new Date() })
  createdAt: Date;

  @Prop({ required: true })
  monsterName: string;
}

export const KillMonsterLogSchema =
  SchemaFactory.createForClass(KillMonsterLog);
