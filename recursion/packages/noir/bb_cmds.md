## Notes

### main circuit
bb prove_ultra_honk -b ./target/main.json -w ./target/main.gz -o ./target/proof -h 1 --recursive
bb proof_as_fields_honk -p ./target/proof -o ./target/proof_fields -h 1 --recursive

bb write_vk_ultra_honk -h 1 -b ./target/main.json -o ./target/vk --recursive
bb vk_as_fields_ultra_honk -k ./target/vk -o ./target/vk_fields -h 1

### recursion circuit
_remove public inputs manually_
nargo execute
bb prove_ultra_keccak_honk -b ./target/recursion.json -w ./target/recursion.gz -o ./target/proof

_can see the proof with_ cat ./target/proof | od -An -v -t x1 | tr -d $' \n'
bb write_vk_ultra_keccak_honk -h 1 -b ./target/recursion.json -o ./target/vk
bb verify_ultra_keccak_honk -p ./target/proof -k ./target/vk

## contract
bb contract_ultra_honk -o ../../ethereum/contracts/contracts.sol
