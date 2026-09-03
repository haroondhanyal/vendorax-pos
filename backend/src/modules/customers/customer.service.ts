import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service.js';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.customer.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { sales: true } } },
    });
  }

  async create(data: { name: string; phone?: string; email?: string; address?: string }) {
    if (!data.name?.trim()) throw new BadRequestException('Customer name is required');
    return this.prisma.customer.create({
      data: {
        name: data.name.trim(),
        phone: data.phone?.trim() || null,
        email: data.email?.trim() || null,
        address: data.address?.trim() || null,
      },
    });
  }
}
