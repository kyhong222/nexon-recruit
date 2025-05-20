/* eslint-disable @typescript-eslint/no-unsafe-return */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateRewardDto, ModifyRewardDto } from './reward.dto';

const EVENT_SERVER_URL =
  process.env.EVENT_SERVER_URL || 'http://localhost:3001';

@Injectable()
export class RewardService {
  constructor(private readonly httpService: HttpService) {}

  async getAllRewards() {
    const url = `${EVENT_SERVER_URL}/reward/all`;

    const response = await this.httpService
      .get(url, {
        withCredentials: true,
        maxRedirects: 0,
        validateStatus: () => true,
      })
      .toPromise();

    if (response?.status !== 200) {
      throw new Error(`Failed to get rewards: ${response?.statusText}`);
    }

    return response.data;
  }

  async getRewardById(id: string) {
    const url = `${EVENT_SERVER_URL}/reward/${id}`;
    const response = await this.httpService
      .get(url, {
        withCredentials: true,
        maxRedirects: 0,
        validateStatus: () => true,
      })
      .toPromise();
    if (response?.status !== 200) {
      throw new Error(`Failed to get reward: ${response?.statusText}`);
    }
    if (!response.data) {
      throw new Error('Failed to get reward: reward not found in response');
    }
    return response.data;
  }

  async createReward(dto: CreateRewardDto) {
    const url = `${EVENT_SERVER_URL}/reward/create`;
    const response = await this.httpService
      .post(url, dto, {
        withCredentials: true,
        maxRedirects: 0,
        validateStatus: () => true,
      })
      .toPromise();

    if (response?.status !== 201) {
      throw new Error(`Failed to create reward: ${response?.statusText}`);
    }
    if (!response.data) {
      throw new Error('Failed to create reward: reward not found in response');
    }
    return response.data;
  }

  async modifyReward(dto: ModifyRewardDto) {
    const url = `${EVENT_SERVER_URL}/reward/modify`;
    const response = await this.httpService
      .patch(url, dto, {
        withCredentials: true,
        maxRedirects: 0,
        validateStatus: () => true,
      })
      .toPromise();
    if (response?.status !== 200) {
      throw new Error(`Failed to modify reward: ${response?.statusText}`);
    }
    if (!response.data) {
      throw new Error('Failed to modify reward: reward not found in response');
    }
    return response.data;
  }
}
