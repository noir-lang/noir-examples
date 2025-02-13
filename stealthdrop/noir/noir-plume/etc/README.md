# PLUME in Sage

This directory contains [sage](https://www.sagemath.org/) implementation of PLUME.

## Scripts

To streamline demonstration of `PLUME` usage in `Noir`, we attach the below scripts.

### Generation of the `Prover.toml` data

Generates random 32-byte values of `r` and `sk`, random message-length dependent `msg` and computes other necessary information for ZKP issuing.

### Managing message length

Changes `MSG_LEN` constant in either `crates/use_v1/src/main.nr` or `crates/use_v2/src/main.nr`.

## How to use?

### Prerequisites

Install SageMath by following [these instructions](https://doc.sagemath.org/html/en/installation/index.html).

### Launch Sage

Select the desired version of plume: either "v1" or "v2", then the number of bytes for msg (non-negative number) and run `main.sage` supplying these as CLI arguments, for example:

```bash
sage main.sage v2 32
```
