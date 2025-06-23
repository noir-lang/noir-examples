set -e

echo "Compiling circuit..."
if ! nargo compile; then
    echo "Compilation failed. Exiting..."
    exit 1
fi

echo "Generating vkey..."
bb write_vk -b ./target/noir_uh_starter.json -o ./target

echo "Done"
