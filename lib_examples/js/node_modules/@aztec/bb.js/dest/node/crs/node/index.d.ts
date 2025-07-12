/**
 * Generic CRS finder utility class.
 */
export declare class Crs {
    readonly numPoints: number;
    readonly path: string;
    private readonly logger;
    constructor(numPoints: number, path: string, logger?: (msg: string) => void);
    static new(numPoints: number, crsPath?: string, logger?: (msg: string) => void): Promise<Crs>;
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
 * Generic Grumpkin CRS finder utility class.
 */
export declare class GrumpkinCrs {
    readonly numPoints: number;
    readonly path: string;
    private readonly logger;
    constructor(numPoints: number, path: string, logger?: (msg: string) => void);
    static new(numPoints: number, crsPath?: string, logger?: (msg: string) => void): Promise<GrumpkinCrs>;
    init(): Promise<void>;
    /**
     * G1 points data for prover key.
     * @returns The points data.
     */
    getG1Data(): Uint8Array;
}
//# sourceMappingURL=index.d.ts.map