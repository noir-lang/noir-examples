#!/bin/bash
set -e

cd "$(dirname "$0")/.."

AGE=${1:-42}

echo "age = $AGE" > Prover.toml

echo "🔧 Compiling circuit..."
nargo compile

echo "🧠 Executing circuit to generate witness..."
nargo execute

echo "📁 Creating proof directory..."
mkdir -p ./target/proof_dir

echo "🔐 Creating proof with bb..."
bb prove \
		--scheme ultra_honk \
		--oracle_hash keccak \
		-b ./target/age_range_proof.json \
		-w ./target/age_range_proof.gz \
		-o ./target/proof_dir
echo "✅ Proof created in ./target/proof_dir"
