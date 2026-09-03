import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service.js';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats() {
    const start = new Date(); start.setHours(0, 0, 0, 0);
    const [sales, totalProducts, lowStock, recentSales, expenses] = await Promise.all([
      this.prisma.sale.aggregate({ _sum: { totalAmount: true }, _count: true, where: { createdAt: { gte: start } } }),
      this.prisma.product.count({ where: { isActive: true } }),
      this.prisma.stock.findMany({ include: { product: true } }).then((rows) => rows.filter((row) => row.quantity <= row.product.minimumStock)),
      this.prisma.sale.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { customer: true } }),
      this.prisma.expense.aggregate({ _sum: { amount: true }, where: { expenseDate: { gte: start } } }),
    ]);
    return { todaySales: Number(sales._sum.totalAmount ?? 0), todayOrders: sales._count, totalProducts, lowStockCount: lowStock.length, todayExpenses: Number(expenses._sum.amount ?? 0), recentSales };
  }
}
