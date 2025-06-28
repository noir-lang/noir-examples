# 🧮 prove weighted threshold compliance

This Noir project implements a zero-knowledge circuit to prove that a private value, when linearly transformed by a public weight and modifier, meets a publicly required score. The secret is never revealed — only compliance is proven.

## 🔍 Circuit Logic

```rust
fn main(secret_weight: Field, public_modifier: pub Field, required_score: pub Field) {
    let recovery_score = secret_weight * 2 + public_modifier;
    assert(recovery_score == required_score);
}
```

- `secret_weight`: private input (e.g., user’s confidential contribution)
- `public_modifier`: public offset (e.g., environmental or fixed input)
- `required_score`: public target score for compliance


## 🧠 Use Case

This circuit is ideal for:

 - 🛡️ Access Control – Proving someone meets a threshold without revealing how.
 - 🔑 Social Recovery – Ensuring secret shares reconstruct to a public score.
 - 🎓 Eligibility Proofs – Anonymous compliance with a public policy or threshold.
 -🔍 Auditable Logic – Anyone can verify the score match without knowing private details.

## Project Structure

An example repo to verify Noir circuits (with bb backend) using a Solidity verifier.

- `/circuits` - contains the Noir circuits.
- `/contract` - Foundry project with a Solidity verifier and a Test contract that reads proof from a file and verifies it.
- `/js` - JS code to generate proof and save as a file.

## Installation / Setup
```ssh
# Foundry
git submodule update

# Build circuits, generate verifier contract
(cd circuits && ./build.sh)

# Install JS dependencies
(cd js && yarn)

```  

## zk Proof generation in JS


```ssh
# Use bb.js to generate proof and save to a file
(cd js && yarn generate-proof)

# Run foundry test to read generated proof and verify
(cd contract && forge test --optimize --optimizer-runs 5000 --gas-report -vvv)

```

## zkProof generation with bb cli

```ssh
cd circuits

# Generate witness
nargo execute

# Generate proof
bb prove -b ./target/prove_weighted_threshold_compliance.json -w target/prove_weighted_threshold_compliance.gz -o ./target --oracle_hash keccak

# Run foundry test to read generated proof and verify
cd ..
(cd contract && forge test --optimize --optimizer-runs 5000 --gas-report -vvv)
```

### 🔁 Dual Workflow Support (CLI and JS)

The project supports two approaches for generating proofs:

- **JavaScript-based workflow** using `bb.js`
- **CLI-based workflow** using `nargo` and `bb` directly

### 🛠 Building the Solidity Verifier
Use the `build.sh` script to compile the circuit and generate the Solidity verifier:
```bash
./build.sh
```
This will:
- Compile the Noir circuit
- Generate the verification key (`vk`)
- Export the Solidity verifier to `contract/Verifier.sol`

