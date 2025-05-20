import { Injectable } from '@nestjs/common';
import { CreateAcccountDto } from './account.dto';
import { Account } from './account.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
  ) {}

  async createAcccount(createAccountDto: CreateAcccountDto): Promise<Account> {
    // NOTE: admin 계정은 자동으로 생성
    if (createAccountDto.name === 'admin') {
      return await new this.accountModel({
        name: createAccountDto.name,
        role: 'admin',
      }).save();
    }
    const createdAccount = new this.accountModel(createAccountDto);

    return await createdAccount.save();
  }

  async findAll(): Promise<Account[]> {
    return await this.accountModel.find().exec();
  }

  async findOne(id: string): Promise<Account | null> {
    return await this.accountModel.findOne({ _id: id }).exec();
  }

  async findByName(name: string): Promise<Account | null> {
    return await this.accountModel.findOne({ name }).exec();
  }

  async setRole(name: string, role: string): Promise<Account | null> {
    const validRoles = ['user', 'operator', 'auditor', 'admin'];
    if (!validRoles.includes(role)) {
      throw new Error('Invalid role');
    }

    const account = await this.accountModel.findOne({ name }).exec();
    if (!account) {
      throw new Error('Account not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (account.role === role) {
      throw new Error('Role is already set to this value');
    }

    return await this.accountModel
      .findOneAndUpdate({ name }, { role }, { new: true })
      .exec();
  }
}
