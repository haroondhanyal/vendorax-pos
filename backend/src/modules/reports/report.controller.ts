import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './report.service.js';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }
}
