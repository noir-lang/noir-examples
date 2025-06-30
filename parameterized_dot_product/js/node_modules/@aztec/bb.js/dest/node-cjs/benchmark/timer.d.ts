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
export declare class Timer {
    private start;
    constructor();
    us(): number;
    /**
     * Returns the elapsed time in milliseconds since the Timer instance was created.
     * Provides a simple and convenient way to measure the time duration between two events
     * or monitor performance of specific code sections.
     *
     * @returns The elapsed time in milliseconds.
     */
    ms(): number;
    /**
     * Returns the time elapsed since the Timer instance was created, in seconds.
     * The value is calculated by subtracting the initial start time from the current time
     * and dividing the result by 1000 to convert milliseconds to seconds.
     *
     * @returns The elapsed time in seconds.
     */
    s(): number;
}
//# sourceMappingURL=timer.d.ts.map