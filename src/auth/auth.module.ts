import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {LocalStrategy} from "./local.strategy";
import {SessionSerializer} from "./session.serializer";
import {PassportModule} from "@nestjs/passport";

@Module({
  providers: [AuthService, LocalStrategy, SessionSerializer],
  imports: [UsersModule, PassportModule],
  exports: [AuthService]
})
export class AuthModule {}
