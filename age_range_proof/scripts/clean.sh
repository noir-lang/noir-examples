#!/bin/bash
set -e

echo "🧹 Cleaning target directory..."
rm -rf ./target
echo "✅ Cleaned."

# Optional: clean onchain copy too
# echo "🧹 Removing onchain Verifier.sol..."
# rm -f ./onchain/Verifier.sol
# echo "✅ onchain verifier removed."