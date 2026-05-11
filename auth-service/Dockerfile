FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY prisma.config.ts prisma.mysql.config.ts ./

RUN npm ci
RUN npx prisma generate --config=prisma.config.ts
RUN npx prisma generate --config=prisma.mysql.config.ts

COPY . .
RUN npm run build
RUN ls -la /app/dist/ || echo "dist VACIO"

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./
COPY --from=builder /app/prisma.mysql.config.ts ./

RUN mkdir -p /app/event-store

EXPOSE 3000

CMD ["node", "dist/main.js"]