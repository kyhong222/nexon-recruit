import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Account } from 'src/account/account.schema';

export type LoginLogDocument = HydratedDocument<LoginLog>;

@Schema()
export class LoginLog {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  account: Account;

  @Prop({ required: true, default: new Date() })
  createdAt: Date;
}

export const LoginLogSchema = SchemaFactory.createForClass(LoginLog);
