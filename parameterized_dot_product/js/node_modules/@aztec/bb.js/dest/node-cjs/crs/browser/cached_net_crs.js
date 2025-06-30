"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachedNetGrumpkinCrs = exports.CachedNetCrs = void 0;
const net_crs_js_1 = require("../net_crs.js");
const idb_keyval_1 = require("idb-keyval");
/**
 * Downloader for CRS from the web or local.
 */
class CachedNetCrs {
    constructor(numPoints) {
        this.numPoints = numPoints;
    }
    static async new(numPoints) {
        const crs = new CachedNetCrs(numPoints);
        await crs.init();
        return crs;
    }
    /**
     * Download the data.
     */
    async init() {
        // Check if data is in IndexedDB
        const g1Data = await (0, idb_keyval_1.get)('g1Data');
        const g2Data = await (0, idb_keyval_1.get)('g2Data');
        const netCrs = new net_crs_js_1.NetCrs(this.numPoints);
        const g1DataLength = this.numPoints * 64;
        if (!g1Data || g1Data.length < g1DataLength) {
            this.g1Data = await netCrs.downloadG1Data();
            await (0, idb_keyval_1.set)('g1Data', this.g1Data);
        }
        else {
            this.g1Data = g1Data;
        }
        if (!g2Data) {
            this.g2Data = await netCrs.downloadG2Data();
            await (0, idb_keyval_1.set)('g2Data', this.g2Data);
        }
        else {
            this.g2Data = g2Data;
        }
    }
    /**
     * G1 points data for prover key.
     * @returns The points data.
     */
    getG1Data() {
        return this.g1Data;
    }
    /**
     * G2 points data for verification key.
     * @returns The points data.
     */
    getG2Data() {
        return this.g2Data;
    }
}
exports.CachedNetCrs = CachedNetCrs;
/**
 * Downloader for CRS from the web or local.
 */
class CachedNetGrumpkinCrs {
    constructor(numPoints) {
        this.numPoints = numPoints;
    }
    static async new(numPoints) {
        const crs = new CachedNetGrumpkinCrs(numPoints);
        await crs.init();
        return crs;
    }
    /**
     * Download the data.
     */
    async init() {
        // Check if data is in IndexedDB
        const g1Data = await (0, idb_keyval_1.get)('grumpkinG1Data');
        const netGrumpkinCrs = new net_crs_js_1.NetGrumpkinCrs(this.numPoints);
        const g1DataLength = this.numPoints * 64;
        if (!g1Data || g1Data.length < g1DataLength) {
            this.g1Data = await netGrumpkinCrs.downloadG1Data();
            await (0, idb_keyval_1.set)('grumpkinG1Data', this.g1Data);
        }
        else {
            this.g1Data = g1Data;
        }
    }
    /**
     * G1 points data for prover key.
     * @returns The points data.
     */
    getG1Data() {
        return this.g1Data;
    }
}
exports.CachedNetGrumpkinCrs = CachedNetGrumpkinCrs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGVkX25ldF9jcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY3JzL2Jyb3dzZXIvY2FjaGVkX25ldF9jcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsOENBQXVEO0FBQ3ZELDJDQUFzQztBQUV0Qzs7R0FFRztBQUNILE1BQWEsWUFBWTtJQUl2QixZQUE0QixTQUFpQjtRQUFqQixjQUFTLEdBQVQsU0FBUyxDQUFRO0lBQUcsQ0FBQztJQUVqRCxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFpQjtRQUNoQyxNQUFNLEdBQUcsR0FBRyxJQUFJLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxJQUFJO1FBQ1IsZ0NBQWdDO1FBQ2hDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSxnQkFBRyxFQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSxnQkFBRyxFQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sTUFBTSxHQUFHLElBQUksbUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFFekMsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLFlBQVksRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDNUMsTUFBTSxJQUFBLGdCQUFHLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7UUFFRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDWixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzVDLE1BQU0sSUFBQSxnQkFBRyxFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkMsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN2QixDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7T0FHRztJQUNILFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztDQUNGO0FBcERELG9DQW9EQztBQUVEOztHQUVHO0FBQ0gsTUFBYSxvQkFBb0I7SUFHL0IsWUFBNEIsU0FBaUI7UUFBakIsY0FBUyxHQUFULFNBQVMsQ0FBUTtJQUFHLENBQUM7SUFFakQsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBaUI7UUFDaEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxJQUFJO1FBQ1IsZ0NBQWdDO1FBQ2hDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSxnQkFBRyxFQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDM0MsTUFBTSxjQUFjLEdBQUcsSUFBSSwyQkFBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUV6QyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsWUFBWSxFQUFFLENBQUM7WUFDNUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNwRCxNQUFNLElBQUEsZ0JBQUcsRUFBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN2QixDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztDQUNGO0FBbkNELG9EQW1DQyJ9