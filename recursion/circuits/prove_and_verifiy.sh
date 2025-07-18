set -e

cd inner
rm -rf target
nargo compile
bb write_vk --oracle_hash keccak -b ./target/inner.json -o ./target
cd ..

cd recursive
rm -rf target
nargo compile
bb write_vk --oracle_hash keccak -b ./target/recursive.json -o ./target
cd ..

echo "Generating inner proof"

cd inner
nargo execute
bb write_vk -b ./target/inner.json -o ./target --output_format bytes_and_fields
bb prove -b ./target/inner.json -w ./target/inner.gz -k ./target/vk  --output_format bytes_and_fields  -o ./target
bb verify -k ./target/vk -p ./target/proof -i ./target/public_inputs
cd ..


cd recursive
# Populate recursive/Prover.toml with proof vk and public inputs
TOML_CONTENT="proof="
TOML_CONTENT+=$(cat ../inner/target/proof_fields.json)
TOML_CONTENT+="\n\npublic_inputs="
TOML_CONTENT+=$(cat ../inner/target/public_inputs_fields.json) 
TOML_CONTENT+="\n\nverification_key="
TOML_CONTENT+=$(cat ../inner/target/vk_fields.json)

rm -f Prover.toml
echo "$TOML_CONTENT" > Prover.toml


nargo execute
bb write_vk -b ./target/recursive.json -o ./target --output_format bytes_and_fields
bb prove -b ./target/recursive.json -w ./target/recursive.gz -k ./target/vk  --output_format bytes_and_fields  -o ./target
bb verify -k ./target/vk -p ./target/proof -i ./target/public_inputs
cd ..

echo "Done"
