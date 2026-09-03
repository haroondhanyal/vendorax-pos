import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './database/prisma.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { BrandsModule } from './modules/brands/brand.module.js';
import { CategoriesModule } from './modules/categories/categories.module.js';
import { CustomersModule } from './modules/customers/customer.module.js';
import { DashboardModule } from './modules/dashboard/dashboard.module.js';
import { ExpensesModule } from './modules/expenses/expense.module.js';
import { InventoryModule } from './modules/inventory/inventory.module.js';
import { ProductsModule } from './modules/products/products.module.js';
import { PurchasesModule } from './modules/purchases/purchase.module.js';
import { ReportsModule } from './modules/reports/report.module.js';
import { SalesModule } from './modules/sales/sale.module.js';
import { SuppliersModule } from './modules/suppliers/supplier.module.js';
import { UnitsModule } from './modules/units/unit.module.js';
import { UsersModule } from './modules/users/users.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    BrandsModule,
    UnitsModule,
    InventoryModule,
    PurchasesModule,
    SuppliersModule,
    SalesModule,
    CustomersModule,
    DashboardModule,
    ReportsModule,
    ExpensesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
