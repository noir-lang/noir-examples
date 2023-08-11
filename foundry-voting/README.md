# zk Voting with Foundry

[![Run Tests on PR](https://github.com/noir-lang/noir-starter/actions/workflows/foundry-voting.yml/badge.svg)](https://github.com/noir-lang/noir-starter/actions/workflows/foundry-voting.yml)

This example project shows how to create a simple zk voting circuit in Noir with a corresponding Solidity contract to track eligible voters, proposals and votes.

## Overview

This is the model used for creating the [circuit](circuits/src/main.nr) and the [zkVote contract](src/zkVote.sol) to manage private voting.

1. Create a set of voters. A merkle root is stored in the zkVote Solidity contract that voters will use to verify membership against. In this example, there are 4 accounts in the set of voters. The private keys are 0, 1, 2, 3 and the secret value to create the commitment is 9.

| Private Key | Commitment = pedersen(private key, secret)                         |
| ----------- | ------------------------------------------------------------------ |
| 0           | 0x0693591673540bc503c2fa5b68bdab8063375683b2752b183c3cf0e04ca42f78 |
| 1           | 0x1af5235d0f22035d0f266865faa1884e036235131e0068f82ab824d3ec833226 |
| 2           | 0x230b5a55179da08c06dfe23fcd5e18c5a3364dc8c43f8d86db32404481a85723 |
| 3           | 0x0ae54d4588816ca99bc592ff436e844287a605a2f7268d6816e3f1bf5c2fc5cf |

This gives intermediate hashes of `0x0a93e3f9a5af4abe169499e3ecb3e0025014467d673983c959a359a1ae5f25b7` (`pedersen(commitment0, commitment1)`) and `0x189f8f83d5a665aa299216fb5562f7064885af3e879ac53aeba450d73ca425b3` (`pedersen(commitment2, commitment3)`) and a root hash of `0x19ac85420cee4b5231c575ed4ab7a4bdade6c4de28ca651a406a02307f3e6ca1`.

2. Users will input their information into the circuit and generate a proof (see example inputs in [Prover.toml](./circuits/Prover.toml) and run `nargo prove` to generate the proof.)
   1. Public inputs and outputs are printed in [Verifier.toml](./circuits/Verifier.toml).
3. The generated proof + the contents of Verifier.toml are sent in a transaction to the `castVote` function in the [zkVote](./src/zkVote.sol) contract. The function verifies that the sender is authorized to vote on the proposal, that they haven't already voted and tallies their vote.

## Testing

You can run the Noir tests (also defined in main.nr) with `nargo test`. To print test output, use `nargo test --show-output`.

See the test file [here](./test/zkVote.t.sol). Run tests with `forge test`.

## Development

If you change the circuit at `./circuits/src/main.nr` you will need to recompile (`nargo compile`) the circuit and regenerate the Solidity verifier (saved to `./circuits/contract/plonk_vk.sol`).

The merkle tree will need to be recalculated whenever there are users added to the set or if there are any changes to the voters private keys (private keys are an input to the merkle membership commitment, so changing a key changes the corresponding leaf in the merkle tree, which changes the root). See `test_build_merkle_tree` for an example calculation.

Run `nargo test --show-output` in `./circuits` to print the example merkle tree.
