import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ItemModule } from './item/item.module';
import { EventModule } from './event/event.module';
import { RewardModule } from './reward/reward.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggingModule } from './logging/logging.module';
import { AccountModule } from './account/account.module';
import { ConfigModule } from '@nestjs/config';
import { ConditionModule } from './condition/condition.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://mongodb:27017/nest',
    ),
    ConfigModule.forRoot({ isGlobal: true }),
    AdminModule,
    ItemModule,
    EventModule,
    RewardModule,
    UserModule,
    LoggingModule,
    AccountModule,
    ConditionModule,
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
