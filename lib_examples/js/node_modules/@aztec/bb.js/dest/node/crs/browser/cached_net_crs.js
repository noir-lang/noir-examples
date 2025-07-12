import { NetCrs, NetGrumpkinCrs } from '../net_crs.js';
import { get, set } from 'idb-keyval';
/**
 * Downloader for CRS from the web or local.
 */
export class CachedNetCrs {
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
        const g1Data = await get('g1Data');
        const g2Data = await get('g2Data');
        const netCrs = new NetCrs(this.numPoints);
        const g1DataLength = this.numPoints * 64;
        if (!g1Data || g1Data.length < g1DataLength) {
            this.g1Data = await netCrs.downloadG1Data();
            await set('g1Data', this.g1Data);
        }
        else {
            this.g1Data = g1Data;
        }
        if (!g2Data) {
            this.g2Data = await netCrs.downloadG2Data();
            await set('g2Data', this.g2Data);
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
/**
 * Downloader for CRS from the web or local.
 */
export class CachedNetGrumpkinCrs {
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
        const g1Data = await get('grumpkinG1Data');
        const netGrumpkinCrs = new NetGrumpkinCrs(this.numPoints);
        const g1DataLength = this.numPoints * 64;
        if (!g1Data || g1Data.length < g1DataLength) {
            this.g1Data = await netGrumpkinCrs.downloadG1Data();
            await set('grumpkinG1Data', this.g1Data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGVkX25ldF9jcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY3JzL2Jyb3dzZXIvY2FjaGVkX25ldF9jcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFdEM7O0dBRUc7QUFDSCxNQUFNLE9BQU8sWUFBWTtJQUl2QixZQUE0QixTQUFpQjtRQUFqQixjQUFTLEdBQVQsU0FBUyxDQUFRO0lBQUcsQ0FBQztJQUVqRCxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFpQjtRQUNoQyxNQUFNLEdBQUcsR0FBRyxJQUFJLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxJQUFJO1FBQ1IsZ0NBQWdDO1FBQ2hDLE1BQU0sTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUV6QyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsWUFBWSxFQUFFLENBQUM7WUFDNUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUM1QyxNQUFNLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDdkIsQ0FBQztRQUVELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNaLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDNUMsTUFBTSxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0NBQ0Y7QUFFRDs7R0FFRztBQUNILE1BQU0sT0FBTyxvQkFBb0I7SUFHL0IsWUFBNEIsU0FBaUI7UUFBakIsY0FBUyxHQUFULFNBQVMsQ0FBUTtJQUFHLENBQUM7SUFFakQsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBaUI7UUFDaEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxJQUFJO1FBQ1IsZ0NBQWdDO1FBQ2hDLE1BQU0sTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDM0MsTUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXpDLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxZQUFZLEVBQUUsQ0FBQztZQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sY0FBYyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3BELE1BQU0sR0FBRyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0NBQ0YifQ==