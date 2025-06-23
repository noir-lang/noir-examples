### Introduction

An example repo to verify Noir circuits (with bb backend) using a Solidity verifier.

- `/circuits` - contains the Noir circuits.
- `/contract` - Foundry project with a Solidity verifier and a Test contract that reads proof from a file and verifies it.
- `/js` - JS code to generate proof and save as a file.


Tested with Noir 1.0.0-beta.3 and bb 0.82.2
## Circuit Logic

The Noir circuit checks if `x * 2 + y == expected`, where:
- `x` is a private input
- `y` and `expected` are public inputs

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
bb prove -b ./target/noir_solidity.json -w target/noir_solidity.gz -o ./target --oracle_hash keccak

# Split this proof and public inputs into two files

# Convert proof to hex, and slice first 4 bytes of metadata
PROOF_HEX=$(cat ./target/proof | od -An -v -t x1 | tr -d $' \n' | sed 's/^.\{8\}//')

NUM_PUBLIC_INPUTS=2
HEX_PUBLIC_INPUTS=${PROOF_HEX:0:$((32 * $NUM_PUBLIC_INPUTS * 2))}
SPLIT_HEX_PUBLIC_INPUTS=$(sed -e 's/.\{64\}/0x&,/g' <<<$HEX_PUBLIC_INPUTS)
PROOF_WITHOUT_PUBLIC_INPUTS="${PROOF_HEX:$((NUM_PUBLIC_INPUTS * 32 * 2))}"

# Save proof and public inputs to files
echo $PROOF_WITHOUT_PUBLIC_INPUTS | xxd -r -p > ./target/proof
echo "[\"$SPLIT_HEX_PUBLIC_INPUTS\"]" > ./target/public-inputs

# Run foundry test to read generated proof and verify
cd ..
(cd contract && forge test --optimize --optimizer-runs 5000 --gas-report -vvv)
```

### 🔁 Dual Workflow Support (CLI and JS)

The project supports two approaches for generating proofs:

- **JavaScript-based workflow** using `bb.js`
- **CLI-based workflow** using `nargo` and `bb` directly

### ▶️ Running the Circuit and Tests

Use the `run.sh` script with an argument to select the approach:

```bash
# JavaScript workflow using bb.js
./circuits/run.sh js

# CLI workflow using nargo + bb
./circuits/run.sh cli
```
This script will:
1. Build the circuit
2. Generate a proof
3. Run Solidity tests using Foundry
### 🛠 Building the Solidity Verifier
Use the `build.sh` script to compile the circuit and generate the Solidity verifier:
```bash
./build.sh
```
This will:
- Compile the Noir circuit
- Generate the verification key (`vk`)
- Export the Solidity verifier to `contract/Verifier.sol`
### Deployment

Deploying to base Sepolia:

```
forge script script/Deploy.s.sol:DeployScript --rpc-url https://mainnet.base.org --broadcast --legacy
```
Deployment output:
```
Verifier deployed at: 0x519845DF3Ead9be1B1217d422f5b40a4d43e737D
Starter deployed at: 0xaf78eFEf8B958eBa80D64e78fdBE655DC58e133b
Total Paid: 0.00000522658568628 ETH (5224287 gas * avg 0.00100044 gwei)
```


### Verifying Proof onchain

Verify proof on base Sepolia:

```
forge script script/VerifyProof.s.sol:VerifyProofScript --rpc-url https://mainnet.base.org --broadcast --legacy
```
Here is a [sample tx](https://sepolia.basescan.org/tx/0xeac8eacbc777bbf55fb15f502c94d9cc7f164aa46e1ea356bbfc98fb32e3b6ff) - Transaction Fee:
`0.000011818559069182 ETH ($0.02)`

Get [number of verified proofs](./contract/Starter.sol#L14) on-chain
```
forge script script/VerifyProof.s.sol:GetVerifiedCount --rpc-url https://mainnet.base.org --broadcast --legacy
```


#### Cost on Base Mainnet

Verifier deployed at: 0x519845DF3Ead9be1B1217d422f5b40a4d43e737D
Starter deployed at: 0xaf78eFEf8B958eBa80D64e78fdBE655DC58e133b

Deployment cost of verifier contract: 0.000028411358047473 ETH ($0.11  when ETH = ~3800 USD) - [Sample TX](https://basescan.org/tx/0x68059d485544a909366d672174eb788678806acfd501be220d162c0ca0c13730)

Proof verification cost : 0.000009590438665493 ETH ($0.04  when ETH = ~3800 USD) - [Sample Tx](https://basescan.org/tx/0x8a8324e64c8a5534b318acfd3e7514c8c35fdba46f0b6a74f8ab3e46c4877114)
