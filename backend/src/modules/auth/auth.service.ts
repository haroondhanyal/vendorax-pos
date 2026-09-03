import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../database/prisma.service.js';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({ where: { email: email.toLowerCase(), isActive: true, deletedAt: null } });
    if (!user || !(await bcrypt.compare(password, user.password))) throw new UnauthorizedException('Invalid email or password');
    const payload = { sub: user.id, email: user.email, role: user.role };
    return { access_token: await this.jwt.signAsync(payload), user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role } };
  }

  async register(data: any) {
    if (!data.email || !data.password || !data.firstName) throw new BadRequestException('Name, email and password are required');
    const email = data.email.trim().toLowerCase();
    const username = (data.username ?? email.split('@')[0]).replace(/[^a-z0-9_]/gi, '') || `user${Date.now()}`;
    const user = await this.prisma.user.create({ data: { email, username: `${username}${Date.now().toString().slice(-4)}`, password: await bcrypt.hash(data.password, 10), firstName: data.firstName.trim(), lastName: data.lastName?.trim() || null, role: data.role === 'ADMIN' || data.role === 'MANAGER' ? data.role : 'CASHIER' } });
    return { message: 'User registered', user: { id: user.id, email: user.email, firstName: user.firstName, role: user.role } };
  }

  async validateUser(email: string) {
    return { email };
  }
}
