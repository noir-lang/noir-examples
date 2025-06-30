"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarretenbergWasmThread = void 0;
const index_js_1 = require("../helpers/index.js");
const index_js_2 = require("../barretenberg_wasm_base/index.js");
class BarretenbergWasmThread extends index_js_2.BarretenbergWasmBase {
    /**
     * Init as worker thread.
     */
    async initThread(module, memory) {
        this.logger = (0, index_js_1.threadLogger)() || this.logger;
        this.memory = memory;
        this.instance = await WebAssembly.instantiate(module, this.getImportObj(this.memory));
    }
    destroy() {
        (0, index_js_1.killSelf)();
    }
    getImportObj(memory) {
        const baseImports = super.getImportObj(memory);
        /* eslint-disable camelcase */
        return {
            ...baseImports,
            wasi: {
                'thread-spawn': () => {
                    this.logger('PANIC: threads cannot spawn threads!');
                    this.logger(new Error().stack);
                    (0, index_js_1.killSelf)();
                },
            },
            // These are functions implementations for imports we've defined are needed.
            // The native C++ build defines these in a module called "env". We must implement TypeScript versions here.
            env: {
                ...baseImports.env,
                env_hardware_concurrency: () => {
                    // We return 1, which should cause any algos using threading to just not create a thread.
                    return 1;
                },
            },
        };
        /* eslint-enable camelcase */
    }
}
exports.BarretenbergWasmThread = BarretenbergWasmThread;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vYmFycmV0ZW5iZXJnX3dhc21fdGhyZWFkL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLGtEQUE2RDtBQUM3RCxpRUFBMEU7QUFFMUUsTUFBYSxzQkFBdUIsU0FBUSwrQkFBb0I7SUFDOUQ7O09BRUc7SUFDSSxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQTBCLEVBQUUsTUFBMEI7UUFDNUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFBLHVCQUFZLEdBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzVDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBQSxtQkFBUSxHQUFFLENBQUM7SUFDYixDQUFDO0lBRVMsWUFBWSxDQUFDLE1BQTBCO1FBQy9DLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFL0MsOEJBQThCO1FBQzlCLE9BQU87WUFDTCxHQUFHLFdBQVc7WUFDZCxJQUFJLEVBQUU7Z0JBQ0osY0FBYyxFQUFFLEdBQUcsRUFBRTtvQkFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO29CQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsS0FBTSxDQUFDLENBQUM7b0JBQ2hDLElBQUEsbUJBQVEsR0FBRSxDQUFDO2dCQUNiLENBQUM7YUFDRjtZQUVELDRFQUE0RTtZQUM1RSwyR0FBMkc7WUFDM0csR0FBRyxFQUFFO2dCQUNILEdBQUcsV0FBVyxDQUFDLEdBQUc7Z0JBQ2xCLHdCQUF3QixFQUFFLEdBQUcsRUFBRTtvQkFDN0IseUZBQXlGO29CQUN6RixPQUFPLENBQUMsQ0FBQztnQkFDWCxDQUFDO2FBQ0Y7U0FDRixDQUFDO1FBQ0YsNkJBQTZCO0lBQy9CLENBQUM7Q0FDRjtBQXhDRCx3REF3Q0MifQ==