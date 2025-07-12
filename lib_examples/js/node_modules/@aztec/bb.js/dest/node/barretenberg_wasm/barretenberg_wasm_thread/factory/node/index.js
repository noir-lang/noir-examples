import { Worker } from 'worker_threads';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
function getCurrentDir() {
    if (typeof __dirname !== 'undefined') {
        return __dirname;
    }
    else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return dirname(fileURLToPath(import.meta.url));
    }
}
export function createThreadWorker() {
    const __dirname = getCurrentDir();
    return new Worker(__dirname + `/thread.worker.js`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vYmFycmV0ZW5iZXJnX3dhc21fdGhyZWFkL2ZhY3Rvcnkvbm9kZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRXBDLFNBQVMsYUFBYTtJQUNwQixJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7U0FBTSxDQUFDO1FBQ04sNkRBQTZEO1FBQzdELGFBQWE7UUFDYixPQUFPLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLGtCQUFrQjtJQUNoQyxNQUFNLFNBQVMsR0FBRyxhQUFhLEVBQUUsQ0FBQztJQUNsQyxPQUFPLElBQUksTUFBTSxDQUFDLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3JELENBQUMifQ==