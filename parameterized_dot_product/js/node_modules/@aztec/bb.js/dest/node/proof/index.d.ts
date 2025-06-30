/**
 * @description
 * The representation of a proof
 * */
export type ProofData = {
    /** @description Public inputs of a proof */
    publicInputs: string[];
    /** @description An byte array representing the proof */
    proof: Uint8Array;
};
/**
 * @description
 * The representation of a proof
 * */
export type ProofDataForRecursion = {
    /** @description Public inputs of a proof */
    publicInputs: string[];
    /** @description An byte array representing the proof */
    proof: string[];
};
export declare function splitHonkProof(proofWithPublicInputs: Uint8Array, numPublicInputs: number): {
    publicInputs: Uint8Array;
    proof: Uint8Array;
};
export declare function reconstructHonkProof(publicInputs: Uint8Array, proof: Uint8Array): Uint8Array;
export declare function reconstructUltraPlonkProof(proofData: ProofData): Uint8Array;
export declare function deflattenFields(flattenedFields: Uint8Array): string[];
export declare function flattenFieldsAsArray(fields: string[]): Uint8Array;
//# sourceMappingURL=index.d.ts.map