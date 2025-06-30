/**
 * Downloader for CRS from the web or local.
 */
export declare class CachedNetCrs {
    readonly numPoints: number;
    private g1Data;
    private g2Data;
    constructor(numPoints: number);
    static new(numPoints: number): Promise<CachedNetCrs>;
    /**
     * Download the data.
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
/**
 * Downloader for CRS from the web or local.
 */
export declare class CachedNetGrumpkinCrs {
    readonly numPoints: number;
    private g1Data;
    constructor(numPoints: number);
    static new(numPoints: number): Promise<CachedNetGrumpkinCrs>;
    /**
     * Download the data.
     */
    init(): Promise<void>;
    /**
     * G1 points data for prover key.
     * @returns The points data.
     */
    getG1Data(): Uint8Array;
}
//# sourceMappingURL=cached_net_crs.d.ts.map