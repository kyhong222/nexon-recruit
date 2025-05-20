import { BaseCondition } from 'src/condition/condition.schema';
import { Reward } from 'src/reward/reward.schema';

export class CreateEventDto {
  name: string;
  description: string;
  conditions: BaseCondition[];
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  rewards: Reward[];

  constructor(
    name: string,
    description: string = '',
    conditions: BaseCondition[] = [],
    isActive: boolean = false,
    startDate?: Date,
    endDate?: Date,
    rewards: Reward[] = [],
  ) {
    this.name = name;
    this.description = description;
    this.conditions = conditions;
    this.isActive = isActive;
    this.startDate = startDate ?? new Date();
    this.endDate = endDate ?? new Date();
    this.rewards = rewards;
  }
}
export class ModifyEventDto {
  _id: string;
  name: string;
  description: string;
  condition: BaseCondition[];
  isActive: boolean;
  endDate: Date;
  reward: Reward[];
}

export class RequestRewardDto {
  userId: string;
  eventId: string;
}
