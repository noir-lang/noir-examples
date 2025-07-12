"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_js_1 = require("../crs/index.js");
const debug_1 = tslib_1.__importDefault(require("debug"));
const index_js_2 = require("../barretenberg/index.js");
const index_js_3 = require("../types/index.js");
debug_1.default.enable('*');
const debug = (0, debug_1.default)('simple_test');
async function main() {
    const CIRCUIT_SIZE = 2 ** 19;
    debug('starting test...');
    const api = await index_js_2.Barretenberg.new();
    // // Important to init slab allocator as first thing, to ensure maximum memory efficiency.
    // TODO(https://github.com/AztecProtocol/barretenberg/issues/1129): Do slab allocator initialization?
    // await api.commonInitSlabAllocator(CIRCUIT_SIZE);
    // Plus 1 needed!
    const crs = await index_js_1.Crs.new(CIRCUIT_SIZE + 1);
    await api.srsInitSrs(new index_js_3.RawBuffer(crs.getG1Data()), crs.numPoints, new index_js_3.RawBuffer(crs.getG2Data()));
    const iterations = 10;
    let totalTime = 0;
    for (let i = 0; i < iterations; ++i) {
        const start = new Date().getTime();
        debug(`iteration ${i} starting...`);
        await api.examplesSimpleCreateAndVerifyProof();
        totalTime += new Date().getTime() - start;
    }
    await api.destroy();
    debug(`avg iteration time: ${totalTime / iterations}ms`);
    debug('test complete.');
}
void main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLnJhd3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXhhbXBsZXMvc2ltcGxlLnJhd3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsOENBQXNDO0FBQ3RDLDBEQUFnQztBQUNoQyx1REFBd0Q7QUFDeEQsZ0RBQThDO0FBRTlDLGVBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDeEIsTUFBTSxLQUFLLEdBQUcsSUFBQSxlQUFXLEVBQUMsYUFBYSxDQUFDLENBQUM7QUFFekMsS0FBSyxVQUFVLElBQUk7SUFDakIsTUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUU3QixLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMxQixNQUFNLEdBQUcsR0FBRyxNQUFNLHVCQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFckMsMkZBQTJGO0lBQzNGLHFHQUFxRztJQUNyRyxtREFBbUQ7SUFFbkQsaUJBQWlCO0lBQ2pCLE1BQU0sR0FBRyxHQUFHLE1BQU0sY0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDNUMsTUFBTSxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksb0JBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksb0JBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXBHLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUN0QixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNwQyxNQUFNLEdBQUcsQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDO1FBQy9DLFNBQVMsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQztJQUM1QyxDQUFDO0lBRUQsTUFBTSxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7SUFFcEIsS0FBSyxDQUFDLHVCQUF1QixTQUFTLEdBQUcsVUFBVSxJQUFJLENBQUMsQ0FBQztJQUN6RCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBRUQsS0FBSyxJQUFJLEVBQUUsQ0FBQyJ9