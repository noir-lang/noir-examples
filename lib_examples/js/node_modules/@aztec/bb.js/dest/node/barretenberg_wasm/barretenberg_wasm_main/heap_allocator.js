/**
 * Keeps track of heap allocations so they can be easily freed.
 * The WASM memory layout has 1024 bytes of unused "scratch" space at the start (addresses 0-1023).
 * We can leverage this for IO rather than making expensive bb_malloc bb_free calls.
 * Heap allocations will be created for input/output args that don't fit into the scratch space.
 * Input and output args can use the same scratch space as it's assume all input reads will be performed before any
 * output writes are performed.
 */
export class HeapAllocator {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhcF9hbGxvY2F0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vYmFycmV0ZW5iZXJnX3dhc21fbWFpbi9oZWFwX2FsbG9jYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxPQUFPLGFBQWE7SUFLeEIsWUFBb0IsSUFBMEI7UUFBMUIsU0FBSSxHQUFKLElBQUksQ0FBc0I7UUFKdEMsV0FBTSxHQUFhLEVBQUUsQ0FBQztRQUN0Qix1QkFBa0IsR0FBRyxJQUFJLENBQUM7UUFDMUIsd0JBQW1CLEdBQUcsSUFBSSxDQUFDO0lBRWMsQ0FBQztJQUVsRCxTQUFTLENBQUMsT0FBZ0M7UUFDeEMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzVCLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQ2pDLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztvQkFDL0MsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ3JDLE9BQU8sR0FBRyxDQUFDO2dCQUNiLENBQUM7cUJBQU0sQ0FBQztvQkFDTixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN4RCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN0QixPQUFPLEdBQUcsQ0FBQztnQkFDYixDQUFDO1lBQ0gsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE9BQU8sUUFBUSxDQUFDO1lBQ2xCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBK0I7UUFDM0MsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZCLCtGQUErRjtZQUMvRiwyREFBMkQ7WUFDM0QsTUFBTSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUV0QixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDckMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsQ0FBQztZQUM1QyxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEIsT0FBTyxHQUFHLENBQUM7WUFDYixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsWUFBWSxDQUFDLEdBQVc7UUFDdEIsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEIsQ0FBQztJQUNILENBQUM7SUFFRCxPQUFPO1FBQ0wsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7SUFDSCxDQUFDO0NBQ0YifQ==