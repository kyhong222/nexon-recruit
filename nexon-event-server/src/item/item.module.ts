import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { Item, ItemSchema } from './item.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Item.name,
        schema: ItemSchema,
      },
    ]),
  ],
  providers: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
