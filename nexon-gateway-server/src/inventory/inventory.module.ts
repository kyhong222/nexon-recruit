import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Inventory, InventorySchema } from './inventory.schema';
import { Item, ItemSchema } from 'src/item/item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Inventory.name,
        schema: InventorySchema,
      },
      {
        name: Item.name,
        schema: ItemSchema,
      },
    ]),
  ],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
