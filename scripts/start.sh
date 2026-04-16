#!/bin/sh
echo "=== Debug: listing /app ==="
ls -la /app/
echo "=== Debug: checking server.js ==="
ls -la /app/server.js 2>/dev/null || echo "server.js NOT FOUND at /app/"
find /app -name "server.js" -type f 2>/dev/null | head -5
echo "=== Running DB setup & seed ==="
node scripts/seed.js 2>&1 || echo "Seed warning (may be OK)"
echo "Starting server..."
exec node server.js
