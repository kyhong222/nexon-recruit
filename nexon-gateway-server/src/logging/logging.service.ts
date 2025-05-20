import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { KillMonsterLog } from './schemas/kill-monster-log.schema';
import { Model } from 'mongoose';
import { LoginLog } from './schemas/login-log.schema';
import { QuestClearLog } from './schemas/quest-clear-log.schema';

@Injectable()
export class LoggingService {
  constructor(
    @InjectModel(KillMonsterLog.name)
    private readonly killMonsterLogModel: Model<KillMonsterLog>,
    @InjectModel(LoginLog.name) private readonly loginLogModel: Model<LoginLog>,
    @InjectModel(QuestClearLog.name)
    private readonly questClearLogModel: Model<QuestClearLog>,
  ) {}

  async loggingKillMonster(userId: string, monsterName: string) {
    const log = new this.killMonsterLogModel({
      account: userId,
      monsterName,
      createdAt: new Date(),
    });
    return await log.save();
  }

  async loggingLogin(userId: string) {
    const log = new this.loginLogModel({
      userId,
      createdAt: new Date(),
    });
    return await log.save();
  }

  async loggingQuestClear(userId: string, questId: string, rewarded: boolean) {
    const log = new this.questClearLogModel({
      userId,
      questId,
      createdAt: new Date(),
      rewarded,
    });
    return await log.save();
  }

  async getAllQuestClearLogs() {
    const logs = await this.questClearLogModel
      .find()
      .populate('userId')
      .populate('questId');
    return logs;
  }
  async getAllQuestClearLogsByUserId(userId: string) {
    const logs = (
      await this.questClearLogModel
        .find()
        .populate('questId')
        .populate('rewards')
    )
      .filter((log) => {
        // 유저 아이디로 필터링

        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        return log.account.toString() === userId;
      })
      .filter((log) => {
        // 클리어된것만 필터링
        return log.rewarded === true;
      });
    return logs;
  }
}
