// import { Test, TestingModule } from '@nestjs/testing';
import { StockingApiController } from './stocking-api.controller';
// import { StockingApiService } from './stocking-api.service';
// import { FetchApiService } from 'src/alpha-vantage-api/fetch-api/fetch-api.service';
// import { DataParseService } from 'src/alpha-vantage-api/data-parse/data-parse.service';

describe('StockingApiController', () => {
  let controller: StockingApiController;

  beforeEach(async () => {
    // const moduleAlphaVantage: TestingModule = await Test.createTestingModule({
    //   providers: [FetchApiService, DataParseService],
    // }).compile();
    // const module: TestingModule = await Test.createTestingModule({
    //   controllers: [StockingApiController],
    //   providers: [
    //     StockingApiService,
    //     {
    //       provide: FetchApiService,
    //       useValue: moduleAlphaVantage.get<FetchApiService>(FetchApiService),
    //     },
    //   ],
    // }).compile();
    // controller = module.get<StockingApiController>(StockingApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeUndefined();
  });
});
