import { Module } from '@nestjs/common';
import { ReportsController } from './report.controller.js';
import { ReportsService } from './report.service.js';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
