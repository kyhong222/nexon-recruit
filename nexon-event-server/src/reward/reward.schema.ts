import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Item } from 'src/item/item.schema';

export type RewardDocument = HydratedDocument<Reward>;

@Schema()
export class Reward {
  // @Prop()
  // _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }] })
  items: [Item];
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
