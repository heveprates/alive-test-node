import { Module } from '@nestjs/common';
import { FetchApiService } from './fetch-api/fetch-api.service';
import { DataParseService } from './data-parse/data-parse.service';

@Module({
  providers: [FetchApiService, DataParseService],
  exports: [FetchApiService],
})
export class AlphaVantageApiModule {}
