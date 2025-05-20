import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './item.dto';

@Controller('item')
export class ItemController {
  itemService: ItemService;
  constructor(itemService: ItemService) {
    this.itemService = itemService;
  }

  @Post('/create')
  async createItem(@Body() createItemDto: CreateItemDto) {
    return await this.itemService.createItem(createItemDto);
  }

  @Get('/all')
  async getAllItems() {
    return await this.itemService.getAllItems();
  }
  @Get('/:id')
  async getItemDetail(@Param('id') id: string) {
    return await this.itemService.getItemDetail(id);
  }
}
