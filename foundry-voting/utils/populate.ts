import { NoirNode } from "./NoirNode";
import { convertToHex, writeToToml } from "./common";
import config from "../data/config.json" assert { type: "json" };
import circuit from '../circuits/target/circuits.json' assert { type: "json" };
import { fileURLToPath } from 'url';
import { resolve, dirname } from "path";

async function getMerkleTree(noir: NoirNode) {

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

async function main() {
    const noir = new NoirNode();
    await noir.init(circuit);

    let merkleData = await getMerkleTree(noir);

    let data = {
        hash_path: merkleData.hashPath,
        index: config.index,
        proposalId: config.proposalId,
        root: merkleData.root,
        secret: config.secret
    }

    const dir = dirname(fileURLToPath(import.meta.url));
    let path = resolve(dir + "/../circuits/Prover.toml");

    writeToToml(data, path);
}

main();