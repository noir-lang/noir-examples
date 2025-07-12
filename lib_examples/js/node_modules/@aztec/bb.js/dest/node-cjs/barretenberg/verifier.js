"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarretenbergVerifier = void 0;
const index_js_1 = require("./index.js");
const raw_buffer_js_1 = require("../types/raw_buffer.js");
const index_js_2 = require("../proof/index.js");
// TODO: once UP is removed we can just roll this into the bas `Barretenberg` class.
class BarretenbergVerifier {
    constructor(options = { threads: 1 }) {
        this.options = options;
    }
    /** @ignore */
    async instantiate() {
        if (!this.api) {
            const api = await index_js_1.Barretenberg.new(this.options);
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
        await this.api.acirLoadVerificationKey(this.acirComposer, new raw_buffer_js_1.RawBuffer(verificationKey));
        const proof = (0, index_js_2.reconstructUltraPlonkProof)(proofData);
        return await this.api.acirVerifyProof(this.acirComposer, proof);
    }
    /** @description Verifies a proof */
    async verifyUltraHonkProof(proofData, verificationKey) {
        await this.instantiate();
        const proof = (0, index_js_2.reconstructHonkProof)((0, index_js_2.flattenFieldsAsArray)(proofData.publicInputs), proofData.proof);
        return await this.api.acirVerifyUltraHonk(proof, new raw_buffer_js_1.RawBuffer(verificationKey));
    }
    async destroy() {
        if (!this.api) {
            return;
        }
        await this.api.destroy();
    }
}
exports.BarretenbergVerifier = BarretenbergVerifier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZpZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnL3ZlcmlmaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlDQUEwRDtBQUMxRCwwREFBbUQ7QUFDbkQsZ0RBQXNIO0FBRXRILG9GQUFvRjtBQUVwRixNQUFhLG9CQUFvQjtJQVUvQixZQUFvQixVQUEwQixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7UUFBeEMsWUFBTyxHQUFQLE9BQU8sQ0FBaUM7SUFBRyxDQUFDO0lBRWhFLGNBQWM7SUFDZCxLQUFLLENBQUMsV0FBVztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDZCxNQUFNLEdBQUcsR0FBRyxNQUFNLHVCQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRCxNQUFNLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVuQyxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLENBQUM7SUFDSCxDQUFDO0lBRUQsb0NBQW9DO0lBQ3BDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxTQUFvQixFQUFFLGVBQTJCO1FBQzNFLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pCLDBGQUEwRjtRQUMxRixrREFBa0Q7UUFDbEQsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSx5QkFBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFFMUYsTUFBTSxLQUFLLEdBQUcsSUFBQSxxQ0FBMEIsRUFBQyxTQUFTLENBQUMsQ0FBQztRQUNwRCxPQUFPLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsb0NBQW9DO0lBQ3BDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxTQUFvQixFQUFFLGVBQTJCO1FBQzFFLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXpCLE1BQU0sS0FBSyxHQUFHLElBQUEsK0JBQW9CLEVBQUMsSUFBQSwrQkFBb0IsRUFBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xHLE9BQU8sTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxJQUFJLHlCQUFTLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU87UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2QsT0FBTztRQUNULENBQUM7UUFDRCxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDM0IsQ0FBQztDQUNGO0FBaERELG9EQWdEQyJ9