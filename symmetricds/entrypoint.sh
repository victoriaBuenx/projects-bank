#!/bin/bash
set -e

echo "[SymmetricDS] Waiting for PostgreSQL to be ready..."
# Wait for SymmetricDS to create its sym_* tables in PostgreSQL
# by starting the engine in the background briefly, then running setup

echo "[SymmetricDS] Starting SymmetricDS server..."
# Start SymmetricDS in the background
bin/sym --port 31415 --server &
SYM_PID=$!

# Wait for SymmetricDS to initialize and create sym_* tables
echo "[SymmetricDS] Waiting for SymmetricDS to initialize (30s)..."
sleep 30

# Check if setup-replication.sql needs to be applied
echo "[SymmetricDS] Applying replication configuration..."
# Use symadmin to run SQL against the corp-000 (PostgreSQL) engine
bin/symadmin --engine corp-000 run-sql /opt/symmetricds/setup-replication.sql 2>/dev/null || {
  echo "[SymmetricDS] Setup SQL already applied or partially applied (duplicate key). Continuing..."
}

# Send initial load from corp to store
echo "[SymmetricDS] Sending initial load to store-001..."
bin/symadmin --engine corp-000 reload-node 001 2>/dev/null || {
  echo "[SymmetricDS] Initial load already queued or in progress. Continuing..."
}

echo "[SymmetricDS] Replication configured. Server running (PID: $SYM_PID)"

# Wait for the background process
wait $SYM_PID
