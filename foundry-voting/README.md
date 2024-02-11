# zk Voting with Foundry

[![Run Tests on PR](https://github.com/noir-lang/noir-starter/actions/workflows/foundry-voting.yml/badge.svg)](https://github.com/noir-lang/noir-starter/actions/workflows/foundry-voting.yml)

This example project shows how to create a simple zk voting circuit in Noir with a corresponding Solidity contract to track eligible voters, proposals and votes.

This example was last tested with Noir version 0.22.0. You can install it with [noirup](https://noir-lang.org/docs/getting_started/installation/#installing-noirup) using

```bash
noirup -v 0.22.0
```

## Overview

This is the model used for creating the [circuit](circuits/src/main.nr) and the [zkVote contract](src/zkVote.sol) to manage private voting.

1. Create a set of voters. A merkle root is stored in the zkVote Solidity contract that voters will use to verify membership against. In this example, there are 4 accounts in the set of voters. The private keys are 0, 1, 2, 3 and the secret value to create the commitment is 9.

| Secret | Commitment = pedersen(secret)                                      |
| ------ | ------------------------------------------------------------------ |
| 1      | 0x09489945604c9686e698cb69d7bd6fc0cdb02e9faae3e1a433f1c342c1a5ecc4 |
| 2      | 0x2d961d9814298c04a4639a56c5c95030d704340ab6d13c135a326da5e515559d |
| 3      | 0x0a1d1f62bdd17dbdd447feccd23471821e7e43f1ce9165f636513b83a9933474 |
| 4      | 0x273e0772e851cd0d83d77f05f334d156bc53194e42e8680c6d9469b3aa887eb1 |

This gives intermediate hashes of `0x083ed6aeca136c6159a761749f6db0c192bacf04294e22ed968ae1a845f97285` (`pedersen(commitment0, commitment1)`) and `0x1501e80783ee5c988327f46f5fcdce388cb97aa7e959ad345c1e2cbaa0b42b83` (`pedersen(commitment2, commitment3)`) and a root hash of `0x29fd5ee89e33f559a7b32ac39f57400aa5a6c77492e28c088f9eb511b0c73e78`.

2. Users will input their information into the circuit and generate a proof (see example inputs in [Prover.toml](./circuits/Prover.toml) and run `nargo prove` to generate the proof.)
   1. Public inputs and outputs are printed in [Verifier.toml](./circuits/Verifier.toml).
   2. The proof is saved to `./proofs/foundry_voting.proof`.
3. The generated proof + the contents of Verifier.toml are sent in a transaction to the `castVote` function in the [zkVote](./src/zkVote.sol) contract. The function verifies that the sender is authorized to vote on the proposal, that they haven't already voted and tallies their vote.

## Testing

You can run the Noir tests (also defined in main.nr) with `nargo test`. To print test output, use `nargo test --show-output`.

See the test file [here](./test/zkVote.t.sol). Run tests with `forge test`.

1. Run `nargo compile` to compile the circuit.
2. Run `nargo prove` to generate the proof (with the inputs in Prover.toml).
3. Run `yarn test` to run the Foundry test the Solidity verifier contract at `./test/zkVote.t.sol`.
4. Run `yarn integration-test` to run Javascript tests (at `./test/integration.test.ts`) using [bb.js](https://www.npmjs.com/package/@aztec/bb.js).

## Development

If you change the circuit at `./circuits/src/main.nr` you will need to recompile (`nargo compile`) the circuit and regenerate the Solidity verifier (saved to `./circuits/contract/plonk_vk.sol`).

The merkle tree will need to be recalculated whenever there are users added to the set or if there are any changes to the voters secrets (secrets are the input to the merkle membership commitment, so changing a key changes the corresponding leaf in the merkle tree, which changes the root). See `test_valid_build_merkle_tree` for an example calculation.

Run `nargo test --show-output` in `./circuits` to print the example merkle tree.

## Contributions

Thanks to the folks at zkCamp modifying the original example and adding tests. You can see their repo [here](https://github.com/ZKCamp/noir-voting/tree/6-security).
