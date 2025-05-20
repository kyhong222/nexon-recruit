/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RolesGuard } from 'src/account/guards/roles.guard';
import { Roles } from 'src/account/decorators/roles.decorator';
import { KillMonsterDto } from './user.dto';
import { Request } from 'express';

@UseGuards(RolesGuard)
@Controller('user')
export class UserController {
  userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Roles('user')
  @Post('killMonster')
  async killMonster(@Body() body, @Req() req: Request) {
    const dto: KillMonsterDto = {
      monsterName: body.monsterName as string,
      userId: req['user']['id'] as string,
    };
    return await this.userService.killMonster(dto);
  }

  @Roles('user')
  @Get('getInventory')
  async getInventory(@Req() req: Request) {
    const userId = req['user']['id'] as string;
    return await this.userService.showInventory(userId);
  }

  @Roles('user')
  @Post('clearEvent')
  async clearEvent(@Body() body, @Req() req: Request) {
    const dto = {
      userId: req['user']['id'] as string,
      eventId: body.eventId as string,
    };
    return await this.userService.clearEvent(dto);
  }

  @Roles('user')
  @Get('getMyQuestClearLog')
  async getMyQuestClearLog(@Req() req: Request) {
    const userId = req['user']['id'] as string;
    return await this.userService.getMyQuestClearLog(userId);
  }

  @Roles('user')
  @Get('getMyActiveEventList')
  async getMyActiveEventList(@Req() req: Request) {
    const userId = req['user']['id'] as string;
    return await this.userService.getMyActiveEventList(userId);
  }
}
