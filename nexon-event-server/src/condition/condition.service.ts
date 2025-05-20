import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseCondition, ConditionType } from './condition.schema';
import { Model } from 'mongoose';
import { LoginLog } from 'src/userLog/schemas/login.schema';

import { KillMonsterLog } from 'src/userLog/schemas/killMonster.schema';
import { QuestClearLog } from 'src/userLog/schemas/questClear.schema';
import { ContinuousLoginCondition } from './subCondition/continuous-login.schema';
import { ClearTargetQuestCondition } from './subCondition/clear-target-quest.schema';
import { KillTargetMonsterCondition } from './subCondition/kill-target-monster.schema';
import {
  CreateClearTargetQuestConditionDto,
  CreateConditionDto,
  CreateContinuousLoginConditionDto,
  CreateKillTargetMonsterConditionDto,
} from './condition.dto';

@Injectable()
export class ConditionService {
  constructor(
    @InjectModel(BaseCondition.name)
    private baseConditionModel: Model<BaseCondition>,

    @InjectModel(ContinuousLoginCondition.name)
    private continuousLoginConditionModel: Model<ContinuousLoginCondition>,

    @InjectModel(ClearTargetQuestCondition.name)
    private clearTargetQuestConditionModel: Model<ClearTargetQuestCondition>,

    @InjectModel(KillTargetMonsterCondition.name)
    private killTargetMonsterConditionModel: Model<KillTargetMonsterCondition>,

    @InjectModel(LoginLog.name) private LoginLogModel: Model<LoginLog>,

    @InjectModel(KillMonsterLog.name)
    private killMonsterLogModel: Model<KillMonsterLog>,

    @InjectModel(QuestClearLog.name)
    private questClearLogModel: Model<QuestClearLog>,
  ) {}

  async checkAllConditions(
    conditions: BaseCondition[],
    userId: string,
  ): Promise<boolean> {
    for (const condition of conditions) {
      const result = await this.checkCondition(condition, userId);
      if (!result) {
        return false; // 하나라도 조건이 충족되지 않으면 false 반환
      }
    }
    return true; // 모든 조건이 충족되면 true 반환
  }

  // TODO: may change to async
  async checkCondition(
    condition: BaseCondition,
    userId: string,
  ): Promise<boolean> {
    switch (condition.type) {
      case ConditionType.CONTINUOUSLOGIN:
        return await this.checkContinuousLoginCondition(
          condition as ContinuousLoginCondition,
          userId,
        );
      case ConditionType.CLEARTARGETQUEST:
        return await this.checkClearTargetQuestCondition(
          condition as ClearTargetQuestCondition,
          userId,
        );
      case ConditionType.KILLTARGETMONSTER:
        return await this.checkKillTargetMonsterCondition(
          condition as KillTargetMonsterCondition,
          userId,
        );
      // TODO: Implement own target item condition check
      // case ConditionType.OWNTARGETITEM:
      //   return await this.checkOwnTargetItemCondition(
      //     condition as KillTargetMonsterCondition,
      //     userId,
      //   );
      default:
        throw new Error('Unknown condition type');
    }
  }

  async checkContinuousLoginCondition(
    condition: ContinuousLoginCondition,
    userId: string,
  ): Promise<boolean> {
    const { days } = condition;
    const count = days; // 연속 로그인 일수
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - count + 1); // 시작일
    startDate.setHours(0, 0, 0, 0); // 시작일의 시간 설정
    const endDate = new Date(today);
    endDate.setHours(23, 59, 59, 999); // 종료일의 시간 설정

    // TODO: 연속 로그인이 아니라 n일간 하루 1회 이상 로그인했는지 체크
    const loginCount = await this.LoginLogModel.countDocuments({
      userId: userId,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    return loginCount >= count; // 연속 로그인 일수 체크
  }

  async checkKillTargetMonsterCondition(
    condition: KillTargetMonsterCondition,
    userId: string,
  ): Promise<boolean> {
    const { monsterName, quantity } = condition;
    const count = quantity; // 몬스터 처치 수량

    // Note: 시간범위 체크를 제거
    // const today = new Date();
    // const startDate = new Date(today);
    // startDate.setDate(today.getDate() - count + 1); // 시작일
    // startDate.setHours(0, 0, 0, 0); // 시작일의 시간 설정
    // const endDate = new Date(today);
    // endDate.setHours(23, 59, 59, 999); // 종료일의 시간 설정

    // const killCount = await this.killMonsterLogModel.countDocuments({
    //   account: userId,
    // });
    const killCount = await this.killMonsterLogModel.countDocuments({
      account: userId,
      monsterName: monsterName,
    });
    return killCount >= count; // 몬스터 처치 수량 체크
  }

  async checkClearTargetQuestCondition(
    condition: ClearTargetQuestCondition,
    userId: string,
  ): Promise<boolean> {
    const { questId } = condition;
    const questClearCount = await this.questClearLogModel.countDocuments({
      userId: userId,
      questId: questId,
    });
    return questClearCount > 0; // 퀘스트 클리어 여부 체크
  }

  // async checkOwnTargetItemCondition(
  //   condition: OwnTargetItemCondition,
  //   userId: string,
  // ): Promise<boolean> {
  //   // TODO: 인벤토리를 불러와야 함
  //   return true; // TODO: Implement own target item condition check
  // }

  async getAllConditions(): Promise<BaseCondition[]> {
    return await this.baseConditionModel.find().exec();
  }
  async getAllContinuousLoginConditions(): Promise<ContinuousLoginCondition[]> {
    return await this.continuousLoginConditionModel.find().exec();
  }
  async getAllKillTargetMonsterConditions(): Promise<
    KillTargetMonsterCondition[]
  > {
    return await this.killTargetMonsterConditionModel.find().exec();
  }
  async getAllClearTargetQuestConditions(): Promise<
    ClearTargetQuestCondition[]
  > {
    return await this.clearTargetQuestConditionModel.find().exec();
  }

  async createCondition(
    conditionData: CreateConditionDto,
  ): Promise<BaseCondition> {
    switch (conditionData.type) {
      case ConditionType.CONTINUOUSLOGIN:
        return await this.continuousLoginConditionModel.create(
          conditionData as CreateContinuousLoginConditionDto,
        );
      case ConditionType.KILLTARGETMONSTER:
        return await this.killTargetMonsterConditionModel.create(
          conditionData as CreateKillTargetMonsterConditionDto,
        );

      case ConditionType.CLEARTARGETQUEST:
        return await this.clearTargetQuestConditionModel.create(
          conditionData as CreateClearTargetQuestConditionDto,
        );
      default:
        throw new Error('Unknown condition type');
    }
  }
}
