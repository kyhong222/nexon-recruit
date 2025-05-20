/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Account } from './account.schema';

const AUTH_SERVER_URL = process.env.AUTH_SERVER_URL || 'http://localhost:3000';

@Injectable()
export class AccountService {
  constructor(private readonly httpService: HttpService) {}

  async signUp(name: string, password: string): Promise<Account> {
    const body = {
      name,
      password,
    };

    const url = `${AUTH_SERVER_URL}/auth/register`;

    const response = await firstValueFrom(
      this.httpService.post(url, body, {
        withCredentials: true,
        maxRedirects: 0,
        validateStatus: () => true,
      }),
    );

    if (response.status !== 201) {
      throw new Error(`Failed to sign up: ${response.statusText}`);
    }
    if (!response.data?.account) {
      throw new Error('Failed to sign up: account not found in response');
    }

    const newAccount = response.data?.account as Account;

    return newAccount;
  }

  async signIn(name: string, password: string) {
    const body = {
      name,
      password,
    };

    const url = `${AUTH_SERVER_URL}/auth/login`;

    const response = await firstValueFrom(
      this.httpService.post(url, body, {
        withCredentials: true,
        maxRedirects: 0,
        validateStatus: () => true,
      }),
    );

    const setCookieHeader = response.headers['set-cookie'];
    if (!setCookieHeader) {
      throw new Error('Set-Cookie 헤더 없음');
    }

    return setCookieHeader;

    // // 쿠키 문자열 중 access_token 찾기
    // const accessTokenCookie = setCookieHeader.find((c: string) =>
    //   c.startsWith('Authentication='),
    // );

    // if (!accessTokenCookie) {
    //   throw new Error('access_token 쿠키 없음');
    // }

    // // JWT 값만 추출 (access_token=xxxxx; Path=/ ... → xxxxx)
    // const jwt = accessTokenCookie.split(';')[0].split('=')[1];

    // return jwt;
  }
}
