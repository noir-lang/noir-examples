# Noir String Search Example

## Introduction

This repository demonstrates how to integrate a Noir circuit (using the `bb` backend) with a Solidity verifier contract, and automate proof generation and verification using JavaScript and Foundry. It provides a full example of zero-knowledge substring search, from circuit building to on-chain verification.

**Directory Structure:**

- `/circuits` &mdash; Contains the Noir circuits and build scripts.
- `/contract` &mdash; Foundry project with a Solidity verifier and test contract. The test reads a proof file and verifies it.
- `/js` &mdash; JavaScript code for generating a proof and saving it to a file using bb.js.

**Tested with:**

- Noir: `1.0.0-beta.6`
- bb: `0.84.0`

---

### Build Circuits and Generate Solidity Verifier

```sh
# Build circuits and generate the Solidity verifier contract
(cd circuits && ./build.sh)
```

### Install JavaScript Dependencies

```sh
(cd js && yarn)
```

---

## Generating and Verifying Proofs

### 1. Proof Generation in JavaScript

Generate a proof using bb.js and save it to a file:

```sh
(cd js && yarn generate-proof)
```

Verify the generated proof with the Solidity verifier (using Foundry):

```sh
(cd contract && forge test --optimize --optimizer-runs 5000 --gas-report -vvv)
```

---

### 2. Proof Generation with bb CLI

You can also generate a proof using the bb CLI:

```sh
cd circuits

# Generate the witness
nargo execute

# Generate the proof
bb prove -b ./target/string_search_example.json \
         -w target/string_search_example.gz \
         -o ./target \
         --oracle_hash keccak

# Go back and verify the proof using Foundry tests
cd ..
(cd contract && forge test --optimize --optimizer-runs 5000 --gas-report -vvv)
```

---

## 📚 Third-Party Library

This project includes the [`noir_string_search`](https://github.com/noir-lang/noir_string_search) library, which is redistributed here under the terms of the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

The original copyright belongs to the Noir language authors.

We have included the source code in this repository under `circuits/noir_string_search/`.  
If any modifications are made, they are clearly marked in the relevant files.


