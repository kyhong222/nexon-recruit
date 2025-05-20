import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCreateDto, RequestWithUser } from './auth.dto';
import { Auth } from './auth.schema';
import { LocalAuthGuard } from './guard/local.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post('register')
  async register(@Body() authCreateDto: AuthCreateDto): Promise<Auth> {
    return this.authService.createAuth(authCreateDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const auth = request.user;
    const cookie = await this.authService.getCookieWithJwtToken(auth);

    response.setHeader('Set-Cookie', cookie);
    auth.password = '';

    return response.send(auth);
  }

  @Post('logout')
  logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }
}
