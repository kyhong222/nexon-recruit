import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ItemDocument = HydratedDocument<Item>;

export enum ItemType {
  EQUIPMENT = 'equipment',
  CONSUMABLE = 'consumable',
  INSTALLATION = 'installation',
  OTHER = 'other',
  CASH = 'cash',
  MESO = 'meso',
  EXP = 'exp',
  POP = 'pop',
}

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
