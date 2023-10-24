# Noir Stealthdrop

A few months ago, we were challenged to copy the amazing [Stealthdrop project](https://github.com/stealthdrop/stealthdrop). Challenge accepted.

This is a much faster version of Stealthdrop, built with Noir.

## Getting Started

1. [Install nargo](https://noir-lang.org/getting_started/nargo_installation#option-1-noirup) version 0.17.0 with `noirup -v 0.17.0`
2. Rename `env.examples` to `.env`, you can set up a number of things there but it contains sensible defaults
3. Install dependencies by running `yarn`
4. Compile the project with `yarn compile`
5. Optionally run `yarn gen` if you want fresh addresses, or if you changed the `.env` file
6. Run `NETWORK=localhost yarn dev`

There's a config to deploy on the Mumbai testnet as well. Just fill the details on the `.env` file and add `NETWORK=mumbai` on your commands.

## Testing

To run the [test file](./test/index.ts), try `yarn test`
