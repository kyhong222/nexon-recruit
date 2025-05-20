import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ItemType } from './item.dto';

export type ItemDocument = HydratedDocument<Item>;

@Schema()
export class Item {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true, default: 1 })
  quantity: number;

  @Prop({ default: '' })
  imgSrc: string;

  @Prop({ required: true, enum: ItemType })
  type: ItemType;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
