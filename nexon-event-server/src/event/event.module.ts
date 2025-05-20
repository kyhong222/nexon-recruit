import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { ConditionService } from 'src/condition/condition.service';
import { UserLogService } from 'src/userLog/userLog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './event.schema';
import { ConditionModule } from 'src/condition/condition.module';
import { UserLogModule } from 'src/userLog/userLog.module';
import { Reward, RewardSchema } from 'src/reward/reward.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Event.name,
        schema: EventSchema,
      },
      {
        name: Reward.name,
        schema: RewardSchema,
      },
    ]),
    UserLogModule,
    ConditionModule,
  ],
  providers: [EventService, ConditionService, UserLogService],
  controllers: [EventController],
  exports: [EventService],
})
export class EventModule {}
