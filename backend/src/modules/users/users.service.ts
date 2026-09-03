import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      select: { id: true, firstName: true, lastName: true, email: true, username: true, role: true, isActive: true, createdAt: true },
    });
  }

  async create(data: { firstName: string; lastName?: string; email: string; role?: string }) {
    const email = data.email?.trim().toLowerCase();
    if (!data.firstName?.trim() || !email) throw new BadRequestException('Name and email are required');
    const username = email.split('@')[0].replace(/[^a-z0-9_]/g, '') || `user${Date.now()}`;
    return this.prisma.user.create({
      data: {
        firstName: data.firstName.trim(),
        lastName: data.lastName?.trim() || null,
        email,
        username: `${username}${Date.now().toString().slice(-4)}`,
        password: 'local-user-password-change-me',
        role: this.role(data.role),
      },
      select: { id: true, firstName: true, lastName: true, email: true, username: true, role: true, isActive: true, createdAt: true },
    });
  }

  private role(value?: string) {
    return ['ADMIN', 'MANAGER', 'CASHIER', 'INVENTORY_OPERATOR', 'PURCHASE_OPERATOR', 'ACCOUNTANT'].includes(value ?? '') ? value as any : 'CASHIER';
  }
}
