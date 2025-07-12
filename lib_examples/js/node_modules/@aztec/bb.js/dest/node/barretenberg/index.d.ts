import { BarretenbergApi, BarretenbergApiSync } from '../barretenberg_api/index.js';
export { BarretenbergVerifier } from './verifier.js';
export { UltraPlonkBackend, UltraHonkBackend, AztecClientBackend } from './backend.js';
export type BackendOptions = {
    /** @description Number of threads to run the backend worker on */
    threads?: number;
    /** @description Initial and Maximum memory to be alloted to the backend worker */
    memory?: {
        initial?: number;
        maximum?: number;
    };
    /** @description Path to download CRS files */
    crsPath?: string;
    /** @description Path to download WASM files */
    wasmPath?: string;
    /** @description Logging function */
    logger?: (msg: string) => void;
};
export type CircuitOptions = {
    /** @description Whether to produce SNARK friendly proofs */
    recursive: boolean;
};
/**
 * The main class library consumers interact with.
 * It extends the generated api, and provides a static constructor "new" to compose components.
 */
export declare class Barretenberg extends BarretenbergApi {
    private worker;
    private options;
    private constructor();
    /**
     * Constructs an instance of Barretenberg.
     * Launches it within a worker. This is necessary as it blocks waiting on child threads to complete,
     * and blocking the main thread in the browser is not allowed.
     * It threads > 1 (defaults to hardware availability), child threads will be created on their own workers.
     */
    static new(options?: BackendOptions): Promise<Barretenberg>;
    getNumThreads(): Promise<number>;
    initSRSForCircuitSize(circuitSize: number): Promise<void>;
    initSRSClientIVC(): Promise<void>;
    acirInitSRS(bytecode: Uint8Array, recursive: boolean, honkRecursion: boolean): Promise<void>;
    destroy(): Promise<void>;
}
export declare class BarretenbergSync extends BarretenbergApiSync {
    private constructor();
    private static new;
    static initSingleton(wasmPath?: string, logger?: (msg: string) => void): Promise<BarretenbergSync>;
    static getSingleton(): BarretenbergSync;
    getWasm(): import("../barretenberg_wasm/index.js").BarretenbergWasm;
}
//# sourceMappingURL=index.d.ts.map