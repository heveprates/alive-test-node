import { Test, TestingModule } from '@nestjs/testing';
import { StockingApiController } from './stocking-api.controller';
import { StockingApiService } from './stocking-api.service';

describe('StockingApiController', () => {
  let controller: StockingApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockingApiController],
      providers: [StockingApiService],
    }).compile();

    controller = module.get<StockingApiController>(StockingApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
