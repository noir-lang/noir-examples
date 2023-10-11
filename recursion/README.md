# Recursive proofs with Noir

Recursive proofs mean you prove that another proof is correct. A bit of a proofinception but bear with me:

- You prove that `x != y`
- You pick that proof and send it to another circuit (the "outer" proof)
- You generate the outer proof and verify it

Why is this useful? In this example, it doesn't do much. But you could verify two proofs within a proof, which can be incredibly useful. You could also avoid verifying stuff on-chain for turn-based games, for example.

## Getting Started

1. [Install nargo](https://noir-lang.org/getting_started/nargo_installation#option-1-noirup) version 0.11.0 with `noirup -v 0.11.0`

2. [Run nargo](https://noir-lang.org/dev/nargo/commands)
   1. `nargo compile --workspace` will compile all the circuits in a `target` folder
   2. optionally you can run `nargo prove --workspace` and `nargo verify --workspace` to see it working on the CLI

3. Install dependencies with

```bash
yarn
```

3. Run

```bash
yarn dev
```

## Testing

There is a basic [example test file](./test/index.ts) that shows the usage of Noir in a typescript `node.js` environment.
You can run the tests with:

```sh
yarn test
```
