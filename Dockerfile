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

RUN echo "=== Listing standalone ===" 
COPY --from=builder /app/.next/standalone ./standalone-tmp
RUN ls -la /app/standalone-tmp/ && ls -la /app/standalone-tmp/app/ 2>/dev/null || echo "no /app dir" && ls -la /app/standalone-tmp/*.js 2>/dev/null || echo "no root js"
RUN if [ -f /app/standalone-tmp/server.js ]; then cp -r /app/standalone-tmp/* /app/ ; elif [ -f /app/standalone-tmp/app/server.js ]; then cp -r /app/standalone-tmp/app/* /app/ ; else find /app/standalone-tmp -name server.js -exec dirname {} \; | head -1 | xargs -I{} sh -c 'cp -r {}/* /app/' ; fi
RUN rm -rf /app/standalone-tmp
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
