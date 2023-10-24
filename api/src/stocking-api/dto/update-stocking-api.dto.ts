import { PartialType } from '@nestjs/mapped-types';
import { CreateStockingApiDto } from './create-stocking-api.dto';

export class UpdateStockingApiDto extends PartialType(CreateStockingApiDto) {}
