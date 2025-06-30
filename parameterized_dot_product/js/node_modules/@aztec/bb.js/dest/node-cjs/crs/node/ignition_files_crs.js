"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IgnitionFilesCrs = exports.GRUMPKIN_SRS_DEV_PATH = exports.SRS_DEV_PATH = void 0;
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const url_1 = require("url");
function getCurrentDir() {
    if (typeof __dirname !== 'undefined') {
        return __dirname;
    }
    else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return (0, path_1.dirname)((0, url_1.fileURLToPath)(""));
    }
}
/**
 * The path to our SRS object, assuming that we are in e.g. barretenberg/ts/dest/node/crs/node folder.
 */
exports.SRS_DEV_PATH = getCurrentDir() + '/../../../../../cpp/srs_db/ignition/monomial';
exports.GRUMPKIN_SRS_DEV_PATH = getCurrentDir() + '/../../../../../cpp/srs_db/grumpkin/monomial';
/**
 * Downloader for CRS from a local file (for Node).
 */
class IgnitionFilesCrs {
    constructor(
    /**
     * The number of circuit gates.
     */
    numPoints, path = exports.SRS_DEV_PATH) {
        this.numPoints = numPoints;
        this.path = path;
    }
    pathExists() {
        return (0, fs_1.existsSync)(this.path);
    }
    /**
     * Read the data file.
     */
    async init() {
        // We need this.numPoints number of g1 points.
        // numPoints should be circuitSize + 1.
        const g1Start = 28;
        const g1End = g1Start + this.numPoints * 64;
        const data = await (0, promises_1.readFile)(this.path + '/transcript00.dat');
        this.data = data.subarray(g1Start, g1End);
        // TODO(https://github.com/AztecProtocol/barretenberg/issues/811): proper abstraction from Grumpkin which does not have g2
        if ((0, fs_1.existsSync)(this.path + '/g2.dat')) {
            this.g2Data = await (0, promises_1.readFile)(this.path + '/g2.dat');
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
exports.IgnitionFilesCrs = IgnitionFilesCrs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWduaXRpb25fZmlsZXNfY3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Nycy9ub2RlL2lnbml0aW9uX2ZpbGVzX2Nycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQkFBZ0M7QUFDaEMsMENBQXVDO0FBQ3ZDLCtCQUErQjtBQUMvQiw2QkFBb0M7QUFFcEMsU0FBUyxhQUFhO0lBQ3BCLElBQUksT0FBTyxTQUFTLEtBQUssV0FBVyxFQUFFLENBQUM7UUFDckMsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztTQUFNLENBQUM7UUFDTiw2REFBNkQ7UUFDN0QsYUFBYTtRQUNiLE9BQU8sSUFBQSxjQUFPLEVBQUMsSUFBQSxtQkFBYSxFQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0FBQ0gsQ0FBQztBQUVEOztHQUVHO0FBQ1UsUUFBQSxZQUFZLEdBQUcsYUFBYSxFQUFFLEdBQUcsOENBQThDLENBQUM7QUFDaEYsUUFBQSxxQkFBcUIsR0FBRyxhQUFhLEVBQUUsR0FBRyw4Q0FBOEMsQ0FBQztBQUV0Rzs7R0FFRztBQUNILE1BQWEsZ0JBQWdCO0lBSTNCO0lBQ0U7O09BRUc7SUFDYSxTQUFpQixFQUN6QixPQUFPLG9CQUFZO1FBRFgsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUN6QixTQUFJLEdBQUosSUFBSSxDQUFlO0lBQzFCLENBQUM7SUFFSixVQUFVO1FBQ1IsT0FBTyxJQUFBLGVBQVUsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLElBQUk7UUFDUiw4Q0FBOEM7UUFDOUMsdUNBQXVDO1FBQ3ZDLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNuQixNQUFNLEtBQUssR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFFNUMsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFBLG1CQUFRLEVBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFMUMsMEhBQTBIO1FBQzFILElBQUksSUFBQSxlQUFVLEVBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFBLG1CQUFRLEVBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsQ0FBQztRQUN0RCxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7T0FHRztJQUNILFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztDQUNGO0FBakRELDRDQWlEQyJ9