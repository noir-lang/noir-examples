/**
 * The path to our SRS object, assuming that we are in e.g. barretenberg/ts/dest/node/crs/node folder.
 */
export declare const SRS_DEV_PATH: string;
export declare const GRUMPKIN_SRS_DEV_PATH: string;
/**
 * Downloader for CRS from a local file (for Node).
 */
export declare class IgnitionFilesCrs {
    /**
     * The number of circuit gates.
     */
    readonly numPoints: number;
    private path;
    private data;
    private g2Data;
    constructor(
    /**
     * The number of circuit gates.
     */
    numPoints: number, path?: string);
    pathExists(): boolean;
    /**
     * Read the data file.
     */
    init(): Promise<void>;
    /**
     * G1 points data for prover key.
     * @returns The points data.
     */
    getG1Data(): Uint8Array;
    /**
     * G2 points data for verification key.
     * @returns The points data.
     */
    getG2Data(): Uint8Array;
}
//# sourceMappingURL=ignition_files_crs.d.ts.map