/* eslint-disable @typescript-eslint/no-unused-vars */
import { ItemType } from './item.schema';

export class CreateItemDto {
  name: string;
  description: string;
  quantity: number;
  imgSrc: string;
  type: ItemType;
}
export class CreateEquipItemDto {
  name: string;
  description: string;
  quantity: number;
  imgSrc: string;
  type: string;

  constructor(
    name: string = '',
    description: string = '',
    quantity: number = 1,
    imgSrc: string = '',
  ) {
    this.name = name;
    this.description = '';
    this.quantity = 1;
    this.imgSrc = imgSrc;
    this.type = ItemType.EQUIPMENT;
  }
}
export class CreateConsumableItemDto {
  name: string;
  description: string;
  quantity: number;
  imgSrc: string;
  type: string;

  constructor(
    name: string = '',
    description: string = '',
    quantity: number = 1,
    imgSrc: string = '',
  ) {
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.imgSrc = imgSrc;
    this.type = ItemType.CONSUMABLE;
  }
}
export class CreateInstallationItemDto {
  name: string;
  description: string;
  quantity: number;
  imgSrc: string;
  type: string;

  constructor(
    name: string = '',
    description: string = '',
    quantity: number = 1,
    imgSrc: string = '',
  ) {
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.imgSrc = imgSrc;
    this.type = ItemType.INSTALLATION;
  }
}
export class CreateOtherItemDto {
  name: string;
  description: string;
  quantity: number;
  imgSrc: string;
  type: string;

  constructor(
    name: string = '',
    description: string = '',
    quantity: number = 1,
    imgSrc: string = '',
  ) {
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.imgSrc = imgSrc;
    this.type = ItemType.OTHER;
  }
}
export class CreateCashItemDto {
  name: string;
  description: string;
  quantity: number;
  imgSrc: string;
  type: string;

  constructor(
    name: string = '',
    description: string = '',
    quantity: number = 1,
    imgSrc: string = '',
  ) {
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.imgSrc = imgSrc;
    this.type = ItemType.CASH;
  }
}
export class CreateExpItemDto {
  name: string;
  description: string;
  quantity: number;
  imgSrc: string;
  type: string;

  constructor(
    name: string = '',
    description: string = '',
    quantity: number = 1,
    imgSrc: string = 'EXP.png',
  ) {
    this.name = '경험치';
    this.description = '경험치를 획득한다.';
    this.quantity = quantity;
    this.imgSrc = 'EXP.png';
    this.type = ItemType.EXP;
  }
}
export class CreateMesoItemDto {
  name: string;
  description: string;
  quantity: number;
  imgSrc: string;
  type: string;

  constructor(
    name: string = '',
    description: string = '',
    quantity: number = 1,
    imgSrc: string = 'Meso.png',
  ) {
    this.name = '메소';
    this.description = '메소를 획득한다.';
    this.quantity = quantity;
    this.imgSrc = 'Meso.png';
    this.type = ItemType.MESO;
  }
}
export class CreatePopItemDto {
  name: string;
  description: string;
  quantity: number;
  imgSrc: string;
  type: string;

  constructor(
    name: string = '',
    description: string = '',
    quantity: number = 1,
    imgSrc: string = 'Pop.png',
  ) {
    this.name = '인기도';
    this.description = '인기도를 획득한다.';
    this.quantity = quantity;
    this.imgSrc = 'Pop.png';
    this.type = ItemType.POP;
  }
}
