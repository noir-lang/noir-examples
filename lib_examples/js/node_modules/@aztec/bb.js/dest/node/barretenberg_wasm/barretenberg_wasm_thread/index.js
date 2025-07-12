import { killSelf, threadLogger } from '../helpers/index.js';
import { BarretenbergWasmBase } from '../barretenberg_wasm_base/index.js';
export class BarretenbergWasmThread extends BarretenbergWasmBase {
    /**
     * Init as worker thread.
     */
    async initThread(module, memory) {
        this.logger = threadLogger() || this.logger;
        this.memory = memory;
        this.instance = await WebAssembly.instantiate(module, this.getImportObj(this.memory));
    }
    destroy() {
        killSelf();
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
                    killSelf();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vYmFycmV0ZW5iZXJnX3dhc21fdGhyZWFkL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDN0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFMUUsTUFBTSxPQUFPLHNCQUF1QixTQUFRLG9CQUFvQjtJQUM5RDs7T0FFRztJQUNJLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBMEIsRUFBRSxNQUEwQjtRQUM1RSxJQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksRUFBRSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDNUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUVNLE9BQU87UUFDWixRQUFRLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFFUyxZQUFZLENBQUMsTUFBMEI7UUFDL0MsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUvQyw4QkFBOEI7UUFDOUIsT0FBTztZQUNMLEdBQUcsV0FBVztZQUNkLElBQUksRUFBRTtnQkFDSixjQUFjLEVBQUUsR0FBRyxFQUFFO29CQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLHNDQUFzQyxDQUFDLENBQUM7b0JBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxLQUFNLENBQUMsQ0FBQztvQkFDaEMsUUFBUSxFQUFFLENBQUM7Z0JBQ2IsQ0FBQzthQUNGO1lBRUQsNEVBQTRFO1lBQzVFLDJHQUEyRztZQUMzRyxHQUFHLEVBQUU7Z0JBQ0gsR0FBRyxXQUFXLENBQUMsR0FBRztnQkFDbEIsd0JBQXdCLEVBQUUsR0FBRyxFQUFFO29CQUM3Qix5RkFBeUY7b0JBQ3pGLE9BQU8sQ0FBQyxDQUFDO2dCQUNYLENBQUM7YUFDRjtTQUNGLENBQUM7UUFDRiw2QkFBNkI7SUFDL0IsQ0FBQztDQUNGIn0=