FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build && echo "CACHE_BUST_20260416_v2"

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./standalone-tmp
RUN echo "=== standalone contents ===" \
    && find /app/standalone-tmp -maxdepth 3 -type f -name "*.js" \
    && echo "=== end ===" \
    && if [ -f /app/standalone-tmp/server.js ]; then \
         echo "server.js at root"; \
         cp -r /app/standalone-tmp/. /app/; \
       else \
         SERVER_JS=$(find /app/standalone-tmp -name "server.js" -type f | head -1); \
         if [ -n "$SERVER_JS" ]; then \
           SERVER_DIR=$(dirname "$SERVER_JS"); \
           echo "server.js found at: $SERVER_JS"; \
           cp -r "$SERVER_DIR"/. /app/; \
         else \
           echo "WARNING: server.js not found, copying everything"; \
           cp -r /app/standalone-tmp/. /app/; \
         fi; \
       fi \
    && rm -rf /app/standalone-tmp
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
