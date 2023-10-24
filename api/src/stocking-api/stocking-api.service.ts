import { Injectable } from '@nestjs/common';
import { CreateStockingApiDto } from './dto/create-stocking-api.dto';
import { UpdateStockingApiDto } from './dto/update-stocking-api.dto';

@Injectable()
export class StockingApiService {
  create(createStockingApiDto: CreateStockingApiDto) {
    return 'This action adds a new stockingApi';
  }

  findAll() {
    return `This action returns all stockingApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockingApi`;
  }

  update(id: number, updateStockingApiDto: UpdateStockingApiDto) {
    return `This action updates a #${id} stockingApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockingApi`;
  }
}
