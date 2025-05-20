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
import { EventService } from './event.service';
import { RolesGuard } from 'src/account/guards/roles.guard';
import { Roles } from 'src/account/decorators/roles.decorator';
import { CreateEventDto, ModifyEventDto } from './event.dto';

@UseGuards(RolesGuard)
@Controller('event')
export class EventController {
  eventService: EventService;
  constructor(eventService: EventService) {
    this.eventService = eventService;
  }

  @Roles('operator')
  @Get('all')
  async getAllEvents() {
    return await this.eventService.getAllEvents();
  }

  @Roles('operator')
  @Get('/:id')
  async getEventById(@Param('id') id: string) {
    return await this.eventService.getEventById(id);
  }

  @Roles('operator')
  @Post('create')
  async createEvent(@Body() dto: CreateEventDto) {
    return await this.eventService.createEvent(dto);
  }

  @Roles('operator')
  @Patch('modify')
  async modifyEvent(@Body() dto: ModifyEventDto) {
    return await this.eventService.modifyEvent(dto);
  }
}
