import { Controller, Get } from '@nestjs/common';
import { SuppliersService } from './supplier.service.js';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get()
  findAll() {
    return this.suppliersService.findAll();
  }
}
