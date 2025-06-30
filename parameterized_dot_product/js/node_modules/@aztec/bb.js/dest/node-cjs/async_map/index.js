"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncMap = void 0;
/**
 * Much the same as Array.map, only it takes an async fn as an element handler, and ensures that each element handler
 * is executed sequentially.
 * The pattern of `await Promise.all(arr.map(async e => { ... }))` only works if one's happy with each element handler
 * being run concurrently.
 * If one required sequential execution of async fn's, the only alternative was regular loops with mutable state vars.
 * The equivalent with asyncMap: `await asyncMap(arr, async e => { ... })`.
 */
async function asyncMap(arr, fn) {
    const results = [];
    for (let i = 0; i < arr.length; ++i) {
        results.push(await fn(arr[i], i));
    }
    return results;
}
exports.asyncMap = asyncMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXN5bmNfbWFwL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7Ozs7O0dBT0c7QUFDSSxLQUFLLFVBQVUsUUFBUSxDQUFPLEdBQVEsRUFBRSxFQUFtQztJQUNoRixNQUFNLE9BQU8sR0FBUSxFQUFFLENBQUM7SUFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNwQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBTkQsNEJBTUMifQ==