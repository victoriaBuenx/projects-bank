#!/bin/sh
set -e

echo "[1/3] Running Prisma migrations (PostgreSQL)..."
npx prisma migrate deploy --config=prisma.config.ts
echo "  PostgreSQL migrations applied."

echo "[2/3] Creating tables in MySQL replica..."
npx prisma db push --config=prisma.mysql.config.ts --accept-data-loss
echo "  MySQL tables created."

echo "[3/3] Starting auth-service..."
exec node dist/main.js
