import { Module } from '@nestjs/common';
import { BrandsController } from './brand.controller.js';
import { BrandsService } from './brand.service.js';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService],
})
export class BrandsModule {}
