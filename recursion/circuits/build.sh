set -e

cd inner
nargo compile
bb write_vk --verifier_target noir-recursive-no-zk -b ./target/inner.json -o ./target
cd ..

cd recursive
nargo compile
bb write_vk --verifier_target evm -b ./target/recursive.json -o ./target
cd ..

echo "Done"
