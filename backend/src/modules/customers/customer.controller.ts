import { Controller, Get } from '@nestjs/common';
import { CustomersService } from './customer.service.js';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAll() {
    return this.customersService.findAll();
  }
}
