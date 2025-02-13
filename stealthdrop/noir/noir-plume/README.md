# PLUME in Noir

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Noir CI 🌌](https://github.com/distributed-lab/noir-plume/actions/workflows/noir.yml/badge.svg)](https://github.com/distributed-lab/noir-plume/actions/workflows/noir.yml)

> Signature nullification cryptography.

Read about PLUME [here](https://blog.aayushg.com/nullifier/).

## How to use?

### Add dependency to your project's `Nargo.toml`

```toml
[dependencies]
plume = { git = "https://github.com/distributed-lab/noir-plume", tag = "v2.0.0", directory = "crates/plume"}
```

### Employ in your `Noir` code as following

```rust
use plume::plume_v1;

...

plume_v1(msg, c, s, pk, nullifier);
```

Or in case you prefer [second version](https://www.notion.so/mantanetwork/PLUME-Discussion-6f4b7e7cf63e4e33976f6e697bf349ff):

```rust
use plume::plume_v2;

...

plume_v2(msg, c, s, pk, nullifier);
```

### Examples

Check out how to generate proofs with PLUME in either `crates/use_v1` or `crates/use_v2`.
Sample data generation in our `SageMath` [implementation](./etc).

## Benchmarks

We have provided information regarding different computational statistics such as constraints amount and time for various activities, see [Benchmark.md](./BENCHMARK.md)

## Need something else?

In order to bring `PLUME` to `Noir`, we needed to implement
[secp256k1_XMD:SHA-256_SSWU_RO_](https://datatracker.ietf.org/doc/id/draft-irtf-cfrg-hash-to-curve-06.html) hash-to-curve algorithm, thus now it is available in `Noir` ecosystem!

Tested using [this data](https://www.ietf.org/archive/id/draft-irtf-cfrg-hash-to-curve-13.html#appendix-J.8.1).
