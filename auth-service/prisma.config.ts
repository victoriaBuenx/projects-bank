import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: {
    path: './prisma/migrations',
  },
  datasource: {
    url: 'postgresql://postgres:postgres@postgres-auth:5432/auth_db',
  }
})