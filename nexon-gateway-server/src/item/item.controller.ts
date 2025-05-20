/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/account/guards/roles.guard';
import { ItemService } from './item.service';
import { Roles } from 'src/account/decorators/roles.decorator';
import { CreateItemDto } from './item.dto';

@UseGuards(RolesGuard)
@Controller('item')
export class ItemController {
  itemService: ItemService;
  constructor(itemService: ItemService) {
    this.itemService = itemService;
  }

  @Roles('operator')
  @Get('allItems')
  async getAllItems() {
    return await this.itemService.getAllItems();
  }

  @Roles('admin')
  @Post('create')
  async createItem(@Body() dto: CreateItemDto) {
    return await this.itemService.createItem(dto);
  }
}
