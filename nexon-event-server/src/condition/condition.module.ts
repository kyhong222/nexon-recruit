import { Module } from '@nestjs/common';
import { ConditionService } from './condition.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginLog, LoginLogSchema } from 'src/userLog/schemas/login.schema';
import {
  KillMonsterLog,
  KillMonsterLogSchema,
} from 'src/userLog/schemas/killMonster.schema';
import {
  QuestClearLog,
  QuestClearLogSchema,
} from 'src/userLog/schemas/questClear.schema';
import { BaseCondition, BaseConditionSchema } from './condition.schema';
import {
  KillTargetMonsterCondition,
  KillTargetMonsterConditionSchema,
} from './subCondition/kill-target-monster.schema';
import {
  ClearTargetQuestCondition,
  ClearTargetQuestConditionSchema,
} from './subCondition/clear-target-quest.schema';
import {
  ContinuousLoginCondition,
  ContinuousLoginConditionSchema,
} from './subCondition/continuous-login.schema';
import { ConditionController } from './condition.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BaseCondition.name,
        schema: BaseConditionSchema,
        discriminators: [
          {
            name: ContinuousLoginCondition.name,
            schema: ContinuousLoginConditionSchema,
          },
          {
            name: ClearTargetQuestCondition.name,
            schema: ClearTargetQuestConditionSchema,
          },
          {
            name: KillTargetMonsterCondition.name,
            schema: KillTargetMonsterConditionSchema,
          },
        ],
      },
      {
        name: LoginLog.name,
        schema: LoginLogSchema,
      },
      {
        name: KillMonsterLog.name,
        schema: KillMonsterLogSchema,
      },
      {
        name: QuestClearLog.name,
        schema: QuestClearLogSchema,
      },
    ]),
  ],
  providers: [ConditionService],
  exports: [ConditionService, MongooseModule],
  controllers: [ConditionController],
})
export class ConditionModule {}
