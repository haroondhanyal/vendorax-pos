import { Module } from '@nestjs/common';
import { SuppliersController } from './supplier.controller.js';
import { SuppliersService } from './supplier.service.js';

@Module({
  controllers: [SuppliersController],
  providers: [SuppliersService],
  exports: [SuppliersService],
})
export class SuppliersModule {}
