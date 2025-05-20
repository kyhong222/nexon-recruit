import { Injectable } from '@nestjs/common';
import { CreateRewardDto, ModifyRewardDto } from './reward.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Reward } from './reward.schema';
import { Model } from 'mongoose';

@Injectable()
export class RewardService {
  constructor(@InjectModel(Reward.name) private rewardModel: Model<Reward>) {}

  async createReward(createRewardDto: CreateRewardDto): Promise<Reward> {
    const { name, description, items } = createRewardDto;
    const reward = new this.rewardModel({
      name,
      description,
      items,
    });
    return await reward.save();
  }

  async modifyReward(modifyRewardDto: ModifyRewardDto): Promise<Reward> {
    const { _id, name, description, items } = modifyRewardDto;

    const reward = await this.rewardModel.findOneAndUpdate(
      { _id: _id },
      { name, description, items },
      { new: true },
    );

    if (!reward) {
      throw new Error('Reward not found');
    }

    return reward;
  }

  async getAllReward(): Promise<Reward[]> {
    return await this.rewardModel.find();
  }

  async getRewardDetail(id: string): Promise<Reward> {
    const reward = await this.rewardModel.findById(id);
    if (!reward) {
      throw new Error('Reward not found');
    }

    return reward;
  }
}
