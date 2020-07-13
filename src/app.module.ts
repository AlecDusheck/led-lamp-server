import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { LedStatusModule } from './led-status/led-status.module';

@Module({
  imports: [AuthModule, UsersModule, LedStatusModule],
  controllers: [AppController],
  providers: [UsersService],
})
export class AppModule {}
