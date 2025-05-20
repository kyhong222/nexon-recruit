/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ConditionService } from './condition.service';
import { RolesGuard } from 'src/account/guards/roles.guard';
import { Roles } from 'src/account/decorators/roles.decorator';
import { CreateConditionDto } from './condition.dto';

@UseGuards(RolesGuard)
@Controller('condition')
export class ConditionController {
  conditionService: ConditionService;
  constructor(conditionService: ConditionService) {
    this.conditionService = conditionService;
  }

  @Roles('operator')
  @Get('all')
  async getAllConditions() {
    return await this.conditionService.getAllConditions();
  }

  @Roles('operator')
  @Get('continuousLogin')
  async getAllContinuousLoginConditions() {
    return await this.conditionService.getAllContinuousLoginConditions();
  }

  @Roles('operator')
  @Get('killTargetMonster')
  async getAllKillTargetMonsterConditions() {
    return await this.conditionService.getAllKillTargetMonsterConditions();
  }

  @Roles('operator')
  @Get('clearTargetQuest')
  async getAllClearTargetQuestConditions() {
    return await this.conditionService.getAllClearTargetQuestConditions();
  }

  @Roles('operator')
  @Post('create')
  async createCondition(@Body() dto: CreateConditionDto) {
    return await this.conditionService.createCondition(dto);
  }
}
