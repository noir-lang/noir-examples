import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
function getCurrentDir() {
    if (typeof __dirname !== 'undefined') {
        return __dirname;
    }
    else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return dirname(fileURLToPath(import.meta.url));
    }
}
/**
 * The path to our SRS object, assuming that we are in e.g. barretenberg/ts/dest/node/crs/node folder.
 */
export const SRS_DEV_PATH = getCurrentDir() + '/../../../../../cpp/srs_db/ignition/monomial';
export const GRUMPKIN_SRS_DEV_PATH = getCurrentDir() + '/../../../../../cpp/srs_db/grumpkin/monomial';
/**
 * Downloader for CRS from a local file (for Node).
 */
export class IgnitionFilesCrs {
    constructor(
    /**
     * The number of circuit gates.
     */
    numPoints, path = SRS_DEV_PATH) {
        this.numPoints = numPoints;
        this.path = path;
    }
    pathExists() {
        return existsSync(this.path);
    }
    /**
     * Read the data file.
     */
    async init() {
        // We need this.numPoints number of g1 points.
        // numPoints should be circuitSize + 1.
        const g1Start = 28;
        const g1End = g1Start + this.numPoints * 64;
        const data = await readFile(this.path + '/transcript00.dat');
        this.data = data.subarray(g1Start, g1End);
        // TODO(https://github.com/AztecProtocol/barretenberg/issues/811): proper abstraction from Grumpkin which does not have g2
        if (existsSync(this.path + '/g2.dat')) {
            this.g2Data = await readFile(this.path + '/g2.dat');
        }
    }
    /**
     * G1 points data for prover key.
     * @returns The points data.
     */
    getG1Data() {
        return this.data;
    }
    /**
     * G2 points data for verification key.
     * @returns The points data.
     */
    getG2Data() {
        return this.g2Data;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWduaXRpb25fZmlsZXNfY3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Nycy9ub2RlL2lnbml0aW9uX2ZpbGVzX2Nycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRXBDLFNBQVMsYUFBYTtJQUNwQixJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7U0FBTSxDQUFDO1FBQ04sNkRBQTZEO1FBQzdELGFBQWE7UUFDYixPQUFPLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7QUFDSCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsYUFBYSxFQUFFLEdBQUcsOENBQThDLENBQUM7QUFDN0YsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsYUFBYSxFQUFFLEdBQUcsOENBQThDLENBQUM7QUFFdEc7O0dBRUc7QUFDSCxNQUFNLE9BQU8sZ0JBQWdCO0lBSTNCO0lBQ0U7O09BRUc7SUFDYSxTQUFpQixFQUN6QixPQUFPLFlBQVk7UUFEWCxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ3pCLFNBQUksR0FBSixJQUFJLENBQWU7SUFDMUIsQ0FBQztJQUVKLFVBQVU7UUFDUixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLElBQUk7UUFDUiw4Q0FBOEM7UUFDOUMsdUNBQXVDO1FBQ3ZDLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNuQixNQUFNLEtBQUssR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFFNUMsTUFBTSxJQUFJLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFMUMsMEhBQTBIO1FBQzFILElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLENBQUM7UUFDdEQsQ0FBQztJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFFRDs7O09BR0c7SUFDSCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Q0FDRiJ9