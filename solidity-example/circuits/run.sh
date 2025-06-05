#!/bin/bash
set -e

if [ "$1" == "cli" ]; then
  echo "[*] Running CLI approach..."

  echo "[*] Building circuits..."
  (cd circuits && nargo compile && nargo execute)

  echo "[*] Generating proof with bb CLI..."
  (cd circuits && bb prove -b ./target/noir_solidity.json -w target/noir_solidity.gz -o ./target --oracle_hash keccak)

  echo "[*] Processing proof and public inputs..."
  # Split proof and public inputs according to README instructions
  PROOF_HEX=$(cat ./circuits/target/proof | od -An -v -t x1 | tr -d $' \n' | sed 's/^.\{8\}//')

  NUM_PUBLIC_INPUTS=2
  HEX_PUBLIC_INPUTS=${PROOF_HEX:0:$((32 * $NUM_PUBLIC_INPUTS * 2))}
  SPLIT_HEX_PUBLIC_INPUTS=$(sed -e 's/.\{64\}/0x&,/g' <<<$HEX_PUBLIC_INPUTS)
  PROOF_WITHOUT_PUBLIC_INPUTS="${PROOF_HEX:$((NUM_PUBLIC_INPUTS * 32 * 2))}"

  echo $PROOF_WITHOUT_PUBLIC_INPUTS | xxd -r -p > ./circuits/target/proof
  echo "[\"$SPLIT_HEX_PUBLIC_INPUTS\"]" > ./circuits/target/public-inputs

  echo "[*] Testing in Foundry..."
  (cd contract && forge test --optimize --optimizer-runs 5000 --gas-report -vvv)

elif [ "$1" == "js" ]; then
  echo "[*] Running JS approach..."

  echo "[*] Building circuits..."
  (cd circuits && nargo compile && nargo execute)

  echo "[*] Generating proof with JS..."
  (cd js && yarn generate-proof)

  echo "[*] Testing in Foundry..."
  (cd contract && forge test --optimize --optimizer-runs 5000 --gas-report -vvv)

else
  echo "Usage: ./run.sh [js|cli]"
  echo "  js  - Use the JavaScript bb.js approach"
  echo "  cli - Use the CLI bb + nargo approach"
  exit 1
fi
