#!/bin/sh
set -e

echo "[1/2] Running Prisma migrations (PostgreSQL)..."
npx prisma migrate deploy --config=prisma.config.ts
echo "  PostgreSQL migrations applied."

echo "[2/2] Starting auth-service..."
exec node dist/main.js
