import { Module } from '@nestjs/common';
import { ConditionService } from './condition.service';
import { ConditionController } from './condition.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ConditionService],
  controllers: [ConditionController],
})
export class ConditionModule {}
