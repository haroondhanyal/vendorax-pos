import { Module } from '@nestjs/common';
import { CustomersController } from './customer.controller.js';
import { CustomersService } from './customer.service.js';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
