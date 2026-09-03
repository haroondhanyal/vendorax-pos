import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service.js';

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.sale.findMany({ include: { customer: true, user: { select: { firstName: true, lastName: true, email: true } }, items: { include: { product: true } } }, orderBy: { createdAt: 'desc' } });
  }

  async create(data: { customerId?: string; userId?: string; paymentMode: string; paymentReference?: string; paidAmount?: number; discount?: number; notes?: string; items: Array<{ productId: string; quantity: number; unitPrice?: number }> }) {
    if (!data.items?.length) throw new BadRequestException('At least one item is required');
    return this.prisma.$transaction(async (tx) => {
      if (data.userId) {
        const user = await tx.user.findFirst({ where: { id: data.userId, isActive: true, deletedAt: null } });
        if (!user) throw new BadRequestException('Salesperson is not available');
      }
      let subtotal = 0;
      const items = [] as Array<{ productId: string; quantity: number; unitPrice: number; total: number; discount: number }>;
      for (const line of data.items) {
        if (!Number.isInteger(line.quantity) || line.quantity < 1) throw new BadRequestException('Quantity must be a positive integer');
        const [product, stock] = await Promise.all([tx.product.findUnique({ where: { id: line.productId } }), tx.stock.findUnique({ where: { productId: line.productId } })]);
        if (!product || !stock) throw new BadRequestException('Invalid product');
        if (stock.quantity < line.quantity) throw new BadRequestException(`Insufficient stock for ${product.name}`);
        const basePrice = Number(product.retailPrice);
        const productDiscount = product.discountType === 'PERCENT' ? basePrice * Number(product.discountValue) / 100 : product.discountType === 'FIXED' ? Number(product.discountValue) : 0;
        const unitPrice = Math.max(0, Number(line.unitPrice ?? (basePrice - productDiscount)));
        const total = unitPrice * line.quantity;
        subtotal += total;
        items.push({ productId: line.productId, quantity: line.quantity, unitPrice, total, discount: productDiscount * line.quantity });
        await tx.stock.update({ where: { productId: line.productId }, data: { previousQuantity: stock.quantity, quantity: stock.quantity - line.quantity } });
      }
      const tax = items.reduce((sum, item) => sum + item.total * 0.08, 0);
      const discount = Number(data.discount ?? 0);
      const totalAmount = subtotal + tax - discount;
      const invoiceNo = `VX-${Date.now().toString().slice(-8)}`;
      const sale = await tx.sale.create({ data: { invoiceNo, customerId: data.customerId, userId: data.userId, totalAmount, paidAmount: Number(data.paidAmount ?? totalAmount), tax, discount, paymentMode: data.paymentMode, paymentReference: data.paymentReference?.trim() || null, notes: data.notes, items: { create: items } }, include: { items: true } });
      for (const line of items) {
        const current = await tx.stock.findUniqueOrThrow({ where: { productId: line.productId } });
        await tx.stockMovement.create({ data: { productId: line.productId, movementType: 'OUT', quantity: -line.quantity, previousStock: current.quantity + line.quantity, newStock: current.quantity, referenceId: sale.id, referenceType: 'SALE' } });
      }
      return sale;
    });
  }
}
