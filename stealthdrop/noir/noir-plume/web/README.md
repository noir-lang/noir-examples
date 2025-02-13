# PLUME in Browser

This directory demonstrates how PLUME performs in browser environment.

It uses reuses artifacts compiled with `nargo compile` and does following:

1. Execute
2. Prove
3. Verify

For each `v1` and `v2` with corresponding trivial time measurements.

Currently supported proving backend is `UltraHonk`, while `UltraPlonk` fails.

## Launch

Install needed npm modules, if you haven't already:

```bash
npm i
```

After that, type:

```bash
npm run bench
```

Open displayed server (i.e <http://localhost:5173>) link to initiate script and observe browser console for information.

## Results

_Browser_: Firefox

_Machine_: MacBook Pro M2 Max 32 GB RAM 1 TB Storage

If you have no desire to replicate this yourself, check out results we obtained:

### V1

- Execution: 29 seconds
- Proving: 56 seconds
- Verifying: 20 seconds

### V2

- Execution: 29 seconds
- Proving: 59 seconds
- Verifying: 20 seconds
