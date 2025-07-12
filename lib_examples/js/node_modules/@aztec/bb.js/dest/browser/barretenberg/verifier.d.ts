import { BackendOptions } from './index.js';
import { ProofData } from '../proof/index.js';
export declare class BarretenbergVerifier {
    private options;
    private api;
    private acirComposer;
    constructor(options?: BackendOptions);
    /** @ignore */
    instantiate(): Promise<void>;
    /** @description Verifies a proof */
    verifyUltraPlonkProof(proofData: ProofData, verificationKey: Uint8Array): Promise<boolean>;
    /** @description Verifies a proof */
    verifyUltraHonkProof(proofData: ProofData, verificationKey: Uint8Array): Promise<boolean>;
    destroy(): Promise<void>;
}
//# sourceMappingURL=verifier.d.ts.map