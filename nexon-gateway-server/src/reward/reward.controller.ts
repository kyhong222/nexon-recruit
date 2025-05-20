/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RewardService } from './reward.service';
import { RolesGuard } from 'src/account/guards/roles.guard';
import { Roles } from 'src/account/decorators/roles.decorator';
import { CreateRewardDto, ModifyRewardDto } from './reward.dto';

@UseGuards(RolesGuard)
@Controller('reward')
export class RewardController {
  rewardService: RewardService;
  constructor(rewardService: RewardService) {
    this.rewardService = rewardService;
  }

  @Roles('operator')
  @Get('all')
  async getAllRewards() {
    return await this.rewardService.getAllRewards();
  }

  @Roles('operator')
  @Get('/:id')
  async getRewardById(@Param('id') id: string) {
    return await this.rewardService.getRewardById(id);
  }
  @Roles('operator')
  @Post('create')
  async createReward(@Body() dto: CreateRewardDto) {
    return await this.rewardService.createReward(dto);
  }

  @Roles('operator')
  @Patch('modify')
  async modifyReward(@Body() dto: ModifyRewardDto) {
    return await this.rewardService.modifyReward(dto);
  }
}
