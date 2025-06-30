"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeapAllocator = void 0;
/**
 * Keeps track of heap allocations so they can be easily freed.
 * The WASM memory layout has 1024 bytes of unused "scratch" space at the start (addresses 0-1023).
 * We can leverage this for IO rather than making expensive bb_malloc bb_free calls.
 * Heap allocations will be created for input/output args that don't fit into the scratch space.
 * Input and output args can use the same scratch space as it's assume all input reads will be performed before any
 * output writes are performed.
 */
class HeapAllocator {
    constructor(wasm) {
        this.wasm = wasm;
        this.allocs = [];
        this.inScratchRemaining = 1024;
        this.outScratchRemaining = 1024;
    }
    getInputs(buffers) {
        return buffers.map(bufOrNum => {
            if (typeof bufOrNum === 'object') {
                if (bufOrNum.length <= this.inScratchRemaining) {
                    const ptr = (this.inScratchRemaining -= bufOrNum.length);
                    this.wasm.writeMemory(ptr, bufOrNum);
                    return ptr;
                }
                else {
                    const ptr = this.wasm.call('bbmalloc', bufOrNum.length);
                    this.wasm.writeMemory(ptr, bufOrNum);
                    this.allocs.push(ptr);
                    return ptr;
                }
            }
            else {
                return bufOrNum;
            }
        });
    }
    getOutputPtrs(outLens) {
        return outLens.map(len => {
            // If the obj is variable length, we need a 4 byte ptr to write the serialized data address to.
            // WARNING: 4 only works with WASM as it has 32 bit memory.
            const size = len || 4;
            if (size <= this.outScratchRemaining) {
                return (this.outScratchRemaining -= size);
            }
            else {
                const ptr = this.wasm.call('bbmalloc', size);
                this.allocs.push(ptr);
                return ptr;
            }
        });
    }
    addOutputPtr(ptr) {
        if (ptr >= 1024) {
            this.allocs.push(ptr);
        }
    }
    freeAll() {
        for (const ptr of this.allocs) {
            this.wasm.call('bbfree', ptr);
        }
    }
}
exports.HeapAllocator = HeapAllocator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhcF9hbGxvY2F0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vYmFycmV0ZW5iZXJnX3dhc21fbWFpbi9oZWFwX2FsbG9jYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQTs7Ozs7OztHQU9HO0FBQ0gsTUFBYSxhQUFhO0lBS3hCLFlBQW9CLElBQTBCO1FBQTFCLFNBQUksR0FBSixJQUFJLENBQXNCO1FBSnRDLFdBQU0sR0FBYSxFQUFFLENBQUM7UUFDdEIsdUJBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQzFCLHdCQUFtQixHQUFHLElBQUksQ0FBQztJQUVjLENBQUM7SUFFbEQsU0FBUyxDQUFDLE9BQWdDO1FBQ3hDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM1QixJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRSxDQUFDO2dCQUNqQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7b0JBQy9DLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUNyQyxPQUFPLEdBQUcsQ0FBQztnQkFDYixDQUFDO3FCQUFNLENBQUM7b0JBQ04sTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdEIsT0FBTyxHQUFHLENBQUM7Z0JBQ2IsQ0FBQztZQUNILENBQUM7aUJBQU0sQ0FBQztnQkFDTixPQUFPLFFBQVEsQ0FBQztZQUNsQixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQStCO1FBQzNDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN2QiwrRkFBK0Y7WUFDL0YsMkRBQTJEO1lBQzNELE1BQU0sSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFFdEIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQ3JDLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLENBQUM7WUFDNUMsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLE9BQU8sR0FBRyxDQUFDO1lBQ2IsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFlBQVksQ0FBQyxHQUFXO1FBQ3RCLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLENBQUM7SUFDSCxDQUFDO0lBRUQsT0FBTztRQUNMLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoQyxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBckRELHNDQXFEQyJ9