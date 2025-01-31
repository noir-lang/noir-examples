# Foundry Voting Example

This project demonstrates a voting system implementation using Noir circuits and Foundry.

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
