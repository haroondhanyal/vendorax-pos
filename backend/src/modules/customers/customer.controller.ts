import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomersService } from './customer.service.js';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Post()
  create(@Body() body: { name: string; phone?: string; email?: string; address?: string }) {
    return this.customersService.create(body);
  }
}
