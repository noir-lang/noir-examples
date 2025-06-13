set -e

cd inner
nargo compile
bb write_vk --oracle_hash keccak -b ./target/inner.json -o ./target
cd ..

cd recursive
nargo compile
bb write_vk --oracle_hash keccak -b ./target/recursive.json -o ./target
cd ..

echo "Done"
