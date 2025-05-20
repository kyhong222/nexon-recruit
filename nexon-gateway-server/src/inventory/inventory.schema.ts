import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Item } from 'src/item/item.schema';

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema()
export class Inventory {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  userId: string;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Item' }] })
  items: Item[];
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
