#!/bin/bash

echo "[SymmetricDS] Starting SymmetricDS server..."
bin/sym --port 31415 --server &
SYM_PID=$!

# Wait for SymmetricDS to fully initialize and create sym_* tables in both DBs
echo "[SymmetricDS] Waiting for engines to initialize (45s)..."
sleep 45

# Apply replication configuration using dbsql (runs SQL against corp-000 = PostgreSQL)
echo "[SymmetricDS] Applying replication configuration..."
if bin/dbsql --engine corp-000 < /opt/symmetricds/setup-replication.sql 2>&1; then
  echo "[SymmetricDS] Replication configuration applied."
else
  echo "[SymmetricDS] Config may already exist (duplicate key is OK). Continuing..."
fi

# Sync triggers so SymmetricDS creates DB triggers on the app tables
echo "[SymmetricDS] Syncing triggers..."
bin/symadmin --engine corp-000 sync-triggers 2>&1 || true

# Send initial load from PostgreSQL (corp) to MySQL (store)
echo "[SymmetricDS] Sending initial load to store-001..."
bin/symadmin --engine corp-000 reload-node 001 2>&1 || {
  echo "[SymmetricDS] Initial load already queued or in progress."
}

echo "[SymmetricDS] Replication configured. Server running (PID: $SYM_PID)"
wait $SYM_PID
