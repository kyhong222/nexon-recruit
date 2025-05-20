import { Module } from '@nestjs/common';
import { UserLogService } from './userLog.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  QuestClearLog,
  QuestClearLogSchema,
} from './schemas/questClear.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: QuestClearLog.name,
        schema: QuestClearLogSchema,
      },
    ]),
  ],
  providers: [UserLogService],
  exports: [UserLogService, MongooseModule], // UserLogService와 MongooseModule 내보내기
})
export class UserLogModule {}
