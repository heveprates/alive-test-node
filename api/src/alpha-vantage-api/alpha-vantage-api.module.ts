import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { DataParseService } from './data-parse/data-parse.service';
import { FetchApiService } from './fetch-api/fetch-api.service';

@Module({
  imports: [HttpModule],
  providers: [
    FetchApiService,
    {
      provide: 'AlphaVantageAPIKEY',
      useValue: 'LA56I75ZAUEMKQ9Y',
    },
    DataParseService,
  ],
  exports: [FetchApiService],
})
export class AlphaVantageApiModule {}
