/* eslint-disable @typescript-eslint/no-unsafe-return */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateEventDto, ModifyEventDto } from './event.dto';

const EVENT_SERVER_URL =
  process.env.EVENT_SERVER_URL || 'http://localhost:3001';

@Injectable()
export class EventService {
  constructor(private readonly httpService: HttpService) {}

  async getAllEvents() {
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

    return response.data;
  }

  async getEventById(id: string) {
    const url = `${EVENT_SERVER_URL}/event/${id}`;
    const response = await this.httpService
      .get(url, {
        withCredentials: true,
        maxRedirects: 0,
        validateStatus: () => true,
      })
      .toPromise();
    if (response?.status !== 200) {
      throw new Error(`Failed to get event: ${response?.statusText}`);
    }
    if (!response.data) {
      throw new Error('Failed to get event: event not found in response');
    }
    return response.data;
  }

  async createEvent(dto: CreateEventDto) {
    const url = `${EVENT_SERVER_URL}/event/create`;
    const response = await this.httpService
      .post(url, dto, {
        withCredentials: true,
        maxRedirects: 0,
        validateStatus: () => true,
      })
      .toPromise();

    if (response?.status !== 201) {
      throw new Error(`Failed to create event: ${response?.statusText}`);
    }
    if (!response.data) {
      throw new Error('Failed to create event: event not found in response');
    }
    return response.data;
  }

  async modifyEvent(dto: ModifyEventDto) {
    const url = `${EVENT_SERVER_URL}/event/modify`;
    const response = await this.httpService
      .patch(url, dto, {
        withCredentials: true,
        maxRedirects: 0,
        validateStatus: () => true,
      })
      .toPromise();

    if (response?.status !== 200) {
      throw new Error(`Failed to modify event: ${response?.statusText}`);
    }
    if (!response.data) {
      throw new Error('Failed to modify event: event not found in response');
    }
    return response.data;
  }
}
