import { BackendOptions, Barretenberg, CircuitOptions } from './index.js';
import { ProofData, ProofDataForRecursion } from '../proof/index.js';
export declare class AztecClientBackendError extends Error {
    constructor(message: string);
}
export declare class UltraPlonkBackend {
    protected backendOptions: BackendOptions;
    protected circuitOptions: CircuitOptions;
    protected api: Barretenberg;
    protected acirComposer: any;
    protected acirUncompressedBytecode: Uint8Array;
    constructor(acirBytecode: string, backendOptions?: BackendOptions, circuitOptions?: CircuitOptions);
    /** @ignore */
    instantiate(): Promise<void>;
    /** @description Generates a proof */
    generateProof(compressedWitness: Uint8Array): Promise<ProofData>;
    /**
     * Generates artifacts that will be passed to a circuit that will verify this proof.
     *
     * Instead of passing the proof and verification key as a byte array, we pass them
     * as fields which makes it cheaper to verify in a circuit.
     *
     * The proof that is passed here will have been created by passing the `recursive`
     * parameter to a backend.
     *
     * The number of public inputs denotes how many public inputs are in the inner proof.
     *
     * @example
     * ```typescript
     * const artifacts = await backend.generateRecursiveProofArtifacts(proof, numOfPublicInputs);
     * ```
     */
    generateRecursiveProofArtifacts(proofData: ProofData, numOfPublicInputs?: number): Promise<{
        proofAsFields: string[];
        vkAsFields: string[];
        vkHash: string;
    }>;
    /** @description Verifies a proof */
    verifyProof(proofData: ProofData): Promise<boolean>;
    /** @description Returns the verification key */
    getVerificationKey(): Promise<Uint8Array>;
    /** @description Returns a solidity verifier */
    getSolidityVerifier(): Promise<string>;
    destroy(): Promise<void>;
}
/**
 * Options for the UltraHonkBackend.
 */
export type UltraHonkBackendOptions = {
    /**Selecting this option will use the keccak hash function instead of poseidon
     * when generating challenges in the proof.
     * Use this when you want to verify the created proof on an EVM chain.
     */
    keccak: boolean;
};
export declare class UltraHonkBackend {
    protected backendOptions: BackendOptions;
    protected circuitOptions: CircuitOptions;
    protected api: Barretenberg;
    protected acirUncompressedBytecode: Uint8Array;
    constructor(acirBytecode: string, backendOptions?: BackendOptions, circuitOptions?: CircuitOptions);
    /** @ignore */
    instantiate(): Promise<void>;
    generateProof(compressedWitness: Uint8Array, options?: UltraHonkBackendOptions): Promise<ProofData>;
    generateProofForRecursiveAggregation(compressedWitness: Uint8Array, options?: UltraHonkBackendOptions): Promise<ProofDataForRecursion>;
    verifyProof(proofData: ProofData, options?: UltraHonkBackendOptions): Promise<boolean>;
    getVerificationKey(options?: UltraHonkBackendOptions): Promise<Uint8Array>;
    /** @description Returns a solidity verifier */
    getSolidityVerifier(vk?: Uint8Array): Promise<string>;
    generateRecursiveProofArtifacts(_proof: Uint8Array, _numOfPublicInputs: number): Promise<{
        proofAsFields: string[];
        vkAsFields: string[];
        vkHash: string;
    }>;
    destroy(): Promise<void>;
}
export declare class AztecClientBackend {
    protected acirMsgpack: Uint8Array[];
    protected options: BackendOptions;
    protected api: Barretenberg;
    constructor(acirMsgpack: Uint8Array[], options?: BackendOptions);
    /** @ignore */
    instantiate(): Promise<void>;
    prove(witnessMsgpack: Uint8Array[]): Promise<[Uint8Array, Uint8Array]>;
    verify(proof: Uint8Array, vk: Uint8Array): Promise<boolean>;
    proveAndVerify(witnessMsgpack: Uint8Array[]): Promise<boolean>;
    gates(): Promise<number[]>;
    destroy(): Promise<void>;
}
//# sourceMappingURL=backend.d.ts.map