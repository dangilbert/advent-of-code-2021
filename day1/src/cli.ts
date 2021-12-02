import fs from 'fs';
import _ from 'lodash';


/*
    Part 1
*/

const part1 = function (input: number[]) {
    const increases = _.chain(_.range(0, input.length - 1)).map((_, i) => input[i + 1] - input[i]).countBy((value) => value > 0);
    return increases.value().true;
};

/*
    Part 2
*/

const part2 = function (input: number[]) {
    const increases = _.chain(_.range(0, input.length - 1)).map((_, i) => input[i + 1] - input[i]).countBy((value) => value > 0);
    return increases.value;
};

const testInput: number[] = fs.readFileSync('input/test.txt').toString().split("\n").map((value) => parseInt(value));
const input: number[] = fs.readFileSync('input/part1.txt').toString().split("\n").map((value) => parseInt(value));

console.log(`Input length: ${input.length}`);
console.log(`Part 1 (Test input): ${part1(testInput)}`)
console.log(`Part 1 (Real input): ${part1(input)}`)