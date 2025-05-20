import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { RewardModule } from './reward/reward.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemModule } from './item/item.module';
import { ConditionModule } from './condition/condition.module';
import { UserLogModule } from './userLog/userLog.module';
import { UserLogService } from './userLog/userLog.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://mongodb:27017/nest',
    ),
    EventModule,
    RewardModule,
    ItemModule,
    ConditionModule,
    UserLogModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserLogService],
})
export class AppModule {}
