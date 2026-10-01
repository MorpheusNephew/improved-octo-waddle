#!/usr/bin/env bash

# Start only PostgreSQL and wait until it accepts connections. This is useful
# for validating a clean database setup separately from the API and ETL builds.
set -euo pipefail

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is required but was not found in PATH." >&2
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "Docker Compose v2 is required (run: docker compose ...)." >&2
  exit 1
fi

mkdir -p data/pg_data/db

docker compose up --pull missing -d db

printf 'Waiting for PostgreSQL to accept connections'
for _ in $(seq 1 30); do
  if docker compose exec -T db pg_isready --username=postgres --dbname=sports >/dev/null 2>&1; then
    printf '\nPostgreSQL is ready at localhost:5432.\n'
    exit 0
  fi
  printf '.'
  sleep 1
done

printf '\nPostgreSQL did not become ready within 30 seconds.\n' >&2
docker compose logs db >&2
exit 1
