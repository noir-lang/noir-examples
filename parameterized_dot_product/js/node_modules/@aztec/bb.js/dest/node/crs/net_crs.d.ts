/**
 * Downloader for CRS from the web or local.
 */
export declare class NetCrs {
    /**
     * The number of circuit gates.
     */
    readonly numPoints: number;
    private data;
    private g2Data;
    constructor(
    /**
     * The number of circuit gates.
     */
    numPoints: number);
    /**
     * Download the data.
     */
    init(): Promise<void>;
    /**
     * Opens up a ReadableStream to the points data
     */
    streamG1Data(): Promise<ReadableStream<Uint8Array>>;
    /**
     * Opens up a ReadableStream to the points data
     */
    streamG2Data(): Promise<ReadableStream<Uint8Array>>;
    downloadG1Data(): Promise<Uint8Array>;
    /**
     * Download the G2 points data.
     */
    downloadG2Data(): Promise<Uint8Array>;
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
    /**
     * Fetches the appropriate range of points from a remote source
     */
    private fetchG1Data;
    /**
     * Fetches the appropriate range of points from a remote source
     */
    private fetchG2Data;
}
/**
 * Downloader for CRS from the web or local.
 */
export declare class NetGrumpkinCrs {
    /**
     * The number of circuit gates.
     */
    readonly numPoints: number;
    private data;
    constructor(
    /**
     * The number of circuit gates.
     */
    numPoints: number);
    /**
     * Download the data.
     */
    init(): Promise<void>;
    downloadG1Data(): Promise<Uint8Array>;
    /**
     * Opens up a ReadableStream to the points data
     */
    streamG1Data(): Promise<ReadableStream<Uint8Array>>;
    /**
     * G1 points data for prover key.
     * @returns The points data.
     */
    getG1Data(): Uint8Array;
    /**
     * Fetches the appropriate range of points from a remote source
     */
    private fetchG1Data;
}
//# sourceMappingURL=net_crs.d.ts.map