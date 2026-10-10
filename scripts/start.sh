#!/bin/sh
set -eu
node scripts/runtime-check.cjs
exec node server.js
