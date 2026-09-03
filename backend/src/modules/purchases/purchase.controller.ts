import { Controller, Get } from '@nestjs/common';
import { PurchasesService } from './purchase.service.js';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Get()
  findAll() {
    return this.purchasesService.findAll();
  }
}
