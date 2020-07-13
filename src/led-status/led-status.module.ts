import { Module } from '@nestjs/common';
import { LedStatusService } from './led-status.service';
import {LedStatusGateway} from "./led-status.gateway";

@Module({
  providers: [LedStatusService, LedStatusGateway],
  exports: [LedStatusService]
})
export class LedStatusModule {}
