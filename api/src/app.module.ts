import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockingApiModule } from './stocking-api/stocking-api.module';
import { AlphaVantageApiModule } from './alpha-vantage-api/alpha-vantage-api.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [StockingApiModule, AlphaVantageApiModule],
})
export class AppModule {}
