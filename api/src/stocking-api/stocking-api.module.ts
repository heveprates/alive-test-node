import { Module } from '@nestjs/common';
import { StockingApiService } from './stocking-api.service';
import { StockingApiController } from './stocking-api.controller';
import { AlphaVantageApiModule } from '../alpha-vantage-api/alpha-vantage-api.module';

@Module({
  imports: [AlphaVantageApiModule],
  controllers: [StockingApiController],
  providers: [StockingApiService],
})
export class StockingApiModule {}
