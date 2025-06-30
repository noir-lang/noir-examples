"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMainWorker = void 0;
const worker_threads_1 = require("worker_threads");
const path_1 = require("path");
const url_1 = require("url");
function getCurrentDir() {
    if (typeof __dirname !== 'undefined') {
        return __dirname;
    }
    else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return (0, path_1.dirname)((0, url_1.fileURLToPath)(""));
    }
}
function createMainWorker() {
    const __dirname = getCurrentDir();
    return new worker_threads_1.Worker(__dirname + `/main.worker.js`);
}
exports.createMainWorker = createMainWorker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vYmFycmV0ZW5iZXJnX3dhc21fbWFpbi9mYWN0b3J5L25vZGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbURBQXdDO0FBQ3hDLCtCQUErQjtBQUMvQiw2QkFBb0M7QUFFcEMsU0FBUyxhQUFhO0lBQ3BCLElBQUksT0FBTyxTQUFTLEtBQUssV0FBVyxFQUFFLENBQUM7UUFDckMsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztTQUFNLENBQUM7UUFDTiw2REFBNkQ7UUFDN0QsYUFBYTtRQUNiLE9BQU8sSUFBQSxjQUFPLEVBQUMsSUFBQSxtQkFBYSxFQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0FBQ0gsQ0FBQztBQUVELFNBQWdCLGdCQUFnQjtJQUM5QixNQUFNLFNBQVMsR0FBRyxhQUFhLEVBQUUsQ0FBQztJQUNsQyxPQUFPLElBQUksdUJBQU0sQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBSEQsNENBR0MifQ==