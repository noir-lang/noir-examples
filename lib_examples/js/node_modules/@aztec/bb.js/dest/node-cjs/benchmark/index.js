"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeBenchmark = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
tslib_1.__exportStar(require("./timer.js"), exports);
const bfd = (() => {
    const bfdStr = process.env.BENCHMARK_FD;
    const bfd = bfdStr ? parseInt(bfdStr) : -1;
    if (bfd >= 0 && !fs.fstatSync(bfd)) {
        throw new Error('fd is not open. Did you redirect in your shell?');
    }
    return bfd;
})();
function writeBenchmark(name, value, labels = {}) {
    if (bfd === -1) {
        return;
    }
    const data = {
        timestamp: new Date().toISOString(),
        name,
        type: typeof value,
        value,
        ...labels,
    };
    const jsonl = JSON.stringify(data) + '\n';
    fs.writeSync(bfd, jsonl);
}
exports.writeBenchmark = writeBenchmark;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmVuY2htYXJrL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwrQ0FBeUI7QUFDekIscURBQTJCO0FBRTNCLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFO0lBQ2hCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO0lBQ3hDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFFTCxTQUFnQixjQUFjLENBQUksSUFBWSxFQUFFLEtBQVEsRUFBRSxTQUE4QixFQUFFO0lBQ3hGLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDZixPQUFPO0lBQ1QsQ0FBQztJQUNELE1BQU0sSUFBSSxHQUFHO1FBQ1gsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO1FBQ25DLElBQUk7UUFDSixJQUFJLEVBQUUsT0FBTyxLQUFLO1FBQ2xCLEtBQUs7UUFDTCxHQUFHLE1BQU07S0FDVixDQUFDO0lBQ0YsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDMUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDM0IsQ0FBQztBQWJELHdDQWFDIn0=