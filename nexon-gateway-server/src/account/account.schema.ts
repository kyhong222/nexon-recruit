import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

export enum Role {
  USER = 'user',
  OPERATOR = 'operator',
  AUDUITOR = 'auditor',
  ADMIN = 'admin',
}

@Schema()
export class Account {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, default: Role.USER })
  role: Role;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
