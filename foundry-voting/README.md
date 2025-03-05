# zk Voting with Foundry

[![Run Tests on PR](https://github.com/noir-lang/noir-starter/actions/workflows/foundry-voting.yml/badge.svg)](https://github.com/noir-lang/noir-starter/actions/workflows/foundry-voting.yml)

This example project shows how to create a simple zk voting circuit in Noir with a corresponding Solidity contract to track eligible voters, proposals and votes.

This example was last tested with Noir version 0.28.0. You can install it with [noirup](https://noir-lang.org/docs/getting_started/installation/#installing-noirup) using

```bash
noirup -v 0.28.0
```

## Overview

This is the model used for creating the [circuit](circuits/src/main.nr) and the [zkVote contract](contracts/zkVote.sol) to manage private voting.

1. Create a set of voters. A merkle root is stored in the zkVote Solidity contract that voters will use to verify membership against. In this example, there are 4 accounts in the set of voters. The private keys are 0, 1, 2, 3 and the secret value to create the commitment is 9.

| Private Key | Commitment = pedersen(private key, secret)                         |
| ----------- | ------------------------------------------------------------------ |
| 1           | 0x03542cb720369f19a74fd05b4edfbedb27a78514ad3283f1b3270a1656cced8e |
| 2           | 0x1efa9d6bb4dfdf86063cc77efdec90eb9262079230f1898049efad264835b6c8 |
| 3           | 0x24013340c052ebf847e0d7081f84e6a8e92f54e2e1726a1e559ac46a8f242007 |
| 4           | 0x04fd3da9756f25c72ca8990437b7f7b58e7ca48bfc21e65e7978320db8b1e5c5 |

This gives intermediate hashes of `0x046394ae1ebbf494f2cd2c2d37171099510d099489c9accef59f90512d5f0477` (`pedersen(commitment0, commitment1)`) and `0x2a653551d87767c545a2a11b29f0581a392b4e177a87c8e3eb425c51a26a8c77` (`pedersen(commitment2, commitment3)`) and a root hash of `0x215597bacd9c7e977dfc170f320074155de974be494579d2586e5b268fa3b629`.

2. Users will input their information into the circuit and generate a proof (see example inputs in [Prover.toml](./circuits/Prover.toml) and run `nargo prove` to generate the proof.)
   1. Public inputs and outputs are printed in [Verifier.toml](./circuits/Verifier.toml).
   2. The proof is saved to `./proofs/foundry_voting.proof`.
3. The generated proof + the contents of Verifier.toml are sent in a transaction to the `castVote` function in the [zkVote](./src/zkVote.sol) contract. The function verifies that the sender is authorized to vote on the proposal, that they haven't already voted and tallies their vote.

## Testing

You can run the Noir tests (also defined in main.nr) with `nargo test`. To print test output, use `nargo test --show-output`.

See the test file [here](./test/zkVote.t.sol). Run tests with `forge test`.

1. Run `nargo compile` to compile the circuit.
2. Run `nargo prove` to generate the proof (with the inputs in Prover.toml).
3. Run `nargo codegen-verifier` to generate the solidity verifier contract.
4. Run `yarn test` to run the Foundry test the Solidity verifier contract at `./test/zkVote.t.sol`.

## Development

If you change the circuit at `./circuits/src/main.nr` you will need to recompile (`nargo compile`) the circuit and regenerate the Solidity verifier (saved to `./circuits/contract/plonk_vk.sol`).

The merkle tree will need to be recalculated whenever there are users added to the set or if there are any changes to the voters secrets (secrets are the input to the merkle membership commitment, so changing a key changes the corresponding leaf in the merkle tree, which changes the root). See `test_valid_build_merkle_tree` for an example calculation.

Run `nargo test --show-output` in `./circuits` to print the example merkle tree.

## Contributions

Thanks to the folks at zkCamp modifying the original example and adding tests. You can see their repo [here](https://github.com/ZKCamp/noir-voting/tree/6-security).
