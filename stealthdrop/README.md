# Noir Stealthdrop

A few months ago, we were challenged to copy the amazing [Stealthdrop project](https://github.com/stealthdrop/stealthdrop). We also committed to work hard on PLUME to avoid malleability of the ECDSA signature. You can read more about it on the link above.

Challenge accepted.

## What is this

TL;DR: This is a much faster version of Stealthdrop that uses PLUME nullifiers. Built with Noir.

Stealthdrop is a process to airdrop tokens to a list of eligible Ethereum addresses, allowing a [stealth address](https://vitalik.eth.limo/general/2023/01/20/stealth.html) to claim it. For example, Alice may be eligible for an airdrop but for privacy reasons may want to claim it with an address that isn't linked to her eligible account.

The way it works is a bit of ZK dark magic. First you connect your eligible address and generate a PLUME nullifier. The cool thing about PLUME is that it will generate a deterministic nullifier: **one** address can only generate **one** PLUME nullifier. This makes it perfect to be used as a "ticket": you will only get your tokens if you show your "ticket" to the contract, and you won't ever be able to generate a different one from your eligible account.

Then, with that PLUME signature, you execute a Noir program. This program proves some things:

- It proves that your PLUME signature was made with a specified public key **without revealing it**
- It then proves that this public key, when converted into an address, is indeed eligible for the airdrop. It does so by proving that you know the path in the airdrop's merkle tree from the eligible address up to the root, **without revealing the path**.
- Finally, it proves that the address that claims the address is authorized to claim the airdrop. The theory is that by providing the claimer address as a private input, the circuit will verify that it matches the claimer (which is public: `msg.sender`)

## Getting Started

1. [Install bun](https://bun.sh/). We use Bun because well, it's just unreasonably faster and just works. Feel free to try with other package managers.
2. Install dependencies with `bun i`. You may need to run `bun pm trust plume-sig` since the Noir plume-sig PR is still open and we don't feel like pushing it to `npm` right away.
3. Start a local network with `bun run node`. This will start a `hardhat` network inside the `packages/ethereum` package. Leave this new terminal running and open a new one.
4. Get hold of an "eligible" address by either:
   1. Adding your claimer's private and public key to utils/mt/eligible.json, or
   2. Just importing the private key already there
5. If you want fresh addresses, you can run `bun run gen`. This will create a fresh new merkle tree in `utils/mt/merkle.json` and should also add the eligible addresses above
6. Run `bun run dev` - This runs the deployment script that compiles the noir program, generates a contract, compiles the contract, deploys it to your local network, and then starts the frontend app.

## Things you should know

1. This is very experimental software. It is unaudited, unsafe, and its usage is discouraged.
2. One thing is to have a Noir program. That's cool. Another thing is to get PLUME nullifiers in browser wallets. You can track the ongoing work in the [plume repository](https://github.com/plume-sig/zk-nullifier-sig). In the meantime, we're just blatantly hardcoding the eligible address private key in the `eligible.json` file mentioned above.
3. Goes without saying that until the project reaches maturity, you should not use this address by any means. Please be careful, any funds there WILL be lost.

## Next steps

### secp256r1

This project was made with `secp256k1` signatures, at a time where Account Abstraction wasn't really a popular thing. These days people use `secp256r1` signatures such as FaceID, NFC cards, or even passports, as signers to an abstracted wallet.

So the next steps would involve adding support for these schemes, which should be trivial.

### Wallets

As mentioned above, getting wallets to generate PLUME nullifiers isn't easy, even with open PRs ready to review and merge. Some even prevent basic features such as private key exponentiation (looking at you, Metamask).

Increasing awareness and working closely with these projects would be a smart next step.

## Testing

There are some useful hardhat tests you can run to check if things are still smooth. Just run `bun run test`.
