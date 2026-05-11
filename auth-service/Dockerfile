FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

COPY . .

RUN npm ci
RUN npx prisma generate --config=prisma.config.ts
RUN npx prisma generate --config=prisma.mysql.config.ts

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./
COPY --from=builder /app/prisma.mysql.config.ts ./
COPY --from=builder /app/src/generated ./src/generated

RUN mkdir -p /app/event-store

EXPOSE 3000

CMD ["node", "dist/main.js"]