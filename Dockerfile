FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./standalone-tmp
RUN SERVER_DIR=$(find /app/standalone-tmp -name "server.js" -type f | head -1 | xargs dirname) \
    && echo "Found server.js in: $SERVER_DIR" \
    && cp -r "$SERVER_DIR"/* /app/ \
    && cp -r "$SERVER_DIR"/.next /app/.next 2>/dev/null || true \
    && rm -rf /app/standalone-tmp \
    && ls -la /app/server.js
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/scripts ./scripts
RUN chmod +x ./scripts/start.sh
RUN npm install --no-save pg bcryptjs nodemailer

RUN mkdir -p /app/public/uploads
VOLUME /app/public/uploads

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["sh", "./scripts/start.sh"]
