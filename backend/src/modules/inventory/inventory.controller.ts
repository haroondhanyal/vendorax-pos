import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InventoryService } from './inventory.service.js';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('stock')
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get('stock/:productId')
  getStock(@Param('productId') productId: string) {
    return this.inventoryService.stockByProduct(productId);
  }

  @Post('adjust')
  adjust(@Body() body: { productId: string; quantity: number; notes?: string }) {
    return this.inventoryService.adjust(body.productId, Number(body.quantity), body.notes);
  }
}
