import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Auth } from './auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AuthCreateDto, AuthLoginDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './tokenPayload.interface';
import { AccountService } from '../account/account.service';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    // @InjectModel(Account.name) private accountModel: Model<Account>,
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async findOneByName(name: string): Promise<Auth> {
    try {
      const auth = await this.authModel.findOne({ name }).exec();
      if (!auth) {
        throw new Error('Auth not found');
      }
      return auth;
    } catch (error) {
      console.error('Error finding auth by name:', error);
      throw new Error('Failed to find auth');
    }
  }

  async createAuth(authCreateDto: AuthCreateDto): Promise<Auth> {
    const { name, password } = authCreateDto;

    const hashedPassword = await this.hashPassword(password);

    try {
      const account = await this.accountService.createAcccount({ name });

      const auth = new this.authModel({
        name,
        password: hashedPassword,
        account,
      });

      await auth.save();

      auth.password = ''; // Remove password from the response

      return auth;
    } catch (error) {
      console.error('Error creating auth:', error);
      throw new Error('Failed to create auth');
    }
  }

  async login(authLoginDto: AuthLoginDto): Promise<Auth> {
    const { name, password } = authLoginDto;
    try {
      const auth = await this.findOneByName(name);
      if (!auth) {
        throw new Error('Auth not found');
      }
      const isPasswordValid = await this.comparePassword(
        password,
        auth.password,
      );
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      auth.password = ''; // Remove password from the response

      return auth;
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Failed to login');
    }
  }

  async getCookieWithJwtToken(auth: Auth) {
    const foundAuth = await this.authModel.findById(auth).populate('account');
    const tokenPayload: TokenPayload = {
      id: auth.account,
      name: foundAuth?.account?.name || '',
      role: foundAuth?.account?.role || '',
    };

    const token = this.jwtService.sign(tokenPayload, {
      expiresIn: parseInt(
        this.configService.get('JWT_EXPIRATION_TIME') || '3600',
        10,
      ),
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
