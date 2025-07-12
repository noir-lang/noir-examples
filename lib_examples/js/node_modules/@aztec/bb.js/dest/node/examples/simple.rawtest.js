import { Crs } from '../crs/index.js';
import createDebug from 'debug';
import { Barretenberg } from '../barretenberg/index.js';
import { RawBuffer } from '../types/index.js';
createDebug.enable('*');
const debug = createDebug('simple_test');
async function main() {
    const CIRCUIT_SIZE = 2 ** 19;
    debug('starting test...');
    const api = await Barretenberg.new();
    // // Important to init slab allocator as first thing, to ensure maximum memory efficiency.
    // TODO(https://github.com/AztecProtocol/barretenberg/issues/1129): Do slab allocator initialization?
    // await api.commonInitSlabAllocator(CIRCUIT_SIZE);
    // Plus 1 needed!
    const crs = await Crs.new(CIRCUIT_SIZE + 1);
    await api.srsInitSrs(new RawBuffer(crs.getG1Data()), crs.numPoints, new RawBuffer(crs.getG2Data()));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLnJhd3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXhhbXBsZXMvc2ltcGxlLnJhd3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RDLE9BQU8sV0FBVyxNQUFNLE9BQU8sQ0FBQztBQUNoQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTlDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDeEIsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRXpDLEtBQUssVUFBVSxJQUFJO0lBQ2pCLE1BQU0sWUFBWSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFN0IsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDMUIsTUFBTSxHQUFHLEdBQUcsTUFBTSxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFckMsMkZBQTJGO0lBQzNGLHFHQUFxRztJQUNyRyxtREFBbUQ7SUFFbkQsaUJBQWlCO0lBQ2pCLE1BQU0sR0FBRyxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDNUMsTUFBTSxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVwRyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDdEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNwQyxNQUFNLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25DLEtBQUssQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDcEMsTUFBTSxHQUFHLENBQUMsa0NBQWtDLEVBQUUsQ0FBQztRQUMvQyxTQUFTLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFDNUMsQ0FBQztJQUVELE1BQU0sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBRXBCLEtBQUssQ0FBQyx1QkFBdUIsU0FBUyxHQUFHLFVBQVUsSUFBSSxDQUFDLENBQUM7SUFDekQsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDMUIsQ0FBQztBQUVELEtBQUssSUFBSSxFQUFFLENBQUMifQ==