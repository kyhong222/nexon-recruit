import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto, ModifyEventDto, RequestRewardDto } from './event.dto';

@Controller('event')
export class EventController {
  eventService: EventService;
  constructor(eventService: EventService) {
    this.eventService = eventService;
  }

  @Post('create')
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return await this.eventService.createEvent(createEventDto);
  }

  @Patch('modify')
  async modifyEvent(@Body() modifyEventDto: ModifyEventDto) {
    return await this.eventService.modifyEvent(modifyEventDto);
  }

  @Get('all')
  async getAllEvents() {
    return await this.eventService.getAllEvents();
  }

  @Get('/:id')
  async getEventDetail(@Param('id') id: string) {
    return await this.eventService.getEventDetail(id);
  }

  @Post('requestReward')
  async requestReward(@Body() dto: RequestRewardDto) {
    return await this.eventService.requestReward(dto);
  }
}
