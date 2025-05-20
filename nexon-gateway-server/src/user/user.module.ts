import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HttpModule } from '@nestjs/axios';
import { LoggingModule } from 'src/logging/logging.module';
import { InventoryModule } from 'src/inventory/inventory.module';

@Module({
  imports: [HttpModule, LoggingModule, InventoryModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
