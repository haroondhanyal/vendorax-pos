import { Controller, Get } from '@nestjs/common';
import { UnitsService } from './unit.service.js';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Get()
  findAll() {
    return this.unitsService.findAll();
  }
}
