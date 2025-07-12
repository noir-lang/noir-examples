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
export class Timer {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmVuY2htYXJrL3RpbWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxPQUFPLEtBQUs7SUFHaEI7UUFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRU0sRUFBRTtRQUNQLE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksRUFBRTtRQUNQLE9BQU8sV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDeEMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLENBQUM7UUFDTixPQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztDQUNGIn0=