import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Item, ItemType } from './item.schema';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateCashItemDto,
  CreateConsumableItemDto,
  CreateEquipItemDto,
  CreateExpItemDto,
  CreateInstallationItemDto,
  CreateItemDto,
  CreateMesoItemDto,
  CreateOtherItemDto,
  CreatePopItemDto,
} from './item.dto';

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    const { name, description, quantity, imgSrc, type } = createItemDto;

    switch (type) {
      case ItemType.EQUIPMENT:
        return await this.createEquipItem(
          new CreateEquipItemDto(name, description, quantity, imgSrc),
        );
      case ItemType.CONSUMABLE:
        return await this.createConsumableItem(
          new CreateConsumableItemDto(name, description, quantity, imgSrc),
        );
      case ItemType.INSTALLATION:
        return await this.createInstallationItem(
          new CreateInstallationItemDto(name, description, quantity, imgSrc),
        );
      case ItemType.OTHER:
        return await this.createOtherItem(
          new CreateOtherItemDto(name, description, quantity, imgSrc),
        );
      case ItemType.CASH:
        return await this.createCashItem(
          new CreateCashItemDto(name, description, quantity, imgSrc),
        );
      case ItemType.MESO:
        return await this.createMesoItem(
          new CreateMesoItemDto(name, description, quantity, imgSrc),
        );
      case ItemType.EXP:
        return await this.createExpItem(
          new CreateExpItemDto(name, description, quantity, imgSrc),
        );
      case ItemType.POP:
        return await this.createPopItem(
          new CreatePopItemDto(name, description, quantity, imgSrc),
        );
      default:
        throw new Error('Invalid item type');
    }
  }

  private async createEquipItem(
    createEquipItemDto: CreateEquipItemDto,
  ): Promise<Item> {
    const createdItem = new this.itemModel(createEquipItemDto);
    return await createdItem.save();
  }
  private async createConsumableItem(
    createConsumableItemDto: CreateConsumableItemDto,
  ): Promise<Item> {
    const createdItem = new this.itemModel(createConsumableItemDto);
    return await createdItem.save();
  }

  private async createInstallationItem(
    createInstallationItemDto: CreateInstallationItemDto,
  ): Promise<Item> {
    const createdItem = new this.itemModel(createInstallationItemDto);
    return await createdItem.save();
  }

  private async createOtherItem(
    createOtherItemDto: CreateOtherItemDto,
  ): Promise<Item> {
    const createdItem = new this.itemModel(createOtherItemDto);
    return await createdItem.save();
  }

  private async createCashItem(
    createCashItemDto: CreateCashItemDto,
  ): Promise<Item> {
    const createdItem = new this.itemModel(createCashItemDto);
    return await createdItem.save();
  }

  private async createExpItem(
    createExpItemDto: CreateExpItemDto,
  ): Promise<Item> {
    const createdItem = new this.itemModel(createExpItemDto);
    return await createdItem.save();
  }

  private async createMesoItem(
    createMesoItemDto: CreateMesoItemDto,
  ): Promise<Item> {
    const createdItem = new this.itemModel(createMesoItemDto);
    return await createdItem.save();
  }

  private async createPopItem(
    createPopItemDto: CreatePopItemDto,
  ): Promise<Item> {
    const createdItem = new this.itemModel(createPopItemDto);
    return await createdItem.save();
  }

  async getAllItems(): Promise<Item[]> {
    return await this.itemModel.find();
  }
  async getItemDetail(id: string): Promise<Item> {
    const item = await this.itemModel.findById(id);
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  }
}
