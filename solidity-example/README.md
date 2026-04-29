### Introduction

An example repo to verify Noir circuits (with bb backend) using a Solidity verifier.

- `/circuits` - contains the Noir circuits.
- `/contract` - Foundry project with a Solidity verifier and a Test contract that reads proof from a file and verifies it.
- `/js` - JS code to generate proof and save as a file.

Tested with Noir 1.0.0-beta.18 and bb 3.0.0-nightly.20260102

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
bb prove -b ./target/noir_solidity.json -w target/noir_solidity.gz -o ./target --verifier_target evm

# Run foundry test to read generated proof and verify
cd ..
(cd contract && forge test --optimize --optimizer-runs 5000 --gas-report -vvv)
```

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

#### Mainnet gas costs

##### Base

Verifier deployed at: 0x519845DF3Ead9be1B1217d422f5b40a4d43e737D
Starter deployed at: 0xaf78eFEf8B958eBa80D64e78fdBE655DC58e133b

Deployment cost of verifier contract: 0.000028411358047473 ETH ($0.11 when ETH = ~3800 USD) - [Sample TX](https://basescan.org/tx/0x68059d485544a909366d672174eb788678806acfd501be220d162c0ca0c13730)

Proof verification cost : 0.000009590438665493 ETH ($0.04 when ETH = ~3800 USD) - [Sample Tx](https://basescan.org/tx/0x8a8324e64c8a5534b318acfd3e7514c8c35fdba46f0b6a74f8ab3e46c4877114)

##### Tempo

**Environment**

- Noir 1.0.0-beta.20
- bb 5.0.0-nightly.20260324
- bb.js 5.0.0-nightly.20260324
- forge parameter `--optimizer-runs 1`

**Deployment costs**

| Contract | Gas used | Cost | Transaction |
| --- | ---: | ---: | ---: |
| ZKTranscriptLib deployment | 6,981,166 | 0.167548 USDC.e | [Sample](https://explore.tempo.xyz/tx/0x8e4e2a8f91ffb742ab35481abf50eea84815b13ebab803d657ff44d796501249) |
| Verifier deployment | 25,156,680 | 0.603761 USDC.e | [Sample](https://explore.tempo.xyz/tx/0x10964f7a67ebd41ea9c14add95b40a5435fe96f292211fd835029d9e51c4ba75) |
| Starter deployment | 1,621,325 | 0.038912 USDC.e | [Sample](https://explore.tempo.xyz/tx/0x2a36785468d9e45b5ed26b3467dd9cd197f2513994da33228c74f5f31a6c1a12) |
| Total deployment | 33,759,171 | 0.810221 USDC.e | [Sample](https://explore.tempo.xyz/tx/0x3a3cd1aa96abc267ba34b6ccea1d7bc2a509215a8fc3e22f0bad1f3aa413ddc1) |

USDC.e gas costs were based on conditions as of 2026-04-29.

**Proof verification costs**

Proof verification cost 3,092,616 (0.068038 USDC.e as of 2026-04-29). [Sample transaction](https://explore.tempo.xyz/tx/0x3a3cd1aa96abc267ba34b6ccea1d7bc2a509215a8fc3e22f0bad1f3aa413ddc1).

##### Upcoming optimizations

Once the improvements in https://github.com/AztecProtocol/aztec-packages/pull/20495 are released, Barretenberg's proof verification gas costs will be brought down from ~3,000,000 gas to ~700,000 gas.