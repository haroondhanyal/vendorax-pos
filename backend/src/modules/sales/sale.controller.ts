import { Body, Controller, Get, Post } from '@nestjs/common';
import { SalesService } from './sale.service.js';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Post()
  create(@Body() body: any) { return this.salesService.create(body); }
}
