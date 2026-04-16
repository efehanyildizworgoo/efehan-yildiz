FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build \
    && echo "=== STANDALONE DIR ===" \
    && ls -la /app/.next/standalone/ \
    && echo "=== FIND SERVER.JS ===" \
    && find /app/.next/standalone -name "server.js" -type f \
    && echo "=== END ==="

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/scripts ./scripts
RUN chmod +x ./scripts/start.sh
RUN npm install --no-save pg bcryptjs nodemailer
RUN mkdir -p /app/public/uploads
# Debug: verify server.js location after copy
RUN echo "=== RUNNER DIR ===" && ls -la /app/ && ls -la /app/server.js 2>/dev/null || echo "NO server.js at /app/" && find /app -name "server.js" -maxdepth 3 -type f

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["sh", "-c", "echo 'Starting Next.js...' && node server.js 2>&1 || (echo 'server.js CRASHED with exit code:' $? && sleep 3600)"]
