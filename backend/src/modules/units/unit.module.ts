import { Module } from '@nestjs/common';
import { UnitsController } from './unit.controller.js';
import { UnitsService } from './unit.service.js';

@Module({
  controllers: [UnitsController],
  providers: [UnitsService],
  exports: [UnitsService],
})
export class UnitsModule {}
