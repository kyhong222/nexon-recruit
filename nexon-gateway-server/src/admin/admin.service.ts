/* eslint-disable @typescript-eslint/no-unsafe-return */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { SetRoleDto } from './admin.dto';

const AUTH_SERVER_URL = process.env.AUTH_SERVER_URL || 'http://localhost:3000';

@Injectable()
export class AdminService {
  constructor(private readonly httpService: HttpService) {}

  async getAllUsers() {
    const url = `${AUTH_SERVER_URL}/account/all`;

    const response = await this.httpService
      .get(url, {
        withCredentials: true,
        maxRedirects: 0,
        validateStatus: () => true,
      })
      .toPromise();

    if (response?.status !== 200) {
      throw new Error(`Failed to get users: ${response?.statusText}`);
    }

    return response.data;
  }

  async getUserByName(name: string) {
    const url = `${AUTH_SERVER_URL}/account/${name}`;
    const response = await this.httpService
      .get(url, {
        withCredentials: true,
        maxRedirects: 0,
        validateStatus: () => true,
      })
      .toPromise();
    if (response?.status !== 200) {
      throw new Error(`Failed to get user: ${response?.statusText}`);
    }

    return response.data;
  }

  async setRole(dto: SetRoleDto) {
    const { name, role } = dto;
    const url = `${AUTH_SERVER_URL}/account/${name}`;
    // role은 admin, user, auditor, operator 중 하나여야 함
    if (!['admin', 'user', 'auditor', 'operator'].includes(role)) {
      throw new Error('Invalid role');
    }

    const response = await this.httpService
      .patch(
        url,
        { role },
        {
          withCredentials: true,
          maxRedirects: 0,
          validateStatus: () => true,
        },
      )
      .toPromise();

    if (response?.status !== 200) {
      throw new Error(`Failed to set role: ${response?.statusText}`);
    }

    return response.data;
  }
}
