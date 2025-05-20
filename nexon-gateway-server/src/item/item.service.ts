/* eslint-disable @typescript-eslint/no-unsafe-return */

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './item.dto';

const EVENT_SERVER_URL =
  process.env.EVENT_SERVER_URL || 'http://localhost:3001';

@Injectable()
export class ItemService {
  constructor(private readonly httpService: HttpService) {}

  async getAllItems() {
    const url = `${EVENT_SERVER_URL}/item/all`;

    const response = await this.httpService
      .get(url, {
        withCredentials: true,
        maxRedirects: 0,
        validateStatus: () => true,
      })
      .toPromise();

    if (response?.status !== 200) {
      throw new Error(`Failed to get items: ${response?.statusText}`);
    }

    return response.data;
  }

  async createItem(dto: CreateItemDto) {
    const url = `${EVENT_SERVER_URL}/item/create`;
    const response = await this.httpService
      .post(url, dto, {
        withCredentials: true,
        maxRedirects: 0,
        validateStatus: () => true,
      })
      .toPromise();

    if (response?.status !== 201) {
      throw new Error(`Failed to create item: ${response?.statusText}`);
    }
    if (!response.data) {
      throw new Error('Failed to create item: item not found in response');
    }
    return response.data;
  }
}
