import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "./prisma/mysql/schema.mysql.prisma",
  datasource: {
    url: "mysql://root:root@localhost:3306/auth_db"
  }
})
