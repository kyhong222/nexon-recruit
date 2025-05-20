import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { HttpModule } from '@nestjs/axios';
import { LoggingModule } from 'src/logging/logging.module';

@Module({
  imports: [HttpModule, LoggingModule],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
