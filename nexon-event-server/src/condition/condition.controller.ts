import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConditionService } from './condition.service';
import { CreateConditionDto } from './condition.dto';

@Controller('condition')
export class ConditionController {
  conditionService: ConditionService;
  constructor(conditionService: ConditionService) {
    this.conditionService = conditionService;
  }

  @Get('all')
  async getAllConditions() {
    return await this.conditionService.getAllConditions();
  }

  @Get('continuousLogin')
  async getContinuousLoginCondition() {
    return await this.conditionService.getAllContinuousLoginConditions();
  }

  @Get('killTargetMonster')
  async getKillTargetMonsterCondition() {
    return await this.conditionService.getAllKillTargetMonsterConditions();
  }

  @Get('clearTargetQuest')
  async getClearTargetQuestCondition() {
    return await this.conditionService.getAllClearTargetQuestConditions();
  }

  @Post('create')
  async createCondition(@Body() createConditionDto: CreateConditionDto) {
    return this.conditionService.createCondition(createConditionDto);
  }
}
