import { Controller, Get } from '@nestjs/common';
import { BrandsService } from './brand.service.js';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  findAll() {
    return this.brandsService.findAll();
  }
}
