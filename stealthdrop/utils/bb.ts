import { BarretenbergSync, Fr } from '@aztec/bb.js';

const bbSync = await BarretenbergSync.new();

const poseidon = (a: bigint, b: bigint) => {
  const hash = bbSync.poseidon2Hash([new Fr(a), new Fr(b)]);
  return BigInt(hash.toString());
};

export { bbSync, poseidon, Fr };
