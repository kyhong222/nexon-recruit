import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RewardService } from './reward.service';
import { CreateRewardDto, ModifyRewardDto } from './reward.dto';

@Controller('reward')
export class RewardController {
  rewardService: RewardService;

  constructor(rewardService: RewardService) {
    this.rewardService = rewardService;
  }

  @Post('create')
  async createReward(@Body() createRewardDto: CreateRewardDto) {
    return await this.rewardService.createReward(createRewardDto);
  }

  @Patch('modify')
  async modifyReward(@Body() modifyRewardDto: ModifyRewardDto) {
    return await this.rewardService.modifyReward(modifyRewardDto);
  }

  @Get('all')
  async getAllReward() {
    return await this.rewardService.getAllReward();
  }

  @Get('/:id')
  async getRewardDetail(@Param('id') id: string) {
    return await this.rewardService.getRewardDetail(id);
  }
}
