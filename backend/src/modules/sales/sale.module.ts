import { Module } from '@nestjs/common';
import { SalesController } from './sale.controller.js';
import { SalesService } from './sale.service.js';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService],
})
export class SalesModule {}
