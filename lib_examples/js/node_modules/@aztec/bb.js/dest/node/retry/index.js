/**
 * Generates a backoff sequence for retrying operations with an increasing delay.
 * The backoff sequence follows this pattern: 1, 1, 1, 2, 4, 8, 16, 32, 64, ...
 * This generator can be used in combination with the `retry` function to perform
 * retries with exponential backoff and capped at 64 seconds between attempts.
 *
 * @returns A generator that yields the next backoff value in seconds as an integer.
 */
export function* backoffGenerator() {
    const v = [1, 1, 1, 2, 4, 8, 16, 32, 64];
    let i = 0;
    while (true) {
        yield v[Math.min(i++, v.length - 1)];
    }
}
/**
 * Generates a backoff sequence based on the array of retry intervals to use with the `retry` function.
 * @param retries - Intervals to retry (in seconds).
 * @returns A generator sequence.
 */
export function* makeBackoff(retries) {
    for (const retry of retries) {
        yield retry;
    }
}
/**
 * Retry a given asynchronous function with a specific backoff strategy, until it succeeds or backoff generator ends.
 * It logs the error and retry interval in case an error is caught. The function can be named for better log output.
 *
 * @param fn - The asynchronous function to be retried.
 * @param backoff - The optional backoff generator providing the intervals in seconds between retries. Defaults to a predefined series.
 * @returns A Promise that resolves with the successful result of the provided function, or rejects if backoff generator ends.
 * @throws If `NoRetryError` is thrown by the `fn`, it is rethrown.
 */
export async function retry(fn, backoff = backoffGenerator()) {
    while (true) {
        try {
            return await fn();
        }
        catch (err) {
            const s = backoff.next().value;
            if (s === undefined) {
                throw err;
            }
            await new Promise(resolve => setTimeout(resolve, s * 1000));
            continue;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcmV0cnkvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7R0FPRztBQUNILE1BQU0sU0FBUyxDQUFDLENBQUMsZ0JBQWdCO0lBQy9CLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6QyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDVixPQUFPLElBQUksRUFBRSxDQUFDO1FBQ1osTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQztBQUNILENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBaUI7SUFDNUMsS0FBSyxNQUFNLEtBQUssSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUM1QixNQUFNLEtBQUssQ0FBQztJQUNkLENBQUM7QUFDSCxDQUFDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLEtBQUssQ0FBUyxFQUF5QixFQUFFLE9BQU8sR0FBRyxnQkFBZ0IsRUFBRTtJQUN6RixPQUFPLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDO1lBQ0gsT0FBTyxNQUFNLEVBQUUsRUFBRSxDQUFDO1FBQ3BCLENBQUM7UUFBQyxPQUFPLEdBQVEsRUFBRSxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDL0IsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFLENBQUM7Z0JBQ3BCLE1BQU0sR0FBRyxDQUFDO1lBQ1osQ0FBQztZQUNELE1BQU0sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzVELFNBQVM7UUFDWCxDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUMifQ==