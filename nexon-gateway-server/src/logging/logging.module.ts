import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  KillMonsterLog,
  KillMonsterLogSchema,
} from './schemas/kill-monster-log.schema';
import { LoginLog, LoginLogSchema } from './schemas/login-log.schema';
import {
  QuestClearLog,
  QuestClearLogSchema,
} from './schemas/quest-clear-log.schema';
import { LoggingController } from './logging.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: KillMonsterLog.name,
        schema: KillMonsterLogSchema,
      },
      {
        name: LoginLog.name,
        schema: LoginLogSchema,
      },
      {
        name: QuestClearLog.name,
        schema: QuestClearLogSchema,
      },
    ]),
  ],
  providers: [LoggingService],
  exports: [LoggingService],
  controllers: [LoggingController],
})
export class LoggingModule {}
