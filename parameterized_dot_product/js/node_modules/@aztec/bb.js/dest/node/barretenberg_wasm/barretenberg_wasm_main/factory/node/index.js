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
export function createMainWorker() {
    const __dirname = getCurrentDir();
    return new Worker(__dirname + `/main.worker.js`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vYmFycmV0ZW5iZXJnX3dhc21fbWFpbi9mYWN0b3J5L25vZGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUVwQyxTQUFTLGFBQWE7SUFDcEIsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO1NBQU0sQ0FBQztRQUNOLDZEQUE2RDtRQUM3RCxhQUFhO1FBQ2IsT0FBTyxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxnQkFBZ0I7SUFDOUIsTUFBTSxTQUFTLEdBQUcsYUFBYSxFQUFFLENBQUM7SUFDbEMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUMsQ0FBQztBQUNuRCxDQUFDIn0=