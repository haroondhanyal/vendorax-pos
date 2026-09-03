# VendoraX — Retail POS Platform

VendoraX is a Vue 3 and NestJS point-of-sale platform for stores, cafés, boutiques, and multi-register retail teams. It brings checkout, inventory, sales, and operational dashboards into one modern retail workspace.

## Implemented

- Responsive Vue dashboard and interactive checkout workspace
- Product search/categories, low/out-of-stock states, cart quantities, discount, tax, payments, and checkout UI
- New Product dialog: API mode creates product + opening stock; offline demo mode keeps a local catalog entry
- Receipt dialog with invoice reference, paid amount, payment method, and print action
- Prisma/PostgreSQL schema for users, products, inventory, purchases, suppliers, sales, customers, and expenses
- Product API: list/search, create, update, deactivate
- Inventory API: stock listing, transaction-safe adjustments, stock-movement audit trail
- Sales API: transactional invoice creation, tax/discount, sale items, automatic stock deduction, and receipt payload
- Dashboard API: today’s sales/orders/expenses, low-stock count, recent sales
- CORS and `/api` global backend prefix

## Planned modules

Full authentication/RBAC enforcement, master-data CRUD, customers, suppliers, purchases, expenses, reports, sales returns, receipts, uploads, import/export, Swagger, and Odoo integration remain for the next phase.

## Requirements

- Node `24.6.0`: run `nvm use` inside `pos-system`
- PostgreSQL 12+ with a `pos_system` database

## Run

```bash
cd pos-system
nvm use

cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma db push
npm run start:dev
```

In another terminal:

```bash
cd pos-system/frontend
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:3000/api`

## Core API

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/products?q=coffee` | List/search products |
| POST | `/api/products` | Create product and stock record |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Deactivate product |
| GET | `/api/inventory/stock` | List stock |
| POST | `/api/inventory/adjust` | Adjust stock and audit it |
| GET / POST | `/api/sales` | List/create sales |
| GET | `/api/dashboard` | Live operational metrics |

## Build

```bash
cd frontend && npm run build
cd ../backend && npm run build
```
