import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type LoginLogDocument = HydratedDocument<LoginLog>;

@Schema()
export class LoginLog {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  userId: string; // 유저 ID

  @Prop({ required: true })
  createdAt: Date; // 로그인 시간
}

export const LoginLogSchema = SchemaFactory.createForClass(LoginLog);
