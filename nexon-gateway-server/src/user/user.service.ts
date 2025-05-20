/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { LoggingService } from 'src/logging/logging.service';
import { KillMonsterDto, RequestRewardDto } from './user.dto';
import { InventoryService } from 'src/inventory/inventory.service';

const EVENT_SERVER_URL =
  process.env.EVENT_SERVER_URL || 'http://localhost:3001';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    private readonly loggingService: LoggingService,
    private readonly inventoryService: InventoryService,
  ) {}

  async killMonster(dto: KillMonsterDto) {
    const { userId, monsterName } = dto;
    return await this.loggingService.loggingKillMonster(userId, monsterName);
  }

  async showInventory(userId: string) {
    return await this.inventoryService.getInventory(userId);
  }

  async clearEvent(dto: RequestRewardDto) {
    const { userId } = dto;

    // 이벤트 클리어 요청
    const url = `${EVENT_SERVER_URL}/event/requestReward`;
    const response = await this.httpService
      .post(url, dto, { withCredentials: true })
      .toPromise();

    if (
      (response?.status as number) < 200 ||
      (response?.status as number) >= 300
    ) {
      throw new Error(`Failed to clear event: ${response?.statusText}`);
    }

    if (!response?.data) {
      throw new Error('Failed to clear event: event not found in response');
    }

    // 클리어 성공시 reward를 인벤토리에 추가
    if (response.data.rewarded as boolean) {
      const rewards = response.data.rewards;
      rewards.forEach((reward) => {
        reward.items.forEach(async (item) => {
          // 인벤토리에 아이템 추가
          await this.inventoryService.addItem(userId, item);
        });
      });
    }

    return response.data;
  }

  async getMyQuestClearLog(userId: string) {
    return await this.loggingService.getAllQuestClearLogsByUserId(userId);
  }

  async getMyActiveEventList(userId: string) {
    // 클리어한 퀘스트 목록
    const clearedEvents = (
      await this.loggingService.getAllQuestClearLogsByUserId(userId)
    ).filter((log) => {
      // 클리어된것만 필터링
      return log.rewarded === true;
    });

    // 현재 활성화된 이벤트 목록
    const url = `${EVENT_SERVER_URL}/event/all`;
    const response = await this.httpService
      .get(url, {
        withCredentials: true,
        maxRedirects: 0,
        validateStatus: () => true,
      })
      .toPromise();

    if (response?.status !== 200) {
      throw new Error(`Failed to get events: ${response?.statusText}`);
    }
    const events = response.data;
    if (!events) {
      throw new Error('Failed to get events: events not found in response');
    }

    const activeEvents = events.filter((event) => {
      // 현재 활성화된 이벤트 목록
      const isOnDate =
        new Date(event.startDate) <= new Date() &&
        new Date(event.endDate) >= new Date();
      // 클리어한 퀘스트 목록에 포함되어 있는지 확인
      const isActive = event['isActive'] as boolean;
      return isActive && isOnDate;
    });

    // activeEvents의 요소 중 clearedEvents에 포함되지 않은 요소만 필터링
    return activeEvents.filter((event) => {
      return !clearedEvents.some((clearedEvent) => {
        return clearedEvent.questId === event._id;
      });
    });
  }
}
