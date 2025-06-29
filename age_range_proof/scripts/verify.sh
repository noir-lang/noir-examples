#!/bin/bash

echo "🔍 Verifying proof..."

if [ ! -f ./target/vk ]; then
  echo "⚠️  VK not found, generating..."
  ./scripts/keygen.sh
fi

bb verify \
  --oracle_hash keccak \
  -k ./target/vk \
  -p ./target/proof_dir/proof
