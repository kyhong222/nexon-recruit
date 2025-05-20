import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/account/guards/roles.guard';
import { LoggingService } from './logging.service';
import { Roles } from 'src/account/decorators/roles.decorator';

@UseGuards(RolesGuard)
@Controller('logging')
export class LoggingController {
  loggingService: LoggingService;
  constructor(loggingService: LoggingService) {
    this.loggingService = loggingService;
  }

  @Roles('auditor')
  @Get('getAllQuestClearLogs')
  async getAllQuestClearLogs() {
    return await this.loggingService.getAllQuestClearLogs();
  }

  @Roles('auditor')
  @Get('getAllQuestClearLogs/:name')
  async getAllQuestClearLogsByName(@Param() name: string) {
    return await this.loggingService.getAllQuestClearLogsByUserId(name);
  }
}
