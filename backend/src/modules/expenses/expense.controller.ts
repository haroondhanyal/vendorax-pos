import { Controller, Get } from '@nestjs/common';
import { ExpensesService } from './expense.service.js';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  findAll() {
    return this.expensesService.findAll();
  }
}
