/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, HttpException, Post, Res } from '@nestjs/common';
import { AccountService } from './account.service';
import { Response } from 'express';
import { LoggingService } from 'src/logging/logging.service';
import * as jwt from 'jsonwebtoken';

@Controller('account')
export class AccountController {
  accountService: AccountService;
  loggingService: LoggingService;
  constructor(accountService: AccountService, loggingService: LoggingService) {
    this.accountService = accountService;
    this.loggingService = loggingService;
  }

  @Post('signup')
  async signUp(@Body() body: { name: string; password: string }) {
    const { name, password } = body;
    return this.accountService.signUp(name, password);
  }

  @Post('signin')
  async signIn(
    @Body() body: { name: string; password: string },
    @Res() res: Response,
  ) {
    const { name, password } = body;
    const setCookieHeader = await this.accountService.signIn(name, password);

    if (!setCookieHeader) {
      throw new HttpException('로그인 실패: 쿠키 없음', 401);
    }

    // 쿠키 삭제 -> 새 쿠키 설정
    res.setHeader('Set-Cookie', 'Authentication=; HttpOnly; Path=/; Max-Age=0');
    res.setHeader('Set-Cookie', setCookieHeader);

    // JWT 추출
    const token = this.extractTokenFromSetCookie(setCookieHeader[0]);
    const decoded: any = jwt.decode(token); // 서명 검증 없이 단순 디코딩

    await this.loggingService.loggingLogin(decoded?.id);

    res.json({
      message: `로그인 성공, 환영합니다 (${decoded?.role})${decoded?.name}`,
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch(error) {
    throw new HttpException('로그인 실패', 401);
  }

  @Post('logout')
  logout(@Res() res: Response) {
    // 쿠키 삭제용 Set-Cookie 헤더 설정
    res.setHeader('Set-Cookie', 'Authentication=; HttpOnly; Path=/; Max-Age=0');
    return res.json({ message: '로그아웃 완료' });
  }

  // 쿠키 문자열에서 JWT만 추출
  extractTokenFromSetCookie(setCookie: string): string {
    const match = setCookie.match(/Authentication=([^;]+)/);
    return match?.[1] || '';
  }
}
