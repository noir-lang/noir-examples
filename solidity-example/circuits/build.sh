set -e

echo "Compiling circuit..."
if ! nargo compile; then
    echo "Compilation failed. Exiting..."
    exit 1
fi

echo "Generating vkey..."
bb write_vk --verifier_target evm -b ./target/noir_solidity.json -o ./target

echo "Generating solidity verifier..."
bb write_solidity_verifier --verifier_target evm -k ./target/vk -o ../contract/Verifier.sol

echo "Done"
