import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query('q') query?: string) {
    return this.productsService.findAll(query);
  }

  @Post() create(@Body() body: any) { return this.productsService.create(body); }
  @Put(':id') update(@Param('id') id: string, @Body() body: any) { return this.productsService.update(id, body); }
  @Delete(':id') deactivate(@Param('id') id: string) { return this.productsService.deactivate(id); }
}
