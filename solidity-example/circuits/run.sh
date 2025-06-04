#!/bin/bash
set -e

echo "[*] Building circuits..."
(cd circuits && nargo compile && nargo execute)

echo "[*] Generating proof..."
(cd js && yarn generate-proof)

echo "[*] Testing in Foundry..."
(cd contract && forge test --optimize --optimizer-runs 5000 --gas-report -vvv)