#!/bin/sh
echo "=== START ==="
echo "Node version:" && node --version
echo "Files:" && ls /app/server.js /app/.next/server 2>&1
echo "Running seed..."
node scripts/seed.js 2>&1 || echo "Seed warning"
echo "Starting server on port $PORT..."
node server.js 2>&1 &
SERVER_PID=$!
sleep 5
if kill -0 $SERVER_PID 2>/dev/null; then
  echo "Server is running (PID $SERVER_PID)"
  wait $SERVER_PID
else
  echo "Server CRASHED! Keeping container alive for debugging..."
  sleep 3600
fi
