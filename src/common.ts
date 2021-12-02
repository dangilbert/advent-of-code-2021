import fs from 'fs';
import { createDayClass } from './helper/day_creator';
import { Day } from './day';
import { assert } from 'console';

(async () => {
    const day = process.argv[2];
    const part = process.argv[3];

    const testInput: string[] = fs.readFileSync(`${day}/input/test.txt`).toString().split("\n");
    const input: string[] = fs.readFileSync(`${day}/input/input.txt`).toString().split("\n");

    const dayObject: Day = await createDayClass(day);

    const runPart1 = part === undefined || part === '1';
    const runPart2 = part === undefined || part === '2';

    if (runPart1) {

        const mappedTestInput = dayObject.mapInput(testInput);
        const mappedInput = dayObject.mapInput(input);

        const part1TestResult = dayObject.part1(mappedTestInput);
        assert(part1TestResult === dayObject.part1TestResult, `Part 1 (Test input): ${part1TestResult} - should be ${dayObject.part1TestResult}`)
        console.log(`Part 1 (Real input): ${dayObject.part1(mappedInput)}`);
    }

    if (runPart2) {

        const mappedTestInput = dayObject.mapInput(testInput);
        const mappedInput = dayObject.mapInput(input);

        const part2TestResult = dayObject.part2(mappedTestInput);
        assert(part2TestResult === dayObject.part2TestResult, `Part 2 (Test input): ${part2TestResult} - should be ${dayObject.part2TestResult}`)
        console.log(`Part 2 (Real input): ${dayObject.part2(mappedInput)}`);
    }
})().catch((error) => {
    console.log("Error occurred:");
    console.log(error);
});