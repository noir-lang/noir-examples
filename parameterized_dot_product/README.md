# Parameterized Dot Product – Noir Circuit with Solidity Integration

This project implements a zero-knowledge proof circuit in [Noir](https://noir-lang.org/) to prove knowledge of two secret vectors whose dot product equals a public value, **without revealing the vectors themselves**.

## Circuit Overview

- **Inputs:**
  - `x`: `[Field; 4]` — Private input vector
  - `y`: `[Field; 4]` — Private input vector
  - `expect`: `pub Field` — Public expected result (the dot product)

- **Statement Proven:**  
  You know vectors `x` and `y` such that  
  `dot(x, y) == expect`  
  without revealing `x` or `y`.

## Usage

### 1. Prerequisites

- [Noir language toolchain](https://noir-lang.org/docs/getting_started/installation/)
- (Optional) [Nargo](https://noir-lang.org/docs/tools/nargo/) for running and debugging locally
- (If using Solidity verifier) [Foundry](https://getfoundry.sh/), [Yarn](https://yarnpkg.com/)
An example repo to verify Noir circuits (with bb backend) using a Solidity verifier.
### Project Structure

- `/circuits` — contains the Noir circuits.
- `/contract` — Foundry project with a Solidity verifier and a Test contract that reads proof from a file and verifies it.
- `/js` — JS code to generate proof and save as a file.

Tested with Noir 1.0.0-beta.6 and bb 0.84.0

### Installation / Setup
```ssh
# Foundry
git submodule update

# Build circuits, generate verifier contract
(cd circuits && ./build.sh)

# Install JS dependencies
(cd js && yarn)

```

### Proof generation in JS


```ssh
# Use bb.js to generate proof and save to a file
(cd js && yarn generate-proof)

# Run foundry test to read generated proof and verify
(cd contract && forge test --optimize --optimizer-runs 5000 --gas-report -vvv)

```

### Proof generation with bb cli

```ssh
cd circuits

# Generate witness
nargo execute

# Generate proof
bb prove -b ./target/parameterized_dot_product.json -w target/parameterized_dot_product.gz -o ./target --oracle_hash keccak

# Run foundry test to read generated proof and verify
cd ..
(cd contract && forge test --optimize --optimizer-runs 5000 --gas-report -vvv)
```

