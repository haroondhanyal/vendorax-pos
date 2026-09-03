import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const products = [
  ['Arabica Coffee 250g', 'Beverages', 12.5, 40, 8, 'PERCENT', 10, '2026-12-31'],
  ['Sparkling Water 500ml', 'Beverages', 2, 60, 12, null, 0, '2027-05-01'],
  ['Sea Salt Chips', 'Snacks', 3.25, 24, 10, 'FIXED', 0.25, '2027-01-15'],
  ['Almond Croissant', 'Bakery', 4.5, 6, 8, 'PERCENT', 15, '2026-09-10'],
  ['Mango Juice 1L', 'Beverages', 5.75, 18, 6, null, 0, '2026-10-01'],
  ['Chocolate Cookies', 'Bakery', 3.75, 30, 8, 'PERCENT', 5, '2027-02-01'],
];
const customers = [['Ayesha Khan', '03001234567'], ['Ali Raza', '03011234567'], ['Sara Ahmed', '03021234567'], ['Usman Malik', '03031234567']];

async function main() {
  const unit = await prisma.unit.upsert({ where: { slug: 'piece' }, update: {}, create: { name: 'Piece', slug: 'piece' } });
  for (const [name, categoryName, price, stock, minimumStock, discountType, discountValue, expiryDate] of products) {
    const slug = categoryName.toLowerCase();
    const category = await prisma.category.upsert({ where: { slug }, update: {}, create: { name: categoryName, slug } });
    const product = await prisma.product.upsert({ where: { name }, update: { retailPrice: price, purchasePrice: price, wholesalePrice: price, minimumStock, discountType, discountValue, expiryDate: new Date(expiryDate) }, create: { name, sku: `VX-SEED-${name.replace(/[^A-Z0-9]/gi, '').slice(0, 10).toUpperCase()}`, categoryId: category.id, unitId: unit.id, purchasePrice: price, retailPrice: price, wholesalePrice: price, openingStock: stock, minimumStock, discountType, discountValue, expiryDate: new Date(expiryDate) } });
    await prisma.stock.upsert({ where: { productId: product.id }, update: {}, create: { productId: product.id, quantity: stock, previousQuantity: 0 } });
  }
  for (const [name, phone] of customers) {
    const existing = await prisma.customer.findFirst({ where: { phone } });
    if (existing) await prisma.customer.update({ where: { id: existing.id }, data: { name } });
    else await prisma.customer.create({ data: { name, phone } });
  }
  const password = await bcrypt.hash('VendoraX123', 10);
  await prisma.user.upsert({ where: { email: 'cashier@vendorax.local' }, update: {}, create: { email: 'cashier@vendorax.local', username: 'vendoraxcashier', password, firstName: 'Demo Cashier', role: 'CASHIER' } });
  console.log('VendoraX starter products, customers, and cashier are ready.');
}
main().finally(() => prisma.$disconnect());
