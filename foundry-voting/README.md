# Foundry Voting Example

This example project shows how to create a simple zk voting circuit in Noir with a corresponding Solidity contract to track eligible voters, proposals and votes.

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

1. Users will input their information into the circuit and generate a proof (see example inputs in `circuits/Prover.toml` and run `bun run circuits:ultraplonk:generate-proof` to generate the proof.)
2. The generated proof is sent in a transaction to the `castVote` function in the [zkVote](./contracts/zkVote.sol) contract. The function verifies that the sender is authorized to vote on the proposal, that they haven't already voted and tallies their vote.

## Prerequisites
This code has been tested with:

Nargo version: 1.0.0-beta.1
BB (barretenberg-cli) version: 0.66.0

you can install these following [quick start](https://noir-lang.org/docs/getting_started/quick_start) guide.

Project uses **bun** as package manager which you can install using ```curl -fsSL https://bun.sh/install | bash```

Make sure you have compatible versions installed before proceeding.

## Quick Start


Install dependencies:
```bash
bun install
```

## Development Guide

### Interactive Build Process

Run all steps interactively with status updates:
```bash
bun run build:ultraplonk
```

This will guide you through all the steps with prompts and status updates.

### Manual Steps

#### 1. Circuit Testing

Run the test suite:
```bash
bun run circuits:test
```

#### 2. Circuit Execution Flow

Execute the circuit (generates witness and circuit JSON file):
```bash
bun run circuits:execute
```

#### 3. Proof Generation

Generate UltraPlonk proof:
```bash
bun run circuits:ultraplonk:generate-proof
```

Generate verification key:
```bash
bun run circuits:ultraplonk:generate-vk
```

#### 4. Contract Generation

Generate the Solidity verifier contract:
```bash
bun run circuits:contract
```

#### 5. Proof Processing

Clean and format the proof for contract verification:
```bash
bun run ultraplonk:clean-proof
```

#### 6. Contract Testing

Run Forge tests:
```bash
forge test
```

### Advanced Usage

#### Manual Circuit Commands

If you need to run circuit commands directly:

1. Navigate to circuits directory:
```bash
cd circuits
```

2. Run Noir tests with output:
```bash
nargo test --show-output
```

3. Generate Prover.toml file:
```bash
nargo check
```

4. Execute circuit (after updating Prover.toml with inputs):
```bash
nargo execute
```
This generates:
- Circuit JSON in `target/circuits.json`
- Witness file in `target/circuits.gz`

#### Manual Proof Generation

Generate proof using UltraPlonk:
```bash
bb prove -b ./target/circuits.json -w ./target/circuits.gz -o ./target/proof
```

Generate proof string manually:
**Number of character to tail is counted with formula, 32 * NUMBER_OF_PUBLIC_INPUTS + 1**
**Number of public inputs also includes return values, that's why we have 4 public input for our circuit.**
```bash
tail -c +129 ./target/proof | od -An -v -t x1 | tr -d $' \n'
```
