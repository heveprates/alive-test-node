import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockingApiModule } from './stocking-api/stocking-api.module';
import { AlphaVantageApiModule } from './alpha-vantage-api/alpha-vantage-api.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    StockingApiModule,
    AlphaVantageApiModule,
  ],
})
export class AppModule {}
