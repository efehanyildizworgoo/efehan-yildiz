#!/bin/sh
echo "Running DB setup & seed..."
node scripts/seed.js 2>&1 || echo "Seed warning (may be OK)"
echo "Starting server..."
exec node server.js
