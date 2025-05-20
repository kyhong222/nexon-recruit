export enum ItemType {
  EQUIPMENT = 'equipment',
  CONSUMABLE = 'consumable',
  INSTALLATION = 'installation',
  OTHER = 'other',
  CASH = 'cash',
  MESO = 'meso',
  EXP = 'exp',
  POP = 'pop',
}

export class CreateItemDto {
  name: string;
  description: string;
  quantity: number;
  imgSrc: string;
  type: ItemType;
}
