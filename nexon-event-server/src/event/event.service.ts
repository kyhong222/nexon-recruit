import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto, ModifyEventDto, RequestRewardDto } from './event.dto';
import { Event } from './event.schema';
import { ConditionService } from 'src/condition/condition.service';
import { UserLogService } from 'src/userLog/userLog.service';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    private conditionService: ConditionService,
    private userLogService: UserLogService,
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const {
      name,
      description,
      conditions,
      isActive,
      startDate,
      endDate,
      rewards,
    } = createEventDto;

    const event = new this.eventModel({
      name,
      description,
      conditions,
      isActive,
      startDate,
      endDate,
      rewards,
    });
    return await event.save();
  }

  async modifyEvent(modifyEventDto: ModifyEventDto): Promise<Event> {
    const { _id, name, description, condition, isActive, endDate } =
      modifyEventDto;

    const event = await this.eventModel.findOneAndUpdate(
      { _id },
      { name, description, condition, isActive, endDate },
      { new: true },
    );

    if (!event) {
      throw new Error('Event not found');
    }

    return event;
  }

  async getAllEvents(): Promise<Event[]> {
    return await this.eventModel.find();
  }

  async getEventDetail(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id);

    if (!event) {
      throw new Error('Event not found');
    }

    return event;
  }

  async requestReward(dto: RequestRewardDto) {
    const { userId, eventId } = dto;
    // 1. 이벤트를 불러오면서 reward를 populate
    const event = await this.eventModel
      .findById(eventId)
      .populate('conditions') // conditions 필드 로드
      .populate('rewards'); // reward 필드 로드
    if (!event) {
      throw new Error('Event not found');
    }

    // 2. 이벤트를 이미 클리어했는지 확인
    const myQuestClearLogs =
      await this.userLogService.getQuestClearLogs(userId);

    const filteredLogs = myQuestClearLogs.filter(
      (log) => log.questId.toString() === eventId,
    );

    const isCleared =
      filteredLogs.filter((log) => log.rewarded === true).length > 0;

    if (isCleared) {
      throw new Error('Event already cleared');
    }

    // 3. 이벤트가 활성화되어 있는지 확인
    if (!event.isActive) {
      throw new Error('Event is not active');
    }

    // 4. 이벤트 기간이 유효한지 확인
    const currentDate = new Date();
    if (currentDate < event.startDate || currentDate > event.endDate) {
      throw new Error('Event is not in the valid date range');
    }

    // 5. 조건을 확인
    const result = await this.conditionService.checkAllConditions(
      event.conditions,
      userId,
    );

    // 6. 보상을 요청
    if (!result) {
      // 조건이 충족되지 않으면 보상 요청 실패
      return await this.userLogService.loggingQuestClear(
        userId,
        eventId,
        [], // reward가 null일 수 있으므로 안전하게 접근
        false,
      );
    }

    // 조건이 충족되면 보상 요청 성공
    return await this.userLogService.loggingQuestClear(
      userId,
      eventId,
      event.rewards, // reward가 null일 수 있으므로 안전하게 접근
      true,
    );
  }
}
