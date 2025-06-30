"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
/**
 * Timer class to measure time intervals in milliseconds and seconds.
 * Upon instantiation, it stores the current timestamp as the starting point.
 * The 'ms()' method returns the elapsed time in milliseconds,
 * while the 's()' method returns the elapsed time in seconds.
 *
 * @example
 * const timer = new Timer();
 * setTimeout(() =\> \{
 *   console.log(`Elapsed time: ${timer.ms()} ms`);
 * \}, 1000);
 */
class Timer {
    constructor() {
        this.start = performance.now();
    }
    us() {
        return this.ms() * 1000;
    }
    /**
     * Returns the elapsed time in milliseconds since the Timer instance was created.
     * Provides a simple and convenient way to measure the time duration between two events
     * or monitor performance of specific code sections.
     *
     * @returns The elapsed time in milliseconds.
     */
    ms() {
        return performance.now() - this.start;
    }
    /**
     * Returns the time elapsed since the Timer instance was created, in seconds.
     * The value is calculated by subtracting the initial start time from the current time
     * and dividing the result by 1000 to convert milliseconds to seconds.
     *
     * @returns The elapsed time in seconds.
     */
    s() {
        return this.ms() / 1000;
    }
}
exports.Timer = Timer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmVuY2htYXJrL3RpbWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBYSxLQUFLO0lBR2hCO1FBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVNLEVBQUU7UUFDUCxPQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLEVBQUU7UUFDUCxPQUFPLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxDQUFDO1FBQ04sT0FBTyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7Q0FDRjtBQWhDRCxzQkFnQ0MifQ==