export class CreateEventDto {
  name: string;
  description: string;
  conditions: string[];
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  rewards: string[];

  constructor(
    name: string,
    description: string = '',
    conditions: string[] = [],
    isActive: boolean = false,
    startDate?: Date,
    endDate?: Date,
    rewards: string[] = [],
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
  condition: string[];
  isActive: boolean;
  endDate: Date;
  reward: string[];
}
