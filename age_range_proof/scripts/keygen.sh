#!/bin/bash
set -e
cd "$(dirname "$0")/.."

echo "🔑 Generating verification key..."
bb write_vk \
  -b ./target/age_range_proof.json \
  -o ./target \
  --oracle_hash keccak

  