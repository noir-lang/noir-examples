import { Barretenberg } from './index.js';
import { RawBuffer } from '../types/raw_buffer.js';
import { flattenFieldsAsArray, reconstructHonkProof, reconstructUltraPlonkProof } from '../proof/index.js';
// TODO: once UP is removed we can just roll this into the bas `Barretenberg` class.
export class BarretenbergVerifier {
    constructor(options = { threads: 1 }) {
        this.options = options;
    }
    /** @ignore */
    async instantiate() {
        if (!this.api) {
            const api = await Barretenberg.new(this.options);
            await api.initSRSForCircuitSize(0);
            this.acirComposer = await api.acirNewAcirComposer(0);
            this.api = api;
        }
    }
    /** @description Verifies a proof */
    async verifyUltraPlonkProof(proofData, verificationKey) {
        await this.instantiate();
        // The verifier can be used for a variety of ACIR programs so we should not assume that it
        // is preloaded with the correct verification key.
        await this.api.acirLoadVerificationKey(this.acirComposer, new RawBuffer(verificationKey));
        const proof = reconstructUltraPlonkProof(proofData);
        return await this.api.acirVerifyProof(this.acirComposer, proof);
    }
    /** @description Verifies a proof */
    async verifyUltraHonkProof(proofData, verificationKey) {
        await this.instantiate();
        const proof = reconstructHonkProof(flattenFieldsAsArray(proofData.publicInputs), proofData.proof);
        return await this.api.acirVerifyUltraHonk(proof, new RawBuffer(verificationKey));
    }
    async destroy() {
        if (!this.api) {
            return;
        }
        await this.api.destroy();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZpZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnL3ZlcmlmaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBa0IsWUFBWSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsb0JBQW9CLEVBQWEsb0JBQW9CLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUV0SCxvRkFBb0Y7QUFFcEYsTUFBTSxPQUFPLG9CQUFvQjtJQVUvQixZQUFvQixVQUEwQixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7UUFBeEMsWUFBTyxHQUFQLE9BQU8sQ0FBaUM7SUFBRyxDQUFDO0lBRWhFLGNBQWM7SUFDZCxLQUFLLENBQUMsV0FBVztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDZCxNQUFNLEdBQUcsR0FBRyxNQUFNLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pELE1BQU0sR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRW5DLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDakIsQ0FBQztJQUNILENBQUM7SUFFRCxvQ0FBb0M7SUFDcEMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLFNBQW9CLEVBQUUsZUFBMkI7UUFDM0UsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDekIsMEZBQTBGO1FBQzFGLGtEQUFrRDtRQUNsRCxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBRTFGLE1BQU0sS0FBSyxHQUFHLDBCQUEwQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BELE9BQU8sTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxvQ0FBb0M7SUFDcEMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLFNBQW9CLEVBQUUsZUFBMkI7UUFDMUUsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFekIsTUFBTSxLQUFLLEdBQUcsb0JBQW9CLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRyxPQUFPLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU87UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2QsT0FBTztRQUNULENBQUM7UUFDRCxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDM0IsQ0FBQztDQUNGIn0=