import { Module } from '@nestjs/common';
import { PurchasesController } from './purchase.controller.js';
import { PurchasesService } from './purchase.service.js';

@Module({
  controllers: [PurchasesController],
  providers: [PurchasesService],
  exports: [PurchasesService],
})
export class PurchasesModule {}
