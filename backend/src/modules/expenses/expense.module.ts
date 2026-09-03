import { Module } from '@nestjs/common';
import { ExpensesController } from './expense.controller.js';
import { ExpensesService } from './expense.service.js';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService],
  exports: [ExpensesService],
})
export class ExpensesModule {}
