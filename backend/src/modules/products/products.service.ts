import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service.js';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query = '') {
    return this.prisma.product.findMany({
      where: { isActive: true, ...(query ? { OR: [{ name: { contains: query, mode: 'insensitive' } }, { sku: { contains: query, mode: 'insensitive' } }, { barcode: { contains: query } }] } : {}) },
      include: { category: true, brand: true, unit: true, stock: true }, orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: any) {
    const { category: categoryName, ...productData } = data;
    const category = data.categoryId ? null : await this.prisma.category.upsert({ where: { slug: this.slug(categoryName ?? 'General') }, update: {}, create: { name: categoryName ?? 'General', slug: this.slug(categoryName ?? 'General') } });
    const unit = data.unitId ? null : await this.prisma.unit.upsert({ where: { slug: 'piece' }, update: {}, create: { name: 'Piece', slug: 'piece' } });
    const product = await this.prisma.product.create({ data: { ...productData, categoryId: data.categoryId ?? category!.id, unitId: data.unitId ?? unit!.id, sku: data.sku ?? `VX-${Date.now().toString().slice(-8)}`, purchasePrice: Number(data.purchasePrice ?? data.retailPrice), retailPrice: Number(data.retailPrice), wholesalePrice: Number(data.wholesalePrice ?? data.retailPrice), tax: Number(data.tax ?? 0), minimumStock: Number(data.minimumStock ?? 10), openingStock: Number(data.openingStock ?? 0) } });
    await this.prisma.stock.create({ data: { productId: product.id, quantity: product.openingStock, previousQuantity: 0 } });
    return product;
  }

  async update(id: string, data: any) {
    await this.getById(id);
    return this.prisma.product.update({ where: { id }, data });
  }

  async deactivate(id: string) {
    await this.getById(id);
    return this.prisma.product.update({ where: { id }, data: { isActive: false } });
  }

  private async getById(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  private slug(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }
}
