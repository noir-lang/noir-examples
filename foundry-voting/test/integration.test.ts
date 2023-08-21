import { expect } from 'chai';
// import { describe, it } from 'mocha';
import { NoirNode } from "../utils/noirNode";
import { convertToHex } from "../utils/common";

import { beforeAll, afterAll, describe } from 'vitest';
import circuit from '../circuits/target/foundry_voting.json' assert { type: "json" };

const noir = new NoirNode();

describe('Integration tests', function () {
    let merkleData: any;

    beforeAll(async () => {
        await noir.init(circuit);
        merkleData = await getMerkleTree();
    });

    afterAll(async () => {
        await noir.destroy();
    });

    function generateInitialWitness(input: any) {
        const initialWitness = new Map<number, string>();

        initialWitness.set(1, input.root);
        initialWitness.set(2, convertToHex(input.index));
        initialWitness.set(3, input.hash_path[0]);
        initialWitness.set(4, input.hash_path[1]);
        initialWitness.set(5, convertToHex(input.secret));
        initialWitness.set(6, convertToHex(input.proposalId));
        initialWitness.set(7, convertToHex(input.vote));

        return initialWitness;
    }

    async function getMerkleTree() {
        let commitment1 = await noir.pedersenHash([BigInt(1)]);
        let commitment2 = await noir.pedersenHash([BigInt(2)]);
        let commitment3 = await noir.pedersenHash([BigInt(3)]);
        let commitment4 = await noir.pedersenHash([BigInt(4)]);

        let leftSubtree = await noir.pedersenHash([commitment1, commitment2]);
        let rightSubtree = await noir.pedersenHash([commitment3, commitment4]);

        let root = await noir.pedersenHash([leftSubtree, rightSubtree]);

        return {
            root: convertToHex(root),
            hashPath: [convertToHex(commitment2), convertToHex(rightSubtree)]
        }
    }

    it("Should be able to generate proof and verify it for valid inputs", async () => {

        let inputs = {
            root: merkleData.root,
            index: 0,
            hash_path: merkleData.hashPath,
            secret: 1,
            proposalId: 0,
            vote: 1
        }

        const initialWitness = generateInitialWitness(inputs)

        const witness = await noir.generateWitness(initialWitness);
        const proof = await noir.generateProof(witness);

        expect(proof instanceof Uint8Array).to.be.true;

        const verified = await noir.verifyProof(proof);

        expect(verified).to.be.true;
    });

    it("Should fail to execute for failing contraints", async () => {
        let inputs = {
            root: "0x29fd5ee89e33f559a7b32ac39f57400aa5a6c77492e28c088f9eb511b0c73e70",
            index: 0,
            hash_path: merkleData.hashPath,
            secret: 1,
            proposalId: 0,
            vote: 1
        }
        try {
            const initialWitness = generateInitialWitness(inputs)
            await noir.generateWitness(initialWitness);
        }
        catch (err: any) {
            expect(err).to.equal("could not satisfy all constraints");
        }
    });

});
