#!/bin/sh
set -e

echo "Running Prisma migrations (PostgreSQL)..."
npx prisma migrate deploy --config=prisma.config.ts

echo "Migrations completed. Starting auth-service..."
node dist/main.js
