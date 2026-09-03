import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service.js';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async stockByProduct(productId: string) {
    const stock = await this.prisma.stock.findUnique({ where: { productId }, include: { product: true } });
    if (!stock) throw new NotFoundException('Stock record not found');
    return stock;
  }

  async findAll() {
    return this.prisma.stock.findMany({ include: { product: { include: { category: true } } }, orderBy: { updatedAt: 'desc' } });
  }

  async adjust(productId: string, quantity: number, notes?: string) {
    if (!Number.isInteger(quantity) || quantity === 0) throw new BadRequestException('Quantity must be a non-zero integer');
    return this.prisma.$transaction(async (tx) => {
      const stock = await tx.stock.findUnique({ where: { productId } });
      if (!stock) throw new NotFoundException('Stock record not found');
      const next = stock.quantity + quantity;
      if (next < 0) throw new BadRequestException('Adjustment would make stock negative');
      const updated = await tx.stock.update({ where: { productId }, data: { previousQuantity: stock.quantity, quantity: next } });
      await tx.stockMovement.create({ data: { productId, movementType: 'ADJUSTMENT', quantity, previousStock: stock.quantity, newStock: next, notes } });
      return updated;
    });
  }
}
