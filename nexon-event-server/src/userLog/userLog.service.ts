import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QuestClearLog } from './schemas/questClear.schema';
import { Model } from 'mongoose';
import { Reward } from 'src/reward/reward.schema';

@Injectable()
export class UserLogService {
  constructor(
    @InjectModel(QuestClearLog.name)
    private questClearLogModel: Model<QuestClearLog>,
  ) {}

  async loggingQuestClear(
    userId: string,
    questId: string,
    rewards: Reward[],
    rewarded: boolean,
  ): Promise<QuestClearLog> {
    const newLog = new this.questClearLogModel({
      account: userId,
      questId,
      rewards,
      rewarded,
      createdAt: new Date(),
    });

    return await newLog.save();
  }

  async getQuestClearLogs(userId: string): Promise<QuestClearLog[]> {
    return await this.questClearLogModel.find({ account: userId }).exec();
  }
}
