import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { DataParseService } from './data-parse/data-parse.service';
import { FetchApiService } from './fetch-api/fetch-api.service';

@Module({
  imports: [HttpModule],
  providers: [
    FetchApiService,
    {
      provide: 'AlphaVantageAPIKEY',
      useFactory: (configService: ConfigService) =>
        configService.get<string>('ALPHA_VANTAGE_APIKEY'),
      inject: [ConfigService],
    },
    DataParseService,
  ],
  exports: [FetchApiService],
})
export class AlphaVantageApiModule {}
