#!/bin/bash

set -e

AGE=${1:-35}

echo "🚧 Starting full build pipeline..."

# 1. Generate proof
echo "🔨 Step 1: Proving for age=$AGE"
./scripts/prove.sh $AGE

# 2. Generate VK if missing
echo "🧠 Step 2: Generating verification key (if missing)"
if [ ! -f ./target/vk ]; then
  ./scripts/keygen.sh
else
  echo "✅ VK already exists, skipping keygen"
fi

# 3. Verify the proof
echo "🔍 Step 3: Verifying proof"
./scripts/verify.sh

# 4. Export Solidity verifier
echo "📝 Step 4: Exporting Solidity verifier"
./scripts/export_solidity_verifier.sh

echo "🎉 Build pipeline completed successfully"
echo "📦 Copying verifier to ./onchain/Verifier.sol..."
cp ./target/Verifier.sol ./onchain/Verifier.sol
echo "✅ Verifier copied to ./onchain/Verifier.sol"