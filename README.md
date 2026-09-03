# VendoraX — Retail POS Platform

VendoraX is a Vue 3 and NestJS point-of-sale platform for stores, cafés, boutiques, and multi-register retail teams. It brings checkout, inventory, sales, and operational dashboards into one modern retail workspace.

## Implemented

- Responsive Vue dashboard and interactive checkout workspace
- Product search/categories, low/out-of-stock states, cart quantities, discount, tax, payments, and checkout UI
- New Product dialog: API mode creates product + opening stock, product image, and optional expiry date
- Expiry status appears in catalog and live inventory, including expired and 30-day warning states
- Cart item removal and customer selection/creation directly at checkout
- Cashier login at checkout; each completed sale is assigned to the salesperson and counted in Team
- Detailed receipt with invoice reference, product line items, tax/discount, payment method, and print action
- Per-product fixed or percentage discount tags, with discounted prices applied at checkout
- Payment options: cash, Visa/Mastercard, bank account, EasyPaisa, JazzCash, and credit with payment reference
- Built-in persistent starter products, inventory, customers, and cashier account for the local SQLite database
- Prisma/SQLite schema for users, products, inventory, purchases, suppliers, sales, customers, and expenses
- Product API: list/search, create, update, deactivate
- Inventory API: stock listing, transaction-safe adjustments, stock-movement audit trail
- Sales API: transactional invoice creation, tax/discount, sale items, automatic stock deduction, and receipt payload
- Dashboard API: today’s sales/orders/expenses, low-stock count, recent sales
- CORS and `/api` global backend prefix

## Planned modules

Full authentication/RBAC enforcement, master-data CRUD, customers, suppliers, purchases, expenses, reports, sales returns, receipts, uploads, import/export, Swagger, and Odoo integration remain for the next phase.

## Requirements

- Node `24.6.0`: run `nvm use` inside `pos-system`
- No database server is needed for local development: SQLite stores persistent data in `backend/prisma/dev.db`

## Run

```bash
cd pos-system
nvm use

cd backend
cp .env.example .env
npm install
npm run db:setup
npm run db:seed
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

## Cashier accounts

Create a cashier from **Team → Add member**. At checkout they sign in with that email and password; the sale is then saved against them and their sales count updates in Team. Product images are stored locally in SQLite for the local application.

The included demo cashier is `cashier@vendorax.local` with password `VendoraX123`. The receipt's **Print / Save as PDF** action opens the browser print dialog; choose **Save as PDF** to download the bill as a PDF.

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
