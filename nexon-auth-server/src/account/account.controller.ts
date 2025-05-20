import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from './account.schema';
// import { CreateAcccountDto } from './account.dto';

@Controller('account')
export class AccountController {
  accountService: AccountService;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
  }

  // @Post()
  // async createAccount(
  //   @Body() createAccountDto: CreateAcccountDto,
  // ): Promise<Account> {
  //   return this.accountService.createAcccount(createAccountDto);
  // }

  @Get('all')
  async findAll(): Promise<Account[]> {
    return this.accountService.findAll();
  }

  @Get('/:name')
  async findOne(@Param('name') name: string): Promise<Account | null> {
    return this.accountService.findByName(name);
  }

  @Patch('/:name')
  async setRole(
    @Param('name') name: string,
    @Body('role') role: string,
  ): Promise<Account | null> {
    return this.accountService.setRole(name, role);
  }
}
