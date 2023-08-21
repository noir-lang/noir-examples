import { ethers } from 'ethers';
import * as toml from '@iarna/toml';
import * as fs from 'fs';

export function convertToHex(num: BigInt | number) {
    return ethers.utils.hexZeroPad(`0x${num.toString(16)}`, 32);
}

export function writeToToml(content: toml.JsonMap, filePath: string) {
    const tomlString = toml.stringify(content);
    fs.writeFileSync(filePath, tomlString);
}