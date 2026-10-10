FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build && npm prune --omit=dev --ignore-scripts
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0 UPLOAD_DIR=/app/data/uploads
ARG REVISION
LABEL org.opencontainers.image.revision=$REVISION
RUN addgroup -g 1001 -S nextjs && adduser -S nextjs -u 1001 -G nextjs
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nextjs /app/public ./public
COPY --from=builder --chown=nextjs:nextjs /app/scripts/start.sh /app/scripts/runtime-check.cjs ./scripts/
RUN mkdir -p /app/data/uploads && chown -R nextjs:nextjs /app/data && chmod +x ./scripts/start.sh
USER nextjs
EXPOSE 3000
CMD ["sh","./scripts/start.sh"]
