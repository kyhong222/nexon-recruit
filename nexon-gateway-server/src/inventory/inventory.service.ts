import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Inventory } from './inventory.schema';
import { Model } from 'mongoose';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>,
  ) {}

  async getInventory(userId: string): Promise<Inventory> {
    const inventory = await this.inventoryModel
      .findOne({ userId })
      .populate('items');

    if (!inventory) {
      return this.createInventory(userId);
    }

    return inventory;
  }

  private async createInventory(userId: string): Promise<Inventory> {
    const inventory = await this.inventoryModel.create({ userId, items: [] });
    return inventory;
  }

  async addItem(userId: string, itemId: string): Promise<Inventory> {
    const inventory = await this.inventoryModel.findOneAndUpdate(
      { userId },
      { $addToSet: { items: itemId } },
      { new: true, upsert: true },
    );
    return inventory;
  }
}
