// @ts-ignore -- no types
import { Barretenberg } from '@aztec/bb.js';
// @ts-ignore -- no types
import { Fr } from '@aztec/bb.js';

// thanks @vezenovm for this beautiful merkle tree implementation
export interface IMerkleTree {
  root: () => Fr;
  proof: (index: number) => Promise<{
    root: Fr;
    pathElements: Fr[];
    pathIndices: number[];
    leaf: Fr;
  }>;
  insert: (leaf: Fr) => void;
}

export class MerkleTree implements IMerkleTree {
  readonly zeroValue = Fr.fromString(
    '18d85f3de6dcd78b6ffbf5d8374433a5528d8e3bf2100df0b7bb43a4c59ebd63',
  );
  levels: number;
  storage: Map<string, Fr>;
  zeros: Fr[];
  totalLeaves: number;
  bb: Barretenberg = {} as Barretenberg;

  constructor(levels: number) {
    this.levels = levels;
    this.storage = new Map();
    this.zeros = [];
    this.totalLeaves = 0;
  }

  async initialize(defaultLeaves: Fr[]) {
    this.bb = await Barretenberg.new();
    // build zeros depends on tree levels
    let currentZero = this.zeroValue;
    this.zeros.push(currentZero);

    for (let i = 0; i < this.levels; i++) {
      currentZero = await this.pedersenHash(currentZero, currentZero);
      this.zeros.push(currentZero);
    }

    for await (let leaf of defaultLeaves) {
      await this.insert(leaf);
    }
  }

  async getBB() {
    return this.bb;
  }

  async pedersenHash(left: Fr, right: Fr): Promise<Fr> {
    await this.bb.pedersenInit();
    let hashRes = await this.bb.pedersenPlookupCommit([left, right]);
    return hashRes;
  }

  static indexToKey(level: number, index: number): string {
    return `${level}-${index}`;
  }

  getIndex(leaf: Fr): number {
    for (const [key, value] of this.storage) {
      if (value.toString() === leaf.toString()) {
        return Number(key.split('-')[1]);
      }
    }
    return -1;
  }

  root(): Fr {
    return this.storage.get(MerkleTree.indexToKey(this.levels, 0)) || this.zeros[this.levels];
  }

  async proof(indexOfLeaf: number) {
    let pathElements: Fr[] = [];
    let pathIndices: number[] = [];

    const leaf = this.storage.get(MerkleTree.indexToKey(0, indexOfLeaf));
    if (!leaf) throw new Error('leaf not found');

    // store sibling into pathElements and target's indices into pathIndices
    const handleIndex = async (level: number, currentIndex: number, siblingIndex: number) => {
      const siblingValue =
        this.storage.get(MerkleTree.indexToKey(level, siblingIndex)) || this.zeros[level];
      pathElements.push(siblingValue);
      pathIndices.push(currentIndex % 2);
    };

    await this.traverse(indexOfLeaf, handleIndex);

    return {
      root: this.root(),
      pathElements,
      pathIndices,
      leaf: leaf,
    };
  }

  async insert(leaf: Fr) {
    const index = this.totalLeaves;
    await this.update(index, leaf, true);
    this.totalLeaves++;
  }

  async update(index: number, newLeaf: Fr, isInsert: boolean = false) {
    if (!isInsert && index >= this.totalLeaves) {
      throw Error('Use insert method for new elements.');
    } else if (isInsert && index < this.totalLeaves) {
      throw Error('Use update method for existing elements.');
    }

    let keyValueToStore: { key: string; value: Fr }[] = [];
    let currentElement: Fr = newLeaf;

    const handleIndex = async (level: number, currentIndex: number, siblingIndex: number) => {
      const siblingElement =
        this.storage.get(MerkleTree.indexToKey(level, siblingIndex)) || this.zeros[level];

      let left: Fr;
      let right: Fr;
      if (currentIndex % 2 === 0) {
        left = currentElement;
        right = siblingElement;
      } else {
        left = siblingElement;
        right = currentElement;
      }

      keyValueToStore.push({
        key: MerkleTree.indexToKey(level, currentIndex),
        value: currentElement,
      });
      currentElement = await this.pedersenHash(left, right);
    };

    await this.traverse(index, handleIndex);

    // push root to the end
    keyValueToStore.push({
      key: MerkleTree.indexToKey(this.levels, 0),
      value: currentElement,
    });

    keyValueToStore.forEach(o => {
      this.storage.set(o.key, o.value);
    });
  }

  // traverse from leaf to root with handler for target node and sibling node
  private async traverse(
    indexOfLeaf: number,
    handler: (level: number, currentIndex: number, siblingIndex: number) => Promise<void>,
  ) {
    let currentIndex = indexOfLeaf;
    for (let i = 0; i < this.levels; i++) {
      let siblingIndex;
      if (currentIndex % 2 === 0) {
        siblingIndex = currentIndex + 1;
      } else {
        siblingIndex = currentIndex - 1;
      }

      await handler(i, currentIndex, siblingIndex);
      currentIndex = Math.floor(currentIndex / 2);
    }
  }
}
