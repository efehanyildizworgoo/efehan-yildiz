#!/bin/sh
echo "Running DB seed..."
node scripts/seed.js 2>&1 || echo "Seed warning (may be OK)"
echo "Starting Next.js server..."
exec node server.js
