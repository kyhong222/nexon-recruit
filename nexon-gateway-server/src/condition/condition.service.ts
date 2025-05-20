/* eslint-disable @typescript-eslint/no-unsafe-return */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateConditionDto } from './condition.dto';

const EVENT_SERVER_URL =
  process.env.EVENT_SERVER_URL || 'http://localhost:3001';

@Injectable()
export class ConditionService {
  constructor(private readonly httpService: HttpService) {}

  async getAllConditions() {
    const url = `${EVENT_SERVER_URL}/condition/all`;

    const response = await this.httpService
      .get(url, {
        withCredentials: true,
        maxRedirects: 0,
        validateStatus: () => true,
      })
      .toPromise();

    if (response?.status !== 200) {
      throw new Error(`Failed to get conditions: ${response?.statusText}`);
    }

    return response.data;
  }

  async getAllContinuousLoginConditions() {
    const url = `${EVENT_SERVER_URL}/condition/continuousLogin`;

    const response = await this.httpService
      .get(url, {
        withCredentials: true,
        maxRedirects: 0,
        validateStatus: () => true,
      })
      .toPromise();

    if (response?.status !== 200) {
      throw new Error(`Failed to get conditions: ${response?.statusText}`);
    }

    return response.data;
  }

  async getAllKillTargetMonsterConditions() {
    const url = `${EVENT_SERVER_URL}/condition/killTargetMonster`;

    const response = await this.httpService
      .get(url, {
        withCredentials: true,
        maxRedirects: 0,
        validateStatus: () => true,
      })
      .toPromise();

    if (response?.status !== 200) {
      throw new Error(`Failed to get conditions: ${response?.statusText}`);
    }

    return response.data;
  }

  async getAllClearTargetQuestConditions() {
    const url = `${EVENT_SERVER_URL}/condition/clearTargetQuest`;

    const response = await this.httpService
      .get(url, {
        withCredentials: true,
        maxRedirects: 0,
        validateStatus: () => true,
      })
      .toPromise();

    if (response?.status !== 200) {
      throw new Error(`Failed to get conditions: ${response?.statusText}`);
    }

    return response.data;
  }

  async createCondition(dto: CreateConditionDto) {
    const url = `${EVENT_SERVER_URL}/condition/create`;
    const response = await this.httpService
      .post(url, dto, {
        withCredentials: true,
        maxRedirects: 0,
        validateStatus: () => true,
      })
      .toPromise();

    if (response?.status !== 201) {
      throw new Error(`Failed to create condition: ${response?.statusText}`);
    }
    if (!response.data) {
      throw new Error(
        'Failed to create condition: condition not found in response',
      );
    }
    return response.data;
  }
}
