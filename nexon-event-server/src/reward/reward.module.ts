import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reward, RewardSchema } from './reward.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reward.name, schema: RewardSchema }]),
  ],
  providers: [RewardService],
  controllers: [RewardController],
})
export class RewardModule {}
