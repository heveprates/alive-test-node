import { Module } from '@nestjs/common';
import { StockingApiService } from './stocking-api.service';
import { StockingApiController } from './stocking-api.controller';

@Module({
  controllers: [StockingApiController],
  providers: [StockingApiService],
})
export class StockingApiModule {}
